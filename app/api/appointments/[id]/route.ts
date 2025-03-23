import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { Appointment, AppointmentWithDetails, UpdateAppointmentInput } from '../../../../lib/models/appointment';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const result = await pool.query(`
      SELECT 
        a.*,
        CONCAT(du.first_name, ' ', du.last_name) as doctor_name,
        d.specialty as doctor_specialty,
        CONCAT(pu.first_name, ' ', pu.last_name) as patient_name
      FROM 
        appointments a
      JOIN 
        users du ON a.doctor_id = du.id
      JOIN 
        doctors d ON a.doctor_id = d.user_id
      JOIN 
        users pu ON a.patient_id = pu.id
      WHERE 
        a.id = $1
    `, [params.id]) as { rows: AppointmentWithDetails[] };
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0]) as NextResponse<AppointmentWithDetails>;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json({ error: 'Error fetching appointment' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const checkResult = await pool.query(
      'SELECT * FROM appointments WHERE id = $1',
      [params.id]
    ) as { rows: Appointment[] };
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    
    const existingAppointment = checkResult.rows[0];
    const body = await request.json() as UpdateAppointmentInput;
    const { patient_id, doctor_id, start_time, duration } = body;
    
    const updatedPatientId = patient_id || existingAppointment.patient_id;
    const updatedDoctorId = doctor_id || existingAppointment.doctor_id;
    const updatedStartTime = start_time || existingAppointment.start_time;
    const updatedDuration = duration || existingAppointment.duration;
    
    if (patient_id && patient_id !== existingAppointment.patient_id) {
      const patientCheck = await pool.query(
        'SELECT * FROM users WHERE id = $1 AND role = $2', 
        [patient_id, 'patient']
      );
      
      if (patientCheck.rows.length === 0) {
        return NextResponse.json({ 
          error: 'Patient not found' 
        }, { status: 404 });
      }
    }
    
    if (doctor_id && doctor_id !== existingAppointment.doctor_id) {
      const doctorCheck = await pool.query(
        'SELECT * FROM doctors WHERE user_id = $1',
        [doctor_id]
      );
      
      if (doctorCheck.rows.length === 0) {
        return NextResponse.json({ 
          error: 'Doctor not found' 
        }, { status: 404 });
      }
    }
    
    if (start_time || duration || (doctor_id && doctor_id !== existingAppointment.doctor_id)) {
      const appointmentDate = new Date(updatedStartTime);
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const dayOfWeek = days[appointmentDate.getDay()];
      
      const availabilityCheck = await pool.query(`
        SELECT * FROM doctor_availabilities 
        WHERE 
          doctor_id = $1 AND
          day_of_week = $2 AND
          $3::time BETWEEN start_time AND end_time
      `, [updatedDoctorId, dayOfWeek, updatedStartTime]);
      
      if (availabilityCheck.rows.length === 0) {
        return NextResponse.json({ 
          error: 'Doctor is not available at this time' 
        }, { status: 400 });
      }
      
      const overlapCheck = await pool.query(`
        SELECT * FROM appointments 
        WHERE 
          id != $1 AND
          doctor_id = $2 AND
          (
            ($3::timestamp BETWEEN start_time AND start_time + duration) OR
            ($3::timestamp + $4::interval BETWEEN start_time AND start_time + duration) OR
            (start_time BETWEEN $3::timestamp AND $3::timestamp + $4::interval)
          )
      `, [params.id, updatedDoctorId, updatedStartTime, updatedDuration]);
      
      if (overlapCheck.rows.length > 0) {
        return NextResponse.json({ 
          error: 'This appointment time conflicts with an existing appointment' 
        }, { status: 409 });
      }
    }
    
    const result = await pool.query(
      'UPDATE appointments SET patient_id = $1, doctor_id = $2, start_time = $3, duration = $4 WHERE id = $5 RETURNING *',
      [updatedPatientId, updatedDoctorId, updatedStartTime, updatedDuration, params.id]
    ) as { rows: Appointment[] };
    
    return NextResponse.json(result.rows[0]) as NextResponse<Appointment>;
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Error updating appointment' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const checkResult = await pool.query(
      'SELECT * FROM appointments WHERE id = $1',
      [params.id]
    ) as { rows: Appointment[] };
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    
    await pool.query('DELETE FROM appointments WHERE id = $1', [params.id]);
    
    return NextResponse.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ error: 'Error deleting appointment' }, { status: 500 });
  }
} 
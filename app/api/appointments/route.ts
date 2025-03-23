import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { Appointment, AppointmentWithDetails, CreateAppointmentInput } from '../../../lib/models/appointment';
import { Doctor } from '../../../lib/models/doctor';

export async function GET() {
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
      ORDER BY 
        a.start_time DESC
    `) as { rows: AppointmentWithDetails[] };
    
    return NextResponse.json(result.rows) as NextResponse<AppointmentWithDetails[]>;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Error fetching appointments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreateAppointmentInput;
    const { patient_id, doctor_id, start_time, duration } = body;
    
    const patientCheck = await pool.query(
      'SELECT * FROM users WHERE id = $1 AND role = $2', 
      [patient_id, 'patient']
    );
    
    if (patientCheck.rows.length === 0) {
      return NextResponse.json({ 
        error: 'Patient not found' 
      }, { status: 404 });
    }
    
    const doctorCheck = await pool.query(
      'SELECT * FROM doctors WHERE user_id = $1',
      [doctor_id]
    ) as { rows: Doctor[] };
    
    if (doctorCheck.rows.length === 0) {
      return NextResponse.json({ 
        error: 'Doctor not found' 
      }, { status: 404 });
    }
    
    const appointmentDate = new Date(start_time);
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayOfWeek = days[appointmentDate.getDay()];
    
    const availabilityCheck = await pool.query(`
      SELECT * FROM doctor_availabilities 
      WHERE 
        doctor_id = $1 AND
        day_of_week = $2 AND
        $3::time BETWEEN start_time AND end_time
    `, [doctor_id, dayOfWeek, start_time]);
    
    if (availabilityCheck.rows.length === 0) {
      return NextResponse.json({ 
        error: 'Doctor is not available at this time' 
      }, { status: 400 });
    }
    
    const overlapCheck = await pool.query(`
      SELECT * FROM appointments 
      WHERE 
        doctor_id = $1 AND
        (
          ($2::timestamp BETWEEN start_time AND start_time + duration) OR
          ($2::timestamp + $3::interval BETWEEN start_time AND start_time + duration) OR
          (start_time BETWEEN $2::timestamp AND $2::timestamp + $3::interval)
        )
    `, [doctor_id, start_time, duration]);
    
    if (overlapCheck.rows.length > 0) {
      return NextResponse.json({ 
        error: 'This appointment time conflicts with an existing appointment' 
      }, { status: 409 });
    }
    
    const result = await pool.query(
      'INSERT INTO appointments(patient_id, doctor_id, start_time, duration) VALUES($1, $2, $3, $4) RETURNING *',
      [patient_id, doctor_id, start_time, duration]
    ) as { rows: Appointment[] };
    
    return NextResponse.json(result.rows[0], { status: 201 }) as NextResponse<Appointment>;
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ error: 'Error creating appointment' }, { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';
import { CreateDoctorAvailabilityInput, Doctor, DoctorAvailability } from '../../../../../lib/models/doctor';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const doctorCheck = await pool.query(
      'SELECT * FROM doctors WHERE user_id = $1',
      [params.id]
    ) as { rows: Doctor[] };
    
    if (doctorCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    
    const result = await pool.query(
      'SELECT * FROM doctor_availabilities WHERE doctor_id = $1 ORDER BY day_of_week, start_time',
      [params.id]
    ) as { rows: DoctorAvailability[] };
    
    return NextResponse.json(result.rows) as NextResponse<DoctorAvailability[]>;
  } catch (error) {
    console.error('Error fetching doctor availabilities:', error);
    return NextResponse.json({ error: 'Error fetching doctor availabilities' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json() as CreateDoctorAvailabilityInput;
    const { day_of_week, start_time, end_time } = body;
    
    // Check if doctor exists
    const doctorCheck = await pool.query(
      'SELECT * FROM doctors WHERE user_id = $1',
      [params.id]
    ) as { rows: Doctor[] };
    
    if (doctorCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    
    // Validate that end_time is after start_time
    if (start_time >= end_time) {
      return NextResponse.json({ 
        error: 'End time must be after start time' 
      }, { status: 400 });
    }
    
    // Check for overlapping availabilities
    const overlapCheck = await pool.query(`
      SELECT * FROM doctor_availabilities 
      WHERE doctor_id = $1 
      AND day_of_week = $2 
      AND (
        (start_time <= $3 AND end_time > $3) OR
        (start_time < $4 AND end_time >= $4) OR
        (start_time >= $3 AND end_time <= $4)
      )
    `, [params.id, day_of_week, start_time, end_time]) as { rows: DoctorAvailability[] };
    
    if (overlapCheck.rows.length > 0) {
      return NextResponse.json({ 
        error: 'This availability overlaps with existing availabilities' 
      }, { status: 409 });
    }
    
    const result = await pool.query(
      'INSERT INTO doctor_availabilities(doctor_id, day_of_week, start_time, end_time) VALUES($1, $2, $3, $4) RETURNING *',
      [params.id, day_of_week, start_time, end_time]
    ) as { rows: DoctorAvailability[] };
    
    return NextResponse.json(result.rows[0], { status: 201 }) as NextResponse<DoctorAvailability>;
  } catch (error) {
    console.error('Error creating doctor availability:', error);
    return NextResponse.json({ error: 'Error creating doctor availability' }, { status: 500 });
  }
} 
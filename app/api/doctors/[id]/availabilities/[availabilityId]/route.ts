import { NextResponse } from 'next/server';
import pool from '../../../../../../lib/db';
import { DoctorAvailability, UpdateDoctorAvailabilityInput } from '../../../../../../lib/models/doctor';

export async function GET({ params }: { params: { id: string; availabilityId: string } }) {
  try {
    const result = await pool.query(
      'SELECT * FROM doctor_availabilities WHERE id = $1 AND doctor_id = $2',
      [params.availabilityId, params.id]
    ) as { rows: DoctorAvailability[] };
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Availability not found' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0]) as NextResponse<DoctorAvailability>;
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ error: 'Error fetching availability' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string; availabilityId: string } }
) {
  try {
    const body = await request.json() as UpdateDoctorAvailabilityInput;
    const { day_of_week, start_time, end_time } = body;
    
    // Check if availability exists
    const availabilityCheck = await pool.query(
      'SELECT * FROM doctor_availabilities WHERE id = $1 AND doctor_id = $2',
      [params.availabilityId, params.id]
    ) as { rows: DoctorAvailability[] };
    
    if (availabilityCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Availability not found' }, { status: 404 });
    }
    
    // If updating times, validate that end_time is after start_time
    if (start_time && end_time && start_time >= end_time) {
      return NextResponse.json({ 
        error: 'End time must be after start time' 
      }, { status: 400 });
    }
    
    // Get current values to use for fields not being updated
    const currentAvailability = availabilityCheck.rows[0];
    const updatedDayOfWeek = day_of_week || currentAvailability.day_of_week;
    const updatedStartTime = start_time || currentAvailability.start_time;
    const updatedEndTime = end_time || currentAvailability.end_time;
    
    // Check for overlapping availabilities, excluding this one
    if (day_of_week || start_time || end_time) {
      const overlapCheck = await pool.query(`
        SELECT * FROM doctor_availabilities 
        WHERE doctor_id = $1 
        AND day_of_week = $2 
        AND id != $3
        AND (
          (start_time <= $4 AND end_time > $4) OR
          (start_time < $5 AND end_time >= $5) OR
          (start_time >= $4 AND end_time <= $5)
        )
      `, [params.id, updatedDayOfWeek, params.availabilityId, updatedStartTime, updatedEndTime]) as { rows: DoctorAvailability[] };
      
      if (overlapCheck.rows.length > 0) {
        return NextResponse.json({ 
          error: 'This availability would overlap with existing availabilities' 
        }, { status: 409 });
      }
    }
    
    const result = await pool.query(
      'UPDATE doctor_availabilities SET day_of_week = $1, start_time = $2, end_time = $3 WHERE id = $4 AND doctor_id = $5 RETURNING *',
      [updatedDayOfWeek, updatedStartTime, updatedEndTime, params.availabilityId, params.id]
    ) as { rows: DoctorAvailability[] };
    
    return NextResponse.json(result.rows[0]) as NextResponse<DoctorAvailability>;
  } catch (error) {
    console.error('Error updating availability:', error);
    return NextResponse.json({ error: 'Error updating availability' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; availabilityId: string } }
) {
  try {
    // Check if availability exists
    const availabilityCheck = await pool.query(
      'SELECT * FROM doctor_availabilities WHERE id = $1 AND doctor_id = $2',
      [params.availabilityId, params.id]
    ) as { rows: DoctorAvailability[] };
    
    if (availabilityCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Availability not found' }, { status: 404 });
    }
    
    await pool.query(
      'DELETE FROM doctor_availabilities WHERE id = $1 AND doctor_id = $2',
      [params.availabilityId, params.id]
    );
    
    return NextResponse.json({ message: 'Availability deleted successfully' });
  } catch (error) {
    console.error('Error deleting availability:', error);
    return NextResponse.json({ error: 'Error deleting availability' }, { status: 500 });
  }
} 
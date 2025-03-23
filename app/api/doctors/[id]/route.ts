import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { Doctor, UpdateDoctorInput } from '../../../../lib/models/doctor';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const result = await pool.query(`
      SELECT d.user_id, d.specialty, u.email, u.first_name, u.last_name 
      FROM doctors d
      JOIN users u ON d.user_id = u.id
      WHERE d.user_id = $1
    `, [params.id]) as { rows: Doctor[] };
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0]) as NextResponse<Doctor>;
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json({ error: 'Error fetching doctor' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json() as UpdateDoctorInput;
    const { specialty } = body;
    
    const result = await pool.query(
      'UPDATE doctors SET specialty = $1 WHERE user_id = $2 RETURNING *',
      [specialty, params.id]
    ) as { rows: Doctor[] };
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0]) as NextResponse<Doctor>;
  } catch (error) {
    console.error('Error updating doctor:', error);
    return NextResponse.json({ error: 'Error updating doctor' }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    // First check if the doctor exists
    const checkResult = await pool.query(
      'SELECT * FROM doctors WHERE user_id = $1',
      [params.id]
    ) as { rows: Doctor[] };
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    
    // Delete doctor's availabilities first to avoid foreign key constraints
    await pool.query(
      'DELETE FROM doctor_availabilities WHERE doctor_id = $1',
      [params.id]
    );
    
    // Then delete the doctor
    const result = await pool.query(
      'DELETE FROM doctors WHERE user_id = $1 RETURNING *',
      [params.id]
    ) as { rows: Doctor[] };

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return NextResponse.json({ error: 'Error deleting doctor' }, { status: 500 });
  }
} 
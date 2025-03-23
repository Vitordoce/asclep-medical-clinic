import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { CreateDoctorInput, Doctor } from '../../../lib/models/doctor';
import { User } from '../../../lib/models/user';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT d.user_id, d.specialty, u.email, u.first_name, u.last_name 
      FROM doctors d
      JOIN users u ON d.user_id = u.id
    `) as { rows: Doctor[] };
    
    return NextResponse.json(result.rows) as NextResponse<Doctor[]>;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Error fetching doctors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreateDoctorInput;
    const { user_id, specialty } = body;
    
    // Verify that the user exists and is a doctor
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE id = $1 AND role = $2', 
      [user_id, 'doctor']
    ) as { rows: User[] };
    
    if (userCheck.rows.length === 0) {
      return NextResponse.json({ 
        error: 'User not found or user is not a doctor' 
      }, { status: 404 });
    }
    
    // Check if doctor record already exists
    const doctorCheck = await pool.query(
      'SELECT * FROM doctors WHERE user_id = $1',
      [user_id]
    ) as { rows: Doctor[] };
    
    if (doctorCheck.rows.length > 0) {
      return NextResponse.json({ 
        error: 'Doctor record already exists for this user' 
      }, { status: 409 });
    }
    
    const result = await pool.query(
      'INSERT INTO doctors(user_id, specialty) VALUES($1, $2) RETURNING *',
      [user_id, specialty]
    ) as { rows: Doctor[] };
    
    return NextResponse.json(result.rows[0], { status: 201 }) as NextResponse<Doctor>;
  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json({ error: 'Error creating doctor' }, { status: 500 });
  }
} 
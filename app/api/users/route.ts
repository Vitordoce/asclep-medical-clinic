import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM users');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, first_name, last_name, role } = body;
    
    // Validate the role value against allowed values from database constraint
    const normalizedRole = role?.toLowerCase();
    
    const result = await pool.query(
      'INSERT INTO users(email, password, first_name, last_name, role) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [email, password, first_name, last_name, normalizedRole]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
} 
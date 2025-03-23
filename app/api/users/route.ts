import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { CreateUserInput, User } from '@/lib/models/user';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM users') as { rows: User[] };
    return NextResponse.json(result.rows, { status: 200 }) as NextResponse<User[]>;
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreateUserInput;
    const { email, password, first_name, last_name, role } = body;
        
    const result = await pool.query(
      'INSERT INTO users(email, password, first_name, last_name, role) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [email, password, first_name, last_name, role]
    );
    return NextResponse.json(result.rows[0] as User, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
} 
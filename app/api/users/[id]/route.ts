import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { UpdateUserInput, User } from '@/lib/models/user';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [params.id]) as { rows: User[] };
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0] as User);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json() as UpdateUserInput;
    const { email, password, first_name, last_name, role } = body;

    const result = await pool.query(
      'UPDATE users SET email = $1, password = $2, first_name = $3, last_name = $4, role = $5 WHERE id = $6 RETURNING *',
      [email, password, first_name, last_name, role, params.id]
    ) as { rows: User[] };

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0] as User);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [params.id]) as { rows: User[] };
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
} 
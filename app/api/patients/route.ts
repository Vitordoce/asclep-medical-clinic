import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { Patient } from '@/lib/models/patient';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM users WHERE role = $1', ['patient']) as { rows: Patient[] };
    return NextResponse.json(result.rows) as NextResponse<Patient[]>;
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json({ error: 'Error fetching patients' }, { status: 500 });
  }
}
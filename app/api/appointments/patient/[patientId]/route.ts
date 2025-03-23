import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';
import { AppointmentWithDetails } from '../../../../../lib/models/appointment';

export async function GET({ params }: { params: { patientId: string } }) {
  try {
      const patientCheck = await pool.query(
      'SELECT * FROM users WHERE id = $1 AND role = $2',
      [params.patientId, 'patient']
    );
    
    if (patientCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }
    
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
        a.patient_id = $1
      ORDER BY 
        a.start_time DESC
    `, [params.patientId]) as { rows: AppointmentWithDetails[] };
    
    return NextResponse.json(result.rows) as NextResponse<AppointmentWithDetails[]>;
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    return NextResponse.json({ error: 'Error fetching patient appointments' }, { status: 500 });
  }
} 
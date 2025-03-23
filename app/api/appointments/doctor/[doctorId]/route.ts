import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';
import { AppointmentWithDetails } from '../../../../../lib/models/appointment';

export async function GET({ params }: { params: { doctorId: string } }) {
  try {
    const doctorCheck = await pool.query(
      'SELECT * FROM doctors WHERE user_id = $1',
      [params.doctorId]
    );
    
    if (doctorCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
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
        a.doctor_id = $1
      ORDER BY 
        a.start_time DESC
    `, [params.doctorId]) as { rows: AppointmentWithDetails[] };
    
    return NextResponse.json(result.rows) as NextResponse<AppointmentWithDetails[]>;
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    return NextResponse.json({ error: 'Error fetching doctor appointments' }, { status: 500 });
  }
} 
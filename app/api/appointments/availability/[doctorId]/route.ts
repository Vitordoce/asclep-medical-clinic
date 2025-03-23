import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';

interface TimeSlot {
  start_time: string;
  is_available: boolean;
}

interface AvailabilityResponse {
  date: string;
  doctor_id: number;
  time_slots: TimeSlot[];
}

export async function GET(request: Request, { params }: { params: { doctorId: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date');
    
    if (!dateStr) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }
    
    // Get day of week as name (Sunday, Monday, etc.)
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayOfWeek = days[date.getDay()];
    
    const doctorCheck = await pool.query(
      'SELECT * FROM doctors WHERE user_id = $1',
      [params.doctorId]
    );
    
    if (doctorCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    
    const availabilities = await pool.query(
      'SELECT * FROM doctor_availabilities WHERE doctor_id = $1 AND day_of_week = $2 ORDER BY start_time',
      [params.doctorId, dayOfWeek]
    );
    
    if (availabilities.rows.length === 0) {
      return NextResponse.json({ 
        date: dateStr,
        doctor_id: parseInt(params.doctorId),
        time_slots: [],
        message: 'Doctor is not available on this day'
      });
    }
    
    const appointments = await pool.query(`
      SELECT start_time, duration 
      FROM appointments 
      WHERE 
        doctor_id = $1 AND 
        DATE(start_time) = $2
      ORDER BY start_time
    `, [params.doctorId, dateStr]);
    
    const bookedSlots = appointments.rows.map(apt => ({
      start: new Date(apt.start_time),
      end: new Date(new Date(apt.start_time).getTime() + parseInterval(apt.duration))
    }));
    
    const timeSlots: TimeSlot[] = [];
    const SLOT_DURATION = 30; // 30 minutes per slot
    
    for (const availability of availabilities.rows) {
      let startTime = parseTimeString(availability.start_time);
      const endTime = parseTimeString(availability.end_time);
      
      while (startTime < endTime) {
        const slotDate = new Date(date);
        slotDate.setHours(startTime.getHours());
        slotDate.setMinutes(startTime.getMinutes());
        slotDate.setSeconds(0);
        slotDate.setMilliseconds(0);
        
        const isAvailable = !bookedSlots.some(booking => {
          const slotEnd = new Date(slotDate.getTime() + SLOT_DURATION * 60000);
          return (
            (slotDate >= booking.start && slotDate < booking.end) ||
            (slotEnd > booking.start && slotEnd <= booking.end) ||
            (slotDate <= booking.start && slotEnd >= booking.end)
          );
        });
        
        timeSlots.push({
          start_time: slotDate.toISOString(),
          is_available: isAvailable
        });
        
        startTime = new Date(startTime.getTime() + SLOT_DURATION * 60000);
      }
    }
    
    return NextResponse.json({
      date: dateStr,
      doctor_id: parseInt(params.doctorId),
      time_slots: timeSlots
    } as AvailabilityResponse);
    
  } catch (error) {
    console.error('Error checking doctor availability:', error);
    return NextResponse.json({ error: 'Error checking doctor availability' }, { status: 500 });
  }
}

function parseTimeString(timeStr: string): Date {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds || 0);
  return date;
}

function parseInterval(interval: string): number {
  if (interval.includes(':')) {
    const [hours, minutes, seconds] = interval.split(':').map(Number);
    return ((hours * 60 + minutes) * 60 + seconds) * 1000;
  } else if (interval.toLowerCase().includes('hour')) {
    // Handle '1 hour', '2 hours', etc.
    const hours = parseInt(interval);
    return hours * 3600000;
  } else if (interval.toLowerCase().includes('minute')) {
    // Handle '30 minutes', '45 minutes', etc.
    const minutes = parseInt(interval);
    return minutes * 60000;
  }
  return 1800000; // Default to 30 minutes if parsing fails
} 
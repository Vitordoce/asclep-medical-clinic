export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  start_time: string;
  duration: string;
}

export interface CreateAppointmentInput {
  patient_id: number;
  doctor_id: number;
  start_time: string;
  duration: string;
}

export interface UpdateAppointmentInput {
  patient_id?: number;
  doctor_id?: number;
  start_time?: string;
  duration?: string;
}

export interface AppointmentWithDetails extends Appointment {
  doctor_name?: string;
  doctor_specialty?: string;
  patient_name?: string;
} 
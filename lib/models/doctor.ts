import { User } from "./user";

export type Doctor = User & {
  specialty: string;
}

export type CreateDoctorInput = {
  user_id: number;
  specialty: string;
}

export type UpdateDoctorInput = {
  specialty?: string;
}

export type DoctorAvailability = {
  id: number;
  doctor_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

export type CreateDoctorAvailabilityInput = {
  doctor_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

export type UpdateDoctorAvailabilityInput = {
  day_of_week?: string;
  start_time?: string;
  end_time?: string;
} 
// Shared types for the admin section

export interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  userType: string;
  role?: 'patient' | 'doctor' | 'admin';
  lastVisit?: string;
  appointmentsTotal?: number;
  status?: 'active' | 'inactive';
  avatar?: string;
  // Doctor specific fields
  specialty?: string;
  experience?: number;
  phone?: string;
  address?: string;
} 
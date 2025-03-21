// Shared types for the admin section

export interface User {
  id?: string | number;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  userType: string;
  lastVisit?: string;
  appointmentsTotal?: number;
  status?: 'active' | 'inactive';
  avatar?: string;
} 
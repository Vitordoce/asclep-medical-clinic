"use client";

import { ReactNode } from "react";
import { AdminAuthProvider } from "./AdminAuthContext";
import { DoctorAuthProvider } from "./DoctorAuthContext";
import { PatientAuthProvider } from "./PatientAuthContext";

interface AuthProvidersProps {
  children: ReactNode;
}

export function AuthProviders({ children }: AuthProvidersProps) {
  return (
    <AdminAuthProvider>
      <DoctorAuthProvider>
        <PatientAuthProvider>
          {children}
        </PatientAuthProvider>
      </DoctorAuthProvider>
    </AdminAuthProvider>
  );
} 
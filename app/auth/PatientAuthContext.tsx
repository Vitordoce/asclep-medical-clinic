"use client";

import { createContext, ReactNode } from "react";
import { AuthContextType } from "./types";
import { BaseAuthProvider, useAuth } from "./AuthContext";

// Create patient-specific context
const PatientAuthContext = createContext<AuthContextType | undefined>(undefined);

// Patient auth provider props
interface PatientAuthProviderProps {
  children: ReactNode;
}

// Patient auth provider component
export function PatientAuthProvider({ children }: PatientAuthProviderProps) {
  return (
    <BaseAuthProvider role="patient" context={PatientAuthContext}>
      {children}
    </BaseAuthProvider>
  );
}

// Patient-specific auth hook
export function usePatientAuth() {
  return useAuth(PatientAuthContext);
} 
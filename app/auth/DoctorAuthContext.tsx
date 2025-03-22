"use client";

import { createContext, ReactNode } from "react";
import { AuthContextType } from "./types";
import { BaseAuthProvider, useAuth } from "./AuthContext";

// Create doctor-specific context
const DoctorAuthContext = createContext<AuthContextType | undefined>(undefined);

// Doctor auth provider props
interface DoctorAuthProviderProps {
  children: ReactNode;
}

// Doctor auth provider component
export function DoctorAuthProvider({ children }: DoctorAuthProviderProps) {
  return (
    <BaseAuthProvider role="doctor" context={DoctorAuthContext}>
      {children}
    </BaseAuthProvider>
  );
}

// Doctor-specific auth hook
export function useDoctorAuth() {
  return useAuth(DoctorAuthContext);
} 
"use client";

import { createContext, ReactNode } from "react";
import { AuthContextType } from "./types";
import { BaseAuthProvider, useAuth } from "./AuthContext";

// Create admin-specific context
const AdminAuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin auth provider props
interface AdminAuthProviderProps {
  children: ReactNode;
}

// Admin auth provider component
export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  return (
    <BaseAuthProvider role="admin" context={AdminAuthContext}>
      {children}
    </BaseAuthProvider>
  );
}

// Admin-specific auth hook
export function useAdminAuth() {
  return useAuth(AdminAuthContext);
} 
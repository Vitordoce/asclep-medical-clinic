"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { AuthContextType, AuthState, AuthUser, UserRole } from "./types";

// Mock user database - in a real app, this would be in a database
const mockUsers = {
  admin: [
    {
      id: "admin-1",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      password: "admin123",
      role: "admin" as UserRole
    }
  ],
  doctor: [
    {
      id: "doctor-1",
      email: "doctor@example.com",
      firstName: "Doctor",
      lastName: "Smith",
      password: "doctor123",
      role: "doctor" as UserRole
    }
  ],
  patient: [
    {
      id: "patient-1",
      email: "patient@example.com",
      firstName: "Patient",
      lastName: "Jones",
      password: "patient123",
      role: "patient" as UserRole
    }
  ]
};

// Initial auth state
const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Create a generic base auth context
const BaseAuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper hook to use auth contexts
export function useAuth<T extends AuthContextType>(context: React.Context<T | undefined>): T {
  const authContext = useContext(context);
  if (!authContext) {
    throw new Error("useAuth must be used within a corresponding AuthProvider");
  }
  return authContext;
}

// Base auth provider properties
export interface BaseAuthProviderProps {
  children: ReactNode;
  role: UserRole;
  context: React.Context<AuthContextType | undefined>;
}

// Base auth provider component
export function BaseAuthProvider({ children, role, context }: BaseAuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialAuthState);

  // Check for existing session on mount
  useEffect(() => {
    // Simulate checking for stored auth
    const storedUser = localStorage.getItem(`asclep_user_${role}`);
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser) as AuthUser;
        if (userData.role === role) {
          setState({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          // Wrong role stored, clear it
          localStorage.removeItem(`asclep_user_${role}`);
          setState({
            ...initialAuthState,
            isLoading: false
          });
        }
      } catch {
        // Invalid stored data
        localStorage.removeItem(`asclep_user_${role}`);
        setState({
          ...initialAuthState,
          isLoading: false
        });
      }
    } else {
      // No stored user found
      setState({
        ...initialAuthState,
        isLoading: false
      });
    }
  }, [role]);

  // Role-specific login
  const login = async (email: string, password: string): Promise<boolean> => {
    // Start loading
    setState({ ...state, isLoading: true, error: null });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get role-specific users
    const users = mockUsers[role] || [];
    
    // Find matching user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Create authenticated user (without password)
      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      };
      
      // Store in localStorage
      localStorage.setItem(`asclep_user_${role}`, JSON.stringify(authUser));
      
      // Update state
      setState({
        user: authUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      return true;
    } else {
      // Login failed
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: "Invalid email or password"
      });
      
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem(`asclep_user_${role}`);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  // Combined context value
  const contextValue: AuthContextType = {
    ...state,
    login,
    logout
  };

  const ContextProvider = context.Provider;
  
  return (
    <ContextProvider value={contextValue}>
      {children}
    </ContextProvider>
  );
} 
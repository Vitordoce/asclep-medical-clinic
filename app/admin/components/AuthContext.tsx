"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define user roles
export type UserRole = 'admin' | 'doctor' | 'patient' | 'none';

// Define permission structure
interface Permissions {
  canAccessDatabases: boolean;
  canManageDoctors: boolean;
  canManageUsers: boolean;
  canManageSchedule: boolean;
  canViewSchedule: boolean;
  canEditSchedule: boolean;
}

// User data structure
interface User {
  id?: string;
  name?: string;
  email?: string;
  role: UserRole;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  permissions: Permissions;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Default permissions based on role
const getDefaultPermissions = (role: UserRole): Permissions => {
  switch (role) {
    case 'admin':
      return {
        canAccessDatabases: true,
        canManageDoctors: true,
        canManageUsers: true,
        canManageSchedule: true,
        canViewSchedule: true,
        canEditSchedule: true,
      };
    case 'doctor':
      return {
        canAccessDatabases: false,
        canManageDoctors: false,
        canManageUsers: false,
        canManageSchedule: false,
        canViewSchedule: true,
        canEditSchedule: true,
      };
    case 'patient':
      return {
        canAccessDatabases: false,
        canManageDoctors: false,
        canManageUsers: false,
        canManageSchedule: false,
        canViewSchedule: true,
        canEditSchedule: false,
      };
    default:
      return {
        canAccessDatabases: false,
        canManageDoctors: false,
        canManageUsers: false,
        canManageSchedule: false,
        canViewSchedule: false,
        canEditSchedule: false,
      };
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  // For now, default to admin user with full permissions since we're disabling real auth
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [permissions, setPermissions] = useState<Permissions>(getDefaultPermissions('admin'));

  // Simulate loading auth state on component mount
  useEffect(() => {
    // In a real implementation, we would check for tokens/cookies here
    // and then fetch the user data from an API
    const checkAuth = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, we're keeping the user authenticated as admin
      // In a real implementation, this would be based on actual auth status
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Update permissions when user role changes
  useEffect(() => {
    if (user) {
      setPermissions(getDefaultPermissions(user.role));
    } else {
      setPermissions(getDefaultPermissions('none'));
    }
  }, [user]);

  // Login function
  const login = async (email: string): Promise<boolean> => {
    // We're not using password in this mock, but keep parameter for API compatibility
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For development/testing - auto login as admin for specific email
      if (email.includes('admin')) {
        setUser({
          id: '1',
          name: 'Admin User',
          email: email,
          role: 'admin'
        });
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else if (email.includes('doctor')) {
        setUser({
          id: '2',
          name: 'Doctor User',
          email: email,
          role: 'doctor'
        });
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else if (email) {
        setUser({
          id: '3',
          name: 'Regular User',
          email: email,
          role: 'patient'
        });
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      }
      
      // Failed login
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    // In a real implementation, we would clear tokens/cookies here
    setUser(null);
    setIsAuthenticated(false);
    setPermissions(getDefaultPermissions('none'));
    
    // In a real implementation, we would redirect to login page:
    // const router = useRouter();
    // router.push('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        permissions, 
        login, 
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Utility hook to check if user has specific permission
export function useHasPermission(permission: keyof Permissions) {
  const { permissions } = useAuth();
  return permissions[permission];
}

// Utility hook to check if user is admin
export function useIsAdmin() {
  const { user } = useAuth();
  return user?.role === 'admin';
} 
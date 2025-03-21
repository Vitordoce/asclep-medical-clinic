'use client'
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { AuthProvider, useAuth, useIsAdmin } from './AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

// The actual layout component that uses the AuthContext
function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { user, logout, permissions } = useAuth();
  const isAdmin = useIsAdmin();

  const handleLogout = () => {
    logout();
    // In a real implementation, we would also clear tokens/cookies here
    // router.push('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="text-xl font-bold mb-6">Admin Panel</div>
        
        {/* User info */}
        {user && (
          <div className="mb-6 pb-4 border-b border-gray-700">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-xs mt-1 bg-blue-600 inline-block px-2 py-1 rounded">
              {user.role}
            </p>
          </div>
        )}
        
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/admin/dashboard" className="block p-2 hover:bg-gray-700 rounded">
                Dashboard
              </Link>
            </li>
            
            {permissions.canManageUsers && (
              <li>
                <Link href="/admin/users" className="block p-2 hover:bg-gray-700 rounded">
                  Users
                </Link>
              </li>
            )}
            
            {permissions.canManageDoctors && (
              <li>
                <Link href="/admin/doctors" className="block p-2 hover:bg-gray-700 rounded">
                  Doctors
                </Link>
              </li>
            )}
            
            {permissions.canManageSchedule && (
              <li>
                <Link href="/admin/calendar" className="block p-2 hover:bg-gray-700 rounded">
                  Calendar
                </Link>
              </li>
            )}
            
            {isAdmin && (
              <li>
                <Link href="/admin/settings" className="block p-2 hover:bg-gray-700 rounded">
                  Settings
                </Link>
              </li>
            )}
          </ul>
        </nav>
        
        <div className="absolute bottom-4">
          <button 
            onClick={handleLogout}
            className="p-2 w-56 text-center bg-red-600 hover:bg-red-700 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {/* Loading state */}
        {children}
      </main>
    </div>
  );
}

// Wrapper component that provides the AuthContext
export default function AdminLayout({ children }: AdminLayoutProps) {
  // NOTE: Authentication check is disabled for now
  // In a real implementation, we would check authentication status here
  // and redirect if not authenticated

  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
} 
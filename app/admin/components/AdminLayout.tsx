'use client'
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../auth';
import { DropDownButton } from '@progress/kendo-react-buttons';
import '@progress/kendo-theme-default/dist/all.css';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // If not authenticated, the AdminProtectedRoute will handle the redirect
  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { text: 'Dashboard', path: '/admin/dashboard' },
    { text: 'Users', path: '/admin/users' },
    { text: 'Doctors', path: '/admin/doctors' },
    { text: 'Calendar', path: '/admin/calendar' },
  ];

  const dropDownItems = menuItems.map(item => ({
    text: item.text,
    render: (props: any) => (
      <Link href={item.path} className="block w-full p-2 hover:bg-gray-700 text-white">
        {item.text}
      </Link>
    )
  }));

  return (
    <div className="flex h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 flex items-center justify-between">
        <div className="text-xl font-bold">Admin Panel</div>
        <DropDownButton
          text=""
          icon="menu"
          items={dropDownItems}
          className="bg-gray-800 border-none hover:bg-gray-700"
        />
      </div>

      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside className="hidden lg:block w-64 bg-gray-800 text-white p-4">
        <div className="text-xl font-bold mb-6">Admin Panel</div>
        
        {/* User info */}
        {user && (
          <div className="mb-6 pb-4 border-b border-gray-700">
            <p className="font-medium">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-xs mt-1 bg-blue-600 inline-block px-2 py-1 rounded">
              {user.role}
            </p>
          </div>
        )}
        
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className="block p-2 hover:bg-gray-700 rounded">
                  {item.text}
                </Link>
              </li>
            ))}
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

      {/* Main content - Adjusted padding for mobile */}
      <main className="flex-1 bg-gray-100 overflow-auto pt-20 lg:pt-6 p-6">
        {children}
      </main>
    </div>
  );
} 
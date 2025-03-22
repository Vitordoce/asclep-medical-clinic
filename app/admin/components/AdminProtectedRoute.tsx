"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../auth';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const router = useRouter();
  const auth = useAdminAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [auth.isLoading, auth.isAuthenticated, router]);

  // Show nothing while loading
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!auth.isAuthenticated) {
    return null;
  }

  // If authenticated, render children
  return <>{children}</>;
} 
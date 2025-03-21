"use client";

import { useState } from "react";
import Link from "next/link";

export default function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Mock validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    // In a real app, you would make an API call to authenticate
    // For demo purposes, we'll use a simple mock
    if (email === "doctor@asclep.com" && password === "password123") {
      window.location.href = "/doctor/dashboard";
    } else {
      setError("Invalid email or password");
    }
  };
  
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[var(--blue-900)]">Doctor Login</h2>
        <p className="text-[var(--gray-600)] mt-2">Sign in to access your appointment schedule</p>
      </div>
      
      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--gray-700)] mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)]"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-[var(--gray-700)]">
              Password
            </label>
            <Link 
              href="/forgot-password"
              className="text-sm text-[var(--blue-600)] hover:text-[var(--blue-800)]"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)]"
            placeholder="••••••••"
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-[var(--blue-600)] border-[var(--gray-300)] rounded focus:ring-[var(--blue-500)]"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--gray-700)]">
            Remember me
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-[var(--blue-600)] text-white py-2 px-4 rounded-md hover:bg-[var(--blue-700)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:ring-offset-2"
        >
          Sign in
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-[var(--gray-600)]">
          Need help? Contact <a href="mailto:support@asclep.com" className="text-[var(--blue-600)] hover:text-[var(--blue-800)]">IT Support</a>
        </p>
      </div>
    </div>
  );
} 
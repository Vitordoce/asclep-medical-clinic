"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/doctor-team.jpg"
            alt="Medical professionals"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="relative z-20 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-6">Asclep Medical Center</h1>
          <p className="text-xl mb-6">Welcome to the healthcare professional portal</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Manage your appointment schedule</span>
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Access patient records securely</span>
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Set your availability for bookings</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
} 
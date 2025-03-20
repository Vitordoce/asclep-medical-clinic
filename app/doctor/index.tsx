"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DoctorIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the doctor login page
    router.replace("/doctor/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-xl text-blue-800 mb-2">Redirecting to Doctor Portal...</h1>
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
} 
import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-[var(--gray-700)]">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-[var(--gray-700)]">Users Overview</h2>
          <p className="text-3xl font-bold text-[var(--blue-600)]">250</p>
          <p className="text-gray-500">Total registered users</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-[var(--gray-700)]">Doctors</h2>
          <p className="text-3xl font-bold text-[var(--blue-600)]">45</p>
          <p className="text-gray-500">Active doctors</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-[var(--gray-700)]">Appointments</h2>
          <p className="text-3xl font-bold text-[var(--blue-500)]">120</p>
          <p className="text-gray-500">Scheduled this week</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-[var(--gray-700)]">Recent Activity</h2>
        <div className="space-y-4">
          <div className="pb-3 border-b">
            <p className="font-medium text-[var(--gray-700)]">New doctor registered</p>
            <p className="text-sm text-gray-500">Dr. Sarah Johnson - 2 hours ago</p>
          </div>
          <div className="pb-3 border-b">
            <p className="font-medium text-[var(--gray-700)]">Appointment confirmed</p>
            <p className="text-sm text-gray-500">Patient #1242 with Dr. Williams - 3 hours ago</p>
          </div>
          <div className="pb-3 border-b">
            <p className="font-medium text-[var(--gray-700)]">User account updated</p>
            <p className="text-sm text-gray-500">User #5123 changed details - 5 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

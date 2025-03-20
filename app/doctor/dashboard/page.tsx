"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Scheduler
} from "@progress/kendo-react-scheduler";
import { 
  IntlProvider,
  LocalizationProvider 
} from "@progress/kendo-react-intl";
import { guid } from "@progress/kendo-react-common";
import { Button } from "@progress/kendo-react-buttons";

// Define appointment interface
interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
  recurrenceRule: string;
  recurrenceId: null;
  recurrenceExceptions: null;
  description: string;
}

// Fake data for appointments
const initialAppointments: Appointment[] = [
  {
    id: guid(),
    title: "Emma Thompson - Annual Checkup",
    start: new Date(new Date().setHours(9, 0, 0, 0)),
    end: new Date(new Date().setHours(10, 0, 0, 0)),
    isAllDay: false,
    recurrenceRule: "",
    recurrenceId: null,
    recurrenceExceptions: null,
    description: "Patient is coming for annual health assessment"
  },
  {
    id: guid(),
    title: "Robert Davis - Follow-up",
    start: new Date(new Date().setHours(11, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 30, 0, 0)),
    isAllDay: false,
    recurrenceRule: "",
    recurrenceId: null,
    recurrenceExceptions: null,
    description: "Post-surgery follow-up appointment"
  },
  {
    id: guid(),
    title: "Sarah Wilson - Consultation",
    start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 14, 0, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 15, 0, 0),
    isAllDay: false,
    recurrenceRule: "",
    recurrenceId: null,
    recurrenceExceptions: null,
    description: "Initial consultation for new patient"
  }
];

// Define time slot interface
interface TimeSlot {
  start: string;
  end: string;
}

// Define availability interface
interface Availability {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

// Mock data for available time slots configuration
const initialAvailability: Availability = {
  monday: [
    { start: "09:00", end: "12:00" },
    { start: "14:00", end: "17:00" }
  ],
  tuesday: [
    { start: "09:00", end: "12:00" },
    { start: "14:00", end: "17:00" }
  ],
  wednesday: [
    { start: "09:00", end: "12:00" },
    { start: "14:00", end: "17:00" }
  ],
  thursday: [
    { start: "09:00", end: "12:00" },
    { start: "14:00", end: "17:00" }
  ],
  friday: [
    { start: "09:00", end: "12:00" },
    { start: "14:00", end: "16:00" }
  ],
  saturday: [],
  sunday: []
};

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("week");
  const [availability, setAvailability] = useState<Availability>(initialAvailability);
  
  // Handle scheduler data changes
  const handleDataChange = ({ created, updated, deleted }: { 
    created: Appointment[];
    updated: Appointment[];
    deleted: Appointment[];
  }) => {
    setAppointments((old) => {
      const newData = [...old];
      
      if (created.length > 0) {
        created.forEach((item) => {
          newData.push(item);
        });
      }
      
      if (updated.length > 0) {
        updated.forEach((item) => {
          const index = newData.findIndex((i) => i.id === item.id);
          if (index >= 0) {
            newData[index] = { ...item };
          }
        });
      }
      
      if (deleted.length > 0) {
        deleted.forEach((item) => {
          const index = newData.findIndex((i) => i.id === item.id);
          if (index >= 0) {
            newData.splice(index, 1);
          }
        });
      }
      
      return newData;
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Dr. Emma Wilson</span>
            <img
              src="/doctor-1.jpg"
              alt="Doctor profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <Link href="/" className="text-sm text-blue-600 hover:text-blue-800">
              Logout
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">My Appointment Schedule</h2>
          
          <div className="h-[600px]">
            <LocalizationProvider language="en">
              <IntlProvider locale="en">
                <Scheduler
                  data={appointments}
                  onDataChange={handleDataChange}
                  view={view}
                  onViewChange={(e) => setView(e.value)}
                  date={selectedDate}
                  onDateChange={(e) => setSelectedDate(e.value)}
                  editable={true}
                  defaultView="week"
                />
              </IntlProvider>
            </LocalizationProvider>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Set Your Available Time Slots</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(availability).map(([day, slots]) => (
              <div key={day} className="border rounded-lg p-4">
                <h3 className="font-medium text-lg text-gray-800 capitalize mb-2">{day}</h3>
                
                {slots.length === 0 ? (
                  <p className="text-gray-500 italic">Not Available</p>
                ) : (
                  <ul className="space-y-2">
                    {slots.map((slot: TimeSlot, index: number) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">
                          {slot.start} - {slot.end}
                        </span>
                        <button 
                          className="text-red-600 hover:text-red-800 text-sm"
                          onClick={() => {
                            // This would update the availability state
                            // In a real app, this would also sync with the backend
                            const newAvailability = {...availability};
                            newAvailability[day as keyof Availability] = 
                              slots.filter((_: TimeSlot, i: number) => i !== index);
                            setAvailability(newAvailability);
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                
                <button 
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    // This would open a modal to add a new time slot
                    // For demo purposes, we'll just add a fixed slot
                    const newAvailability = {...availability};
                    const newSlots = [...slots, { start: "13:00", end: "14:00" }];
                    newAvailability[day as keyof Availability] = newSlots;
                    setAvailability(newAvailability);
                  }}
                >
                  + Add Time Slot
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button
              themeColor="primary"
              onClick={() => {
                // In a real app, this would save to the backend
                alert("Availability settings saved successfully!");
              }}
            >
              Save Availability Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 
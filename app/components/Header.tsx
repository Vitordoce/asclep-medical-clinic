"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Fake data for doctors and time slots
const specialties = [
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Ophthalmology",
];

const doctors = [
  {
    id: 1,
    name: "Dr. Emma Wilson",
    specialty: "Cardiology",
    image: "/doctor-1.jpg",
  },
  {
    id: 2,
    name: "Dr. James Chen",
    specialty: "Neurology",
    image: "/doctor-2.jpg",
  },
  {
    id: 3,
    name: "Dr. Sarah Johnson",
    specialty: "Dermatology",
    image: "/doctor-3.jpg",
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    specialty: "Pediatrics",
    image: "/doctor-1.jpg",
  },
  {
    id: 5,
    name: "Dr. Lisa Park",
    specialty: "Orthopedics",
    image: "/doctor-2.jpg",
  },
  {
    id: 6,
    name: "Dr. Robert Davis",
    specialty: "Ophthalmology",
    image: "/doctor-3.jpg",
  },
];

// Generate time slots for the next 7 days
const generateTimeSlots = () => {
  const timeSlots = [];
  const today = new Date();
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(date.getDate() + day);
    
    // Format date as "Day, Month Date"
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Random available slots for each day
    const daySlots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      // Randomly make some slots available and some not
      if (Math.random() > 0.4) {
        daySlots.push({
          time: `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`,
          available: true
        });
      } else {
        daySlots.push({
          time: `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`,
          available: false
        });
      }
    }
    
    timeSlots.push({
      date: dateStr,
      slots: daySlots
    });
  }
  
  return timeSlots;
};

const timeSlots = generateTimeSlots();

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentStep, setAppointmentStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  const filteredDoctors = selectedSpecialty 
    ? doctors.filter(doctor => doctor.specialty === selectedSpecialty)
    : doctors;
    
  const availableDates = timeSlots.map(slot => slot.date);
  
  const availableTimes = selectedDate
    ? timeSlots.find(slot => slot.date === selectedDate)?.slots.filter(slot => slot.available) || []
    : [];
    
  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
  };
  
  const handleDoctorSelect = (doctorId: number) => {
    setSelectedDoctor(doctorId);
    setAppointmentStep(2);
  };
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleBookAppointment = () => {
    // In a real app, this would submit the appointment data to a backend
    alert(`Appointment booked!\nDoctor: ${doctors.find(d => d.id === selectedDoctor)?.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
    setIsAppointmentOpen(false);
    resetAppointmentState();
  };
  
  const resetAppointmentState = () => {
    setAppointmentStep(1);
    setSelectedSpecialty("");
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
  };
  
  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Asclep</h1>
            <nav className="hidden md:flex ml-10">
              <ul className="flex space-x-8">
                <li><Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link></li>
                <li><Link href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link></li>
                <li><Link href="#doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Doctors</Link></li>
                <li><Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link></li>
                <li><Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link></li>
              </ul>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Sign Up
            </Link>
            <Link 
              href="/login"
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              Login
            </Link>
            <button 
              onClick={() => setIsAppointmentOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Make Appointment
            </button>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Login</h2>
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign in
              </button>
              
              <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Appointment Booking Modal */}
      {isAppointmentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Book an Appointment</h2>
              <button 
                onClick={() => {
                  setIsAppointmentOpen(false);
                  resetAppointmentState();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Appointment Steps */}
            <div className="mb-8">
              <div className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${appointmentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${appointmentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${appointmentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <div className={`flex-1 h-1 mx-2 ${appointmentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${appointmentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Select Doctor</span>
                <span>Choose Date & Time</span>
                <span>Confirm</span>
              </div>
            </div>
            
            {/* Step 1: Select Doctor */}
            {appointmentStep === 1 && (
              <div>
                <div className="mb-6">
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">Filter by Specialty</label>
                  <select
                    id="specialty"
                    value={selectedSpecialty}
                    onChange={(e) => handleSpecialtyChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDoctors.map((doctor) => (
                    <div 
                      key={doctor.id}
                      onClick={() => handleDoctorSelect(doctor.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedDoctor === doctor.id ? 'border-blue-600' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden">
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            fill
                            sizes="64px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{doctor.name}</h3>
                          <p className="text-sm text-blue-600">{doctor.specialty}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Step 2: Select Date and Time */}
            {appointmentStep === 2 && (
              <div>
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Selected Doctor:</h3>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    {selectedDoctor && (
                      <>
                        <div className="relative h-16 w-16 rounded-full overflow-hidden">
                          <Image
                            src={doctors.find(d => d.id === selectedDoctor)?.image || ""}
                            alt={doctors.find(d => d.id === selectedDoctor)?.name || ""}
                            fill
                            sizes="64px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{doctors.find(d => d.id === selectedDoctor)?.name}</h3>
                          <p className="text-sm text-blue-600">{doctors.find(d => d.id === selectedDoctor)?.specialty}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Select Date:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        className={`p-3 text-center rounded-lg transition-colors ${selectedDate === date ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
                
                {selectedDate && (
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Select Time:</h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {availableTimes.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => handleTimeSelect(slot.time)}
                          className={`p-3 text-center rounded-lg transition-colors ${selectedTime === slot.time ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setAppointmentStep(1)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  
                  <button
                    onClick={() => {
                      if (selectedDate && selectedTime) {
                        setAppointmentStep(3);
                      } else {
                        alert("Please select both date and time");
                      }
                    }}
                    className={`px-4 py-2 rounded-md ${selectedDate && selectedTime ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Confirm Appointment */}
            {appointmentStep === 3 && (
              <div>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-800 mb-4 text-lg">Appointment Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-1/3">Doctor:</span>
                      <span className="text-gray-800">{doctors.find(d => d.id === selectedDoctor)?.name}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-1/3">Specialty:</span>
                      <span className="text-gray-800">{doctors.find(d => d.id === selectedDoctor)?.specialty}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-1/3">Date:</span>
                      <span className="text-gray-800">{selectedDate}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-1/3">Time:</span>
                      <span className="text-gray-800">{selectedTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Additional Information:</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for visit</label>
                      <textarea
                        id="reason"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please describe your symptoms or reason for the appointment..."
                      />
                    </div>
                    
                    <div className="flex items-start">
                      <input
                        id="new-patient"
                        type="checkbox"
                        className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="new-patient" className="ml-2 block text-sm text-gray-700">
                        I am a new patient
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setAppointmentStep(2)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  
                  <button
                    onClick={handleBookAppointment}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 
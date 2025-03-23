'use client'
import React, { useState, useEffect } from 'react';
import { ListView } from '@progress/kendo-react-listview';
import { Button } from '@progress/kendo-react-buttons';
import '@progress/kendo-theme-default/dist/all.css';
import PatientForm from './PatientForm';
import { User } from '../types';

const UserCard = (props: { dataItem: User; onEdit: (user: User) => void; onDelete: (userId: number | string) => void }) => {
    const { dataItem, onEdit, onDelete } = props;
    
    // Handle optional lastVisit field
    const formattedDate = dataItem.lastVisit 
        ? new Date(dataItem.lastVisit).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        : 'Never';

    // Default name display if name is not available
    const displayName = dataItem.name || `${dataItem.firstName} ${dataItem.lastName}`;
    
    // Generate initials from name or first/last name
    const initials = dataItem.name 
        ? dataItem.name.split(' ').map(n => n[0]).join('')
        : `${dataItem.firstName?.[0] || ''}${dataItem.lastName?.[0] || ''}`;

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        onEdit(dataItem);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        if (!dataItem.id) {
            alert('Cannot delete this user: Missing user ID');
            return;
        }
        
        if (confirm('Are you sure you want to delete this user?')) {
            onDelete(dataItem.id);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between gap-4">
                {/* User Info with Status */}
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-semibold">
                        {initials}
                    </div>
                    <div className="flex items-center gap-3">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">{displayName}</h3>
                            <p className="text-sm text-gray-600">{dataItem.email}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs ${
                            dataItem.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {dataItem.status || 'unknown'}
                        </div>
                    </div>
                </div>

                {/* Visit Info */}
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-xs text-gray-500">Last Visit</p>
                        <p className="text-sm font-medium">{formattedDate}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500">Appointments</p>
                        <p className="text-sm font-medium">{dataItem.appointmentsTotal || 0}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                    <button 
                        onClick={handleEditClick}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit user"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button 
                        onClick={handleDeleteClick}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete user"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

const PatientsAdmin: React.FC = () => {
    const [patientsList, setPatientsList] = useState<User[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch patients from API
    const fetchPatients = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/patients');
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Transform the API data to match our User type if needed
            const formattedPatients = data.map((patient: { 
                id: number | string; 
                first_name: string; 
                last_name: string;
                email: string;
                role: string;
                last_visit?: string;
                appointments_total?: number;
                status?: 'active' | 'inactive';
                avatar?: string;
            }) => {
                if (!patient.id) {
                    console.warn('Patient missing ID:', patient);
                }
                
                return {
                    id: patient.id,
                    firstName: patient.first_name,
                    lastName: patient.last_name,
                    name: `${patient.first_name} ${patient.last_name}`,
                    email: patient.email,
                    userType: patient.role,
                    lastVisit: patient.last_visit || null,
                    appointmentsTotal: patient.appointments_total || 0,
                    status: patient.status || 'active',
                    avatar: patient.avatar || "/avatars/default.jpg"
                };
            });
            
            setPatientsList(formattedPatients);
        } catch (err) {
            setError('Failed to fetch patients. Please try again later.');
            console.error('Error fetching patients:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleAddPatient = () => {
        setSelectedPatient(undefined);
        setIsFormOpen(true);
    };

    const handleEditPatient = (patient: User) => {
        setSelectedPatient(patient);
        setIsFormOpen(true);
    };

    const handleSavePatient = async (patientData: User) => {
        try {
            if (patientData.id) {
                // Edit existing patient - PUT request
                const response = await fetch(`/api/users/${patientData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: patientData.email,
                        first_name: patientData.firstName,
                        last_name: patientData.lastName,
                        role: 'patient',
                        password: '',
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                await response.json();
                
                // Update local state
                setPatientsList(prevPatients => 
                    prevPatients.map(patient => 
                        patient.id === patientData.id 
                            ? { 
                                ...patientData, 
                                name: `${patientData.firstName} ${patientData.lastName}`,
                              } 
                            : patient
                    )
                );
            } else {
                // Add new patient - POST request
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: patientData.email,
                        first_name: patientData.firstName,
                        last_name: patientData.lastName,
                        role: 'patient',
                        password: 'password', // You should have a proper password field in the form
                    }),
                }); 

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const newPatient = await response.json();
                
                // Ensure newPatient has an id
                if (!newPatient.id) {
                    throw new Error('Server response missing patient ID');
                }
                
                // Format the response to match our User type
                const formattedNewPatient = {
                    id: newPatient.id,
                    firstName: newPatient.first_name,
                    lastName: newPatient.last_name,
                    name: `${newPatient.first_name} ${newPatient.last_name}`,
                    email: newPatient.email,
                    userType: newPatient.role,
                    lastVisit: new Date().toISOString().split('T')[0],
                    appointmentsTotal: 0,
                    status: 'active' as const,
                    avatar: "/avatars/default.jpg"
                };
                
                // Update local state
                setPatientsList(prevPatients => [...prevPatients, formattedNewPatient]);
            }
            
            // Close the form
            setIsFormOpen(false);
        } catch (err) {
            console.error('Error saving patient:', err);
            alert('Failed to save patient. Please try again.');
        }
    };

    const handleDeletePatient = async (patientId: number | string) => {
        if (!patientId) {
            console.error('Error deleting patient: Missing patient ID');
            alert('Failed to delete patient: Invalid patient ID');
            return;
        }

        if (!confirm('Are you sure you want to delete this patient?')) {
            return;
        }
        
        try {
            // First check if there are any appointments for this patient
            const appointmentsResponse = await fetch(`/api/appointments/patient/${patientId}`);
            if (appointmentsResponse.ok) {
                const appointments = await appointmentsResponse.json();
                if (appointments && appointments.length > 0) {
                    if (!confirm('This patient has existing appointments. Deleting the patient will also delete all their appointments. Continue?')) {
                        return;
                    }
                }
            }

            // Delete the user record (this will cascade delete patient data due to foreign key constraints)
            const response = await fetch(`/api/users/${patientId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(`Error: ${response.status}${errorData ? ' - ' + errorData.message : ''}`);
            }

            // Update local state
            setPatientsList(prevPatients => prevPatients.filter(patient => patient.id !== patientId));
        } catch (err) {
            console.error('Error deleting patient:', err);
            alert('Failed to delete patient. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full py-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-blue-800">Patients Administration</h2>
                        <Button 
                            themeColor={'primary'}
                            onClick={handleAddPatient}
                        >
                            Add New Patient
                        </Button>
                    </div>
                    
                    {isLoading ? (
                        <div className="text-center py-10">
                            <p>Loading patients...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-600">
                            <p>{error}</p>
                            <Button 
                                onClick={fetchPatients} 
                                className="mt-4"
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <ListView
                            data={patientsList}
                            item={(props) => (
                                <UserCard 
                                    {...props} 
                                    onEdit={handleEditPatient} 
                                    onDelete={handleDeletePatient}
                                />
                            )}
                            className="space-y-2"
                            style={{
                                border: 'none',
                                background: 'transparent'
                            }}
                        />
                    )}
                </div>
            </main>

            {/* Patient Form Modal */}
            <PatientForm 
                patient={selectedPatient}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSavePatient}
            />
        </div>
    );
};

export default PatientsAdmin; 
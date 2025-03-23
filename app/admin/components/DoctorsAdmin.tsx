'use client'
import React, { useState, useEffect } from 'react';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column, GridToolbar, GridSearchBox, GridRowClickEvent, GridCellProps } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import DoctorForm from './DoctorForm';
import { User } from '../types';

interface Doctor {
    id: number;
    full_name: string;
    specialty: string;
    rating: number;
    experience: number;
    patients: number;
    phone: string;
    email: string;
    address: string;
    availability: string;
    image: string;
}

interface ApiDoctor {
    user_id: number;
    specialty: string;
    email: string;
    first_name: string;
    last_name: string;
}

// Mock data for doctors (will be replaced with API data)
const mockDoctors: Doctor[] = [
    {
        id: 1,
        full_name: "Dr. Emma Wilson",
        specialty: "Cardiology",
        rating: 4.8,
        experience: 15,
        patients: 25,
        phone: "(555) 123-4567",
        email: "emma.wilson@asclep.com",
        address: "123 Medical Center Drive, SF",
        availability: "Mon-Fri",
        image: "/doctor-1.jpg"
    },
    {
        id: 2,
        full_name: "Dr. James Chen",
        specialty: "Neurology",
        rating: 4.9,
        experience: 12,
        patients: 18,
        phone: "(555) 234-5678",
        email: "james.chen@asclep.com",
        address: "123 Medical Center Drive, SF",
        availability: "Mon-Thu",
        image: "/doctor-2.jpg"
    },
    {
        id: 3,
        full_name: "Dr. Sarah Johnson",
        specialty: "Dermatology",
        rating: 4.7,
        experience: 10,
        patients: 3,
        phone: "(555) 345-6789",
        email: "sarah.johnson@asclep.com",
        address: "123 Medical Center Drive, SF",
        availability: "Tue-Sat",
        image: "/doctor-3.jpg"
    },
    {
        id: 4,
        full_name: "Dr. Michael Brown",
        specialty: "Orthopedics",
        rating: 4.9,
        experience: 8,
        patients: 20,
        phone: "(555) 456-7890",
        email: "michael.brown@asclep.com",
        address: "123 Medical Center Drive, SF",
        availability: "Mon-Fri",
        image: "/doctor-4.jpg"
    },
    {
        id: 5,
        full_name: "Dr. Lisa Martinez",
        specialty: "Pediatrics",
        rating: 4.8,
        experience: 14,
        patients: 28,
        phone: "(555) 567-8901",
        email: "lisa.martinez@asclep.com",
        address: "123 Medical Center Drive, SF",
        availability: "Mon-Fri",
        image: "/doctor-5.jpg"
    },
    {
        id: 6,
        full_name: "Dr. John Doe",
        specialty: "Cardiology",
        rating: 4.8,
        experience: 15,
        patients: 25,
        phone: "(555) 123-4567",
        email: "john.doe@asclep.com",
        address: "123 Medical Center Drive, SF",
        availability: "Mon-Fri",
        image: "/doctor-6.jpg"
    }   
];

const DATA_ITEM_KEY = 'id';

// Custom cell component for delete action
interface DeleteCellProps extends GridCellProps {
    onClick?: (id: number) => void;
}

const DeleteCell = (props: DeleteCellProps) => {
    const { dataItem } = props;
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent row click event
        if (props.onClick) {
            props.onClick(dataItem.id);
        }
    };

    return (
        <td>
            <Button 
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete doctor"
                rounded="full"
                themeColor="light"
                fillMode="flat"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </Button>
        </td>
    );
};

const DoctorsAdmin: React.FC = () => {
    const [pdfExport, setPdfExport] = React.useState<GridPDFExport | null>(null);
    const [excelExport, setExcelExport] = React.useState<ExcelExport | null>(null);
    const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch doctors from API
    const fetchDoctors = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/api/doctors');
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.error || `Error: ${response.status}`;
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            
            if (!data || data.length === 0) {
                console.warn('No doctors found in API, using mock data');
                setDoctors(mockDoctors);
                return;
            }
            
            // Format the doctor data
            const formattedDoctors = data.map((doc: ApiDoctor) => ({
                id: doc.user_id,
                full_name: `${doc.first_name} ${doc.last_name}`,
                specialty: doc.specialty || 'General',
                rating: 4.5, // Default rating since it's not in the API
                experience: 5, // Default experience since it's not in the API
                patients: 10, // Default patients count since it's not in the API
                phone: '(555) 123-4567', // Default phone since it's not in the API
                email: doc.email,
                address: '123 Medical Center Drive, SF', // Default address since it's not in the API
                availability: 'Mon-Fri', // Default availability since it's not in the API
                image: '/doctor-1.jpg' // Default image since it's not in the API
            }));
            
            setDoctors(formattedDoctors);
        } catch (err) {
            console.error('Error fetching doctors:', err);
            // Fallback to mock data
            setDoctors(mockDoctors);
            setError(`Failed to fetch doctors: ${err instanceof Error ? err.message : 'Unknown error'}. Using mock data.`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const exportExcel = () => {
        if (excelExport) {
            excelExport.save();
        }
    };

    const exportPDF = () => {
        if (pdfExport) {
            pdfExport.save();
        }
    };

    const handleAddDoctor = () => {
        setSelectedDoctor(undefined);
        setIsFormOpen(true);
    };

    const handleEditDoctor = (doctorId: number) => {
        // Find the doctor by ID
        const doctor = doctors.find(d => d.id === doctorId);
        if (!doctor) return;

        // Create a User object from the doctor data
        const userDoctor: User = {
            id: doctor.id,
            firstName: doctor.full_name.split(' ')[0],
            lastName: doctor.full_name.split(' ').slice(1).join(' '),
            email: doctor.email,
            userType: 'doctor',
            role: 'doctor'
        };

        setSelectedDoctor(userDoctor);
        setIsFormOpen(true);
    };

    const handleSaveDoctor = async (doctorData: User) => {
        try {
            if (doctorData.id) {
                // Edit existing doctor - PUT request
                // First update the user data
                const userResponse = await fetch(`/api/users/${doctorData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: doctorData.email,
                        first_name: doctorData.firstName,
                        last_name: doctorData.lastName,
                        role: 'doctor',
                        password: '', // Keep existing password
                    }),
                });

                if (!userResponse.ok) {
                    throw new Error(`Error updating user: ${userResponse.status}`);
                }

                // Then update the doctor specialty if provided
                if (doctorData.specialty) {
                    const doctorResponse = await fetch(`/api/doctors/${doctorData.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            specialty: doctorData.specialty,
                        }),
                    });

                    if (!doctorResponse.ok) {
                        throw new Error(`Error updating doctor specialty: ${doctorResponse.status}`);
                    }
                }

                // Refresh the doctors list
                fetchDoctors();
            } else {
                // Add new doctor - First create user
                const userResponse = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: doctorData.email,
                        first_name: doctorData.firstName,
                        last_name: doctorData.lastName,
                        role: 'doctor',
                        phone: doctorData.phone || '',
                        password: 'password', // Default password
                    }),
                });

                if (!userResponse.ok) {
                    throw new Error(`Error creating user: ${userResponse.status}`);
                }

                const newUser = await userResponse.json();

                // Then create doctor record with specialty
                if (doctorData.specialty) {
                    const doctorResponse = await fetch('/api/doctors', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: newUser.id,
                            specialty: doctorData.specialty,
                        }),
                    });

                    if (!doctorResponse.ok) {
                        throw new Error(`Error creating doctor: ${doctorResponse.status}`);
                    }
                }

                // Refresh the doctors list
                fetchDoctors();
            }
            
            // Close the form
            setIsFormOpen(false);
        } catch (err) {
            console.error('Error saving doctor:', err);
            alert('Failed to save doctor. Please try again.');
        }
    };

    const handleDeleteDoctor = async (doctorId: number) => {
        if (!doctorId) {
            console.error('Error deleting doctor: Missing doctor ID');
            alert('Failed to delete doctor: Invalid doctor ID');
            return;
        }
        
        if (!confirm('Are you sure you want to delete this doctor?')) {
            return;
        }
        
        try {
            // First check if there are any appointments for this doctor
            const appointmentsResponse = await fetch(`/api/appointments/doctor/${doctorId}`);
            if (appointmentsResponse.ok) {
                const appointments = await appointmentsResponse.json();
                if (appointments && appointments.length > 0) {
                    if (!confirm('This doctor has existing appointments. Deleting the doctor will also delete all their appointments. Continue?')) {
                        return;
                    }
                }
            }

            // First delete doctor specialty record
            const doctorResponse = await fetch(`/api/doctors/${doctorId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!doctorResponse.ok) {
                const errorData = await doctorResponse.json().catch(() => null);
                throw new Error(`Error deleting doctor data: ${doctorResponse.status}${errorData ? ' - ' + errorData.message : ''}`);
            }
            
            // Then delete user record
            const userResponse = await fetch(`/api/users/${doctorId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!userResponse.ok) {
                const errorData = await userResponse.json().catch(() => null);
                throw new Error(`Error deleting user data: ${userResponse.status}${errorData ? ' - ' + errorData.message : ''}`);
            }

            // Update local state
            setDoctors(prevDoctors => prevDoctors.filter(doctor => doctor.id !== doctorId));
        } catch (err) {
            console.error('Error deleting doctor:', err);
            alert('Failed to delete doctor. Please try again.');
        }
    };

    const handleRowClick = (e: GridRowClickEvent) => {
        const doctorId = e.dataItem.id;
        handleEditDoctor(doctorId);
    };

    const grid = (
        <Grid
            style={{ height: 'calc(80vh - 200px)', minHeight: '370px' }}
            dataItemKey={DATA_ITEM_KEY}
            data={doctors}
            sortable={true}
            defaultGroup={[{ field: 'specialty' }]}
            pageable={{ 
                pageSizes: [5, 10, 20],
                buttonCount: 5
            }}
            groupable={true}
            defaultTake={10}
            defaultSkip={0}
            className="rounded-lg overflow-hidden"
            onRowClick={handleRowClick}
        >
            <GridToolbar>
                <div className="flex flex-col md:flex-row justify-between items-center w-full p-4 gap-4 bg-gray-50 border-b">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <GridSearchBox 
                            style={{ width: '100%', minWidth: '210px' }}
                            placeholder="Search doctors..."
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button 
                            themeColor={'primary'} 
                            onClick={handleAddDoctor}
                            className="whitespace-nowrap"
                        >
                            Add New Doctor
                        </Button>
                        <ButtonGroup>
                            <Button 
                                themeColor={'primary'} 
                                onClick={exportExcel}
                                className="whitespace-nowrap"
                            >
                                Export to Excel
                            </Button>
                            <Button 
                                themeColor={'primary'} 
                                onClick={exportPDF}
                                className="whitespace-nowrap"
                            >
                                Export to PDF
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </GridToolbar>
            
            <Column field="full_name" title="Doctor Name" width="250px" />
            <Column field="specialty" title="Specialty" width="150px" />
            <Column field="patients" title="Total Patients" width="150px" />
            <Column field="phone" title="Phone" width="150px" />
            <Column field="email" title="Email" width="300px" />
            <Column 
                width="80px" 
                title="Actions" 
                cell={(props: GridCellProps) => (
                    <DeleteCell {...props as GridCellProps} onClick={handleDeleteDoctor} />
                )}
            />
        </Grid>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full mx-auto py-6">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Doctors Administration</h2>
                    {isLoading ? (
                        <div className="text-center py-10 bg-white rounded-lg shadow-lg">
                            <p>Loading doctors...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-600 bg-white rounded-lg shadow-lg">
                            <p>{error}</p>
                            <Button 
                                onClick={fetchDoctors} 
                                className="mt-4"
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg">
                            <ExcelExport
                                data={doctors}
                                ref={(exporter) => setExcelExport(exporter)}
                            >
                                {grid}
                            </ExcelExport>
                            <GridPDFExport
                                margin="1cm"
                                ref={(element) => setPdfExport(element)}
                            >
                                {grid}
                            </GridPDFExport>
                        </div>
                    )}
                </div>
            </main>

            {/* Doctor Form Modal */}
            <DoctorForm 
                doctor={selectedDoctor}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveDoctor}
            />
        </div>
    );
};

export default DoctorsAdmin; 
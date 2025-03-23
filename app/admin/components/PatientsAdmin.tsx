'use client'
import React, { useState, useEffect } from 'react';
import { ListView } from '@progress/kendo-react-listview';
import { Button } from '@progress/kendo-react-buttons';
import '@progress/kendo-theme-default/dist/all.css';
import UserForm from './UserForm';
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
        if (confirm('Are you sure you want to delete this user?')) {
            onDelete(dataItem.id!);
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
    const [usersList, setUsersList] = useState<User[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/users');
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Transform the API data to match our User type if needed
            const formattedUsers = data.map((user: { 
                id: number | string; 
                first_name: string; 
                last_name: string;
                email: string;
                role: string;
                last_visit?: string;
                appointments_total?: number;
                status?: 'active' | 'inactive';
                avatar?: string;
            }) => ({
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                userType: user.role,
                lastVisit: user.last_visit || null,
                appointmentsTotal: user.appointments_total || 0,
                status: user.status || 'active',
                avatar: user.avatar || "/avatars/default.jpg"
            }));
            
            setUsersList(formattedUsers);
        } catch (err) {
            setError('Failed to fetch users. Please try again later.');
            console.error('Error fetching users:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = () => {
        setSelectedUser(undefined);
        setIsFormOpen(true);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    const handleSaveUser = async (userData: User) => {
        try {
            if (userData.id) {
                // Edit existing user - PUT request
                const response = await fetch(`/api/users/${userData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        first_name: userData.firstName,
                        last_name: userData.lastName,
                        role: userData.userType,
                        password: '',
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                await response.json();
                
                // Update local state
                setUsersList(prevUsers => 
                    prevUsers.map(user => 
                        user.id === userData.id 
                            ? { 
                                ...userData, 
                                name: `${userData.firstName} ${userData.lastName}`,
                              } 
                            : user
                    )
                );
            } else {
                // Add new user - POST request
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        first_name: userData.firstName,
                        last_name: userData.lastName,
                        role: userData.userType,
                        password: 'password', // You should have a proper password field in the form
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const newUser = await response.json();
                
                // Format the response to match our User type
                const formattedNewUser = {
                    id: newUser.id,
                    firstName: newUser.first_name,
                    lastName: newUser.last_name,
                    name: `${newUser.first_name} ${newUser.last_name}`,
                    email: newUser.email,
                    userType: newUser.role,
                    lastVisit: new Date().toISOString().split('T')[0],
                    appointmentsTotal: 0,
                    status: 'active' as const,
                    avatar: "/avatars/default.jpg"
                };
                
                // Update local state
                setUsersList(prevUsers => [...prevUsers, formattedNewUser]);
            }
            
            // Close the form
            setIsFormOpen(false);
        } catch (err) {
            console.error('Error saving user:', err);
            alert('Failed to save user. Please try again.');
        }
    };

    const handleDeleteUser = async (userId: number | string) => {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            // Update local state
            setUsersList(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full py-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-blue-800">Users Administration</h2>
                        <Button 
                            themeColor={'primary'}
                            onClick={handleAddUser}
                        >
                            Add New User
                        </Button>
                    </div>
                    
                    {isLoading ? (
                        <div className="text-center py-10">
                            <p>Loading users...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-600">
                            <p>{error}</p>
                            <Button 
                                onClick={fetchUsers} 
                                className="mt-4"
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <ListView
                            data={usersList}
                            item={(props) => (
                                <UserCard 
                                    {...props} 
                                    onEdit={handleEditUser} 
                                    onDelete={handleDeleteUser}
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

            {/* User Form Modal */}
            <UserForm 
                user={selectedUser}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveUser}
            />
        </div>
    );
};

export default PatientsAdmin; 
'use client'
import React from 'react';
import { ListView } from '@progress/kendo-react-listview';
import { Button } from '@progress/kendo-react-buttons';
import Link from 'next/link';
import '@progress/kendo-theme-default/dist/all.css';

interface User {
    id: number;
    name: string;
    email: string;
    lastVisit: string;
    appointmentsTotal: number;
    status: 'active' | 'inactive';
    avatar: string;
}

const users: User[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        lastVisit: "2024-03-15",
        appointmentsTotal: 8,
        status: "active",
        avatar: "/avatars/avatar1.jpg"
    },
    {
        id: 2,
        name: "Michael Chen",
        email: "m.chen@example.com",
        lastVisit: "2024-03-18",
        appointmentsTotal: 5,
        status: "active",
        avatar: "/avatars/avatar2.jpg"
    },
    {
        id: 3,
        name: "Emma Wilson",
        email: "emma.w@example.com",
        lastVisit: "2024-03-10",
        appointmentsTotal: 12,
        status: "active",
        avatar: "/avatars/avatar3.jpg"
    },
    {
        id: 4,
        name: "James Rodriguez",
        email: "j.rodriguez@example.com",
        lastVisit: "2024-02-28",
        appointmentsTotal: 3,
        status: "inactive",
        avatar: "/avatars/avatar4.jpg"
    },
    {
        id: 5,
        name: "Lisa Thompson",
        email: "lisa.t@example.com",
        lastVisit: "2024-03-19",
        appointmentsTotal: 15,
        status: "active",
        avatar: "/avatars/avatar5.jpg"
    }
];

const UserCard = (props: { dataItem: User }) => {
    const { dataItem } = props;
    const formattedDate = new Date(dataItem.lastVisit).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between gap-4">
                {/* User Info with Status */}
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-semibold">
                        {dataItem.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex items-center gap-3">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">{dataItem.name}</h3>
                            <p className="text-sm text-gray-600">{dataItem.email}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs ${
                            dataItem.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {dataItem.status}
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
                        <p className="text-sm font-medium">{dataItem.appointmentsTotal}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                    <button 
                        onClick={() => console.log('Edit user:', dataItem.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit user"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => console.log('Delete user:', dataItem.id)}
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

const UsersAdmin: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-blue-800 text-xl font-bold">
                                    Asclep
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link 
                                    href="/admin/doctors" 
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Doctors
                                </Link>
                                <Link 
                                    href="/admin/users" 
                                    className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Users
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full py-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-blue-800">Users Administration</h2>
                        <Button 
                            themeColor={'primary'}
                            onClick={() => console.log('Add new user')}
                        >
                            Add New User
                        </Button>
                    </div>
                    <ListView
                        data={users}
                        item={UserCard}
                        className="space-y-2"
                        style={{
                            border: 'none',
                            background: 'transparent'
                        }}
                    />
                </div>
            </main>
        </div>
    );
};

export default UsersAdmin; 
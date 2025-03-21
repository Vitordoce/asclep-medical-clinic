'use client'
import React from 'react';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column, GridToolbar, GridSearchBox} from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';

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

// Mock data for doctors
const doctors: Doctor[] = [
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

// const RatingCell = (props: GridCellProps) => {
//     const dataItem = props.dataItem as Doctor;
//     return (
//         <td>
//             <div className="flex items-center">
//                 <span className="text-yellow-400 mr-1">★</span>
//                 {dataItem[props.field as keyof Doctor]}
//             </div>
//         </td>
//     );
// };

// const ImageCell = (props: GridCellProps) => {
//     const dataItem = props.dataItem as Doctor;
//     return (
//         <td>
//             <div className="flex items-center">
//                 <Image
//                     alt={dataItem.full_name}
//                     className="w-10 h-10 rounded-full mr-3"
//                 />
//                 {dataItem[props.field as keyof Doctor]}
//             </div>
//         </td>
//     );
// };

const DoctorsAdmin: React.FC = () => {
    const [pdfExport, setPdfExport] = React.useState<GridPDFExport | null>(null);
    const [excelExport, setExcelExport] = React.useState<ExcelExport | null>(null);

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
        >
            <GridToolbar>
                <div className="flex flex-col md:flex-row justify-between items-center w-full p-4 gap-4 bg-gray-50 border-b">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <GridSearchBox 
                            style={{ width: '100%', minWidth: '210px' }}
                            placeholder="Search doctors..."
                        />
                    </div>
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
            </GridToolbar>
            
            <Column field="full_name" title="Doctor Name" width="250px" />
            <Column field="specialty" title="Specialty" width="150px" />
            <Column field="patients" title="Total Patients" width="150px" />
            <Column field="phone" title="Phone" width="150px" />
            <Column field="email" title="Email" width="300px" />
        </Grid>
    );

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full mx-auto py-6">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Doctors Administration</h2>
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
                </div>
            </main>
        </div>
    );
};

export default DoctorsAdmin; 
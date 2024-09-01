import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { TableVirtuoso } from 'react-virtuoso';
import axiosApi from '../service/api';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import AddStudentModal from './AddStudentModal';

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

// Set display names for each forwarded component
VirtuosoTableComponents.Scroller.displayName = 'VirtuosoScroller';
VirtuosoTableComponents.Table.displayName = 'VirtuosoTable';
VirtuosoTableComponents.TableHead.displayName = 'VirtuosoTableHead';
VirtuosoTableComponents.TableBody.displayName = 'VirtuosoTableBody';

const columns = [
    { width: 120, label: 'Name', dataKey: 'name' },
    { width: 80, label: 'Subject Name', dataKey: 'subjectName' },
    { width: 60, label: 'Mark', dataKey: 'mark', numeric: true },
    { width: 60, label: 'Edit', dataKey: 'mark', numeric: true },
    { width: 60, label: 'delete', dataKey: 'mark', numeric: true },

];

function fixedHeaderContent(students) {
    return (
        <TableRow>
            {students.length > 0 ? (
                columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        variant="head"
                        align={column.numeric ? 'right' : 'left'}
                        style={{ width: column.width }}
                        sx={{ backgroundColor: 'background.paper' }}
                    >
                        {column.label}
                    </TableCell>
                ))
            ) : (
                <TableCell colSpan={columns.length}>
                    <Typography align="center" variant="body1">
                        No data
                    </Typography>
                </TableCell>
            )}
        </TableRow>
    );
}

function rowContent(_index, row) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={column.numeric ? 'right' : 'left'}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

export default function StudentTable() {
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [backendErrors, setBackendErrors] = useState({});
    const navigate = useNavigate();

    const handleOpen = () => {
        setBackendErrors({}); 
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (student) => {
        try {
            const newStudent={
                studentName:student.name,
                subjectName:student.subject,
                mark:student.mark
            }
            const response = await axiosApi.post('/api/addStudent', newStudent);
            console.log('Response:', response);

            // Close the modal on successful submission
            handleClose();

            // Optionally, refresh the student list
            fetchStudents();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = {};
                error.response.data.errors.forEach(err => {
                    errors[err.path] = err.msg; 
                });
                setBackendErrors(errors); 
            } else {
                console.error('An unexpected error occurred:', error);
                if(error.response.status ===401){
                    navigate('/login')
                }
            }
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axiosApi.get('/api/getStudents');
            console.log('students', response.data.students);
            setStudents(response.data.students);
        } catch (error) {
            console.error('Error fetching student data:', error);
            if (error.response?.data?.message === "Unauthorized") {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div>
            <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={students}
                    components={VirtuosoTableComponents} 
                    fixedHeaderContent={() => fixedHeaderContent(students)} 
                    itemContent={rowContent} 
                />
            </Paper>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add Student
                </Button>
                <AddStudentModal 
                    open={open} 
                    onClose={handleClose} 
                    onSubmit={handleSubmit} 
                    errors={backendErrors} // Pass the backend errors to the modal
                />
            </div>
        </div>
    );
}

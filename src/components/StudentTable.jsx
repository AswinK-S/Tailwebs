import React, { useState, useEffect } from 'react';
import { Button, Paper, TableCell, TableRow, IconButton, TableContainer, Table, TableHead, TableBody } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { TableVirtuoso } from 'react-virtuoso';
import axiosApi from '../service/api'; 
import { useNavigate } from 'react-router-dom';
import AddStudentModal from './AddStudentModal'; 
import DeleteConfirmationModal from './DeleteConfirmationModal';

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
    { width: 80, label: 'Action', dataKey: 'action' },
];

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{ backgroundColor: 'lightblue' }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(index, student, handleEdit, handleDelete) {
    return (
        <React.Fragment key={student.id}>
            <TableCell style={{ width: columns[0].width }}>{student.name}</TableCell>
            <TableCell style={{ width: columns[1].width }}>{student.subjectName}</TableCell>
            <TableCell style={{ width: columns[2].width }} align="right">
                {student.mark}
            </TableCell>
            <TableCell style={{ width: columns[3].width }}>
                <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(student.id)}
                >
                    <CreateOutlinedIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(student._id)}
                >
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </TableCell>
        </React.Fragment>
    );
}

export default function StudentTable() {
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [backendErrors, setBackendErrors] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const navigate = useNavigate();

    const handleOpen = () => {
        setBackendErrors({});
        setCurrentStudent(null); 
        setIsEditing(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (student) => {
        try {
            const newStudent = {
                studentName: student.name,
                subjectName: student.subject,
                mark: student.mark,
            };
            const response = isEditing 
                ? await axiosApi.put(`/api/editStudent/${currentStudent._id}`, newStudent) 
                : await axiosApi.post('/api/addStudent', newStudent);

            console.log('Response:', response);
            handleClose();
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
                if (error.response.status === 401) {
                    navigate('/login');
                }
            }
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axiosApi.get('/api/getStudents');
            setStudents(response.data.students);
        } catch (error) {
            console.error('Error fetching student data:', error);
            if (error.response?.data?.message === "Unauthorized") {
                navigate('/login');
            }
        }
    };

    const handleEdit = (studentId) => {
        const student = students.find(s => s.id === studentId);
        if (student) {
            setCurrentStudent(student);
            setIsEditing(true);
            setOpen(true);
        }
    };

    const handleDelete = (studentId) => {
        setStudentToDelete(studentId);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axiosApi.delete(`/api/delete/${studentToDelete}`);
            fetchStudents();
            setDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting student:', error);
            if (error.response.status === 401) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className='w-5/6'>
            <h1 className='mt-2 mb-2 font-sans text-xl font-semibold'>Student List</h1>
            <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={students}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={(index, student) => rowContent(index, student, handleEdit, handleDelete)}
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
                    errors={backendErrors}
                    isEditing={isEditing}
                    currentStudent={currentStudent}
                />
            </div>
            <DeleteConfirmationModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}

import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


export default function AddStudentModal({ open, onClose, onSubmit, errors, isEditing, currentStudent }) {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [mark, setMark] = useState('');
    const [frontendErrors, setFrontendErrors] = useState({});

    useEffect(() => {
        
        if (isEditing && currentStudent) {
            console.log('dd');
            setName(currentStudent.name || '');
            setSubject(currentStudent.subjectName || '');
            setMark(currentStudent.mark || '');
        }
        if(open){
            console.log('open',open);
            setName(currentStudent.name || '');
            setSubject(currentStudent.subjectName || '');
            setMark(currentStudent.mark || '');
        }
        
    }, [isEditing, currentStudent]);



    const validate = () => {
        let tempErrors = {};

        if (!name.trim()) {
            tempErrors.name = "Name is required";
        } else if (name.length < 3) {
            tempErrors.name = "Name must be at least 3 characters long";
        }

        if (!subject.trim()) {
            tempErrors.subject = "Subject is required";
        } else if (subject.length < 3) {
            tempErrors.subject = "Subject name must be at least 3 characters long";
        }

        if (!mark) {
            tempErrors.mark = "Mark is required";
        } else if (isNaN(mark)) {
            tempErrors.mark = "Mark must be a number";
        }

        setFrontendErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            console.log('updat ',name);
            onSubmit({ name, subject, mark });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle align='center'>{isEditing ? 'Edit Student' : 'Add Student'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Student Name"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!frontendErrors.name || !!errors.name}
                    helperText={frontendErrors.name || errors.name}
                    InputProps={{
                        startAdornment: (
                            <span role="img" aria-label="person" style={{ marginRight: '8px' }}>
                                <PersonOutlineOutlinedIcon />
                            </span>
                        ),
                    }}
                />
                <TextField
                    label="Subject"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    error={!!frontendErrors.subject || !!errors.subject}
                    helperText={frontendErrors.subject || errors.subject}
                    InputProps={{
                        startAdornment: (
                            <span role="img" aria-label="book" style={{ marginRight: '8px' }}>
                                <LibraryBooksOutlinedIcon />
                            </span>
                        ),
                    }}
                />
                <TextField
                    label="Mark"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    type="number"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)}
                    error={!!frontendErrors.mark || !!errors.mark}
                    helperText={frontendErrors.mark || errors.mark}
                    InputProps={{
                        startAdornment: (
                            <span role="img" aria-label="mark" style={{ marginRight: '8px' }}>
                                <BookmarkBorderIcon />
                            </span>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#333', color: '#fff', margin: '0 auto' }}>
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

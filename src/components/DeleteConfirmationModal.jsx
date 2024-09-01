import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function DeleteConfirmationModal({ open, onClose, onConfirm }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <p>Do you want to continue?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="primary">
                    No
                </Button>
                <Button onClick={onConfirm} variant="contained" color="secondary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

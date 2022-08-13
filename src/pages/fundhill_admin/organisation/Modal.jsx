import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const OrganisationModal = ({ activate }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {activate ? 'Activate Organisation' : 'Suspend organisation'}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {
                        activate ?
                            <Typography gutterBottom color={'blue'}>
                                Are you Sure You Want to Activate Organisation
                            </Typography>
                            :
                            <Typography gutterBottom color={'red'}>
                                Are you sure you want to Suspend organisation
                            </Typography>
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' style={activate ? { background: 'blue', color: 'white' } : { background: 'red', color: 'white' }} onClick={handleClose}>
                        Yes
                    </Button>
                    <Button variant='contained' style={{ background: 'gray', color: 'white' }} onClick={handleClose}>
                        No
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}

export default OrganisationModal; 
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

const UsersModal = ({ activate, deactivate, restore, del }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button variant="text" style={{ textTransform: 'none' }} onClick={handleClickOpen}>
                {activate && 'Activate user'}
                {deactivate && 'Deactivate user'}
                {restore && 'Restore user'}
                {del && 'Delete user'}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Users Options
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {
                        activate &&
                        <Typography gutterBottom color={'blue'}>
                            Are you Sure You Want to Activate user
                        </Typography>
                    }
                    {
                        deactivate &&
                        <Typography gutterBottom color={'orange'}>
                            Are you Sure You Want to deactivate user
                        </Typography>
                    }
                    {
                        restore &&
                        <Typography gutterBottom color={'green'}>
                            Are you Sure You Want to restore user
                        </Typography>
                    }
                    {
                        del &&
                        <Typography gutterBottom color={'red'}>
                            Are you Sure You Want to delete user
                        </Typography>
                    }

                </DialogContent>
                <DialogActions>
                    {activate &&
                        <>
                            <Button variant='contained' style={activate ? { background: 'blue', color: 'white' } : { background: 'red', color: 'white' }} onClick={handleClose}>
                                Yes
                            </Button>
                            <Button variant='contained' style={{ background: 'gray', color: 'white' }} onClick={handleClose}>
                                No
                            </Button>
                        </>
                    }

                    {
                        deactivate &&
                        <>
                            <Button variant='contained' style={{ background: 'orange', color: 'white' }} onClick={handleClose}>
                                Yes
                            </Button>
                            <Button variant='contained' style={{ background: 'gray', color: 'white' }} onClick={handleClose}>
                                No
                            </Button>
                        </>
                    }
                    {
                        restore &&
                        <>
                            <Button variant='contained' style={{ background: 'green', color: 'white' }} onClick={handleClose}>
                                Yes
                            </Button>
                            <Button variant='contained' style={{ background: 'gray', color: 'white' }} onClick={handleClose}>
                                No
                            </Button>
                        </>
                    }
                    {
                        del &&
                        <>
                            <Button variant='contained' style={{ background: 'red', color: 'white' }} onClick={handleClose}>
                                Yes
                            </Button>
                            <Button variant='contained' style={{ background: 'gray', color: 'white' }} onClick={handleClose}>
                                No
                            </Button>
                        </>
                    }

                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}

export default UsersModal; 
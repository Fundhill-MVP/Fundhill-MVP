import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Alert, Grid } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
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

const useStyles = makeStyles({
    span: {
        fontWeight: 600
    }
})

export default function Reciept() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const Print = () => {
        //console.log('print');  
        let printContents = document.getElementById('printable').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Reciept
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Reciept
                </BootstrapDialogTitle>
                <Alert severity="success" color="info">
                    This is a success alert — check it out!
                </Alert>
                <DialogContent dividers>

                    <Grid container spacing={3} id='printable'>
                        <Grid item sx={12} sm={12} md={6}>
                            <Typography gutterBottom>
                                <span className={classes.span}>Transaction Type:</span> Deposite
                            </Typography>
                            <Typography gutterBottom>
                                <span className={classes.span}>Currency:</span> NGN
                            </Typography>
                            <Typography gutterBottom>
                                <span className={classes.span}>Amount:</span> 10,000
                            </Typography>
                            <Typography gutterBottom>
                                <span className={classes.span}>Date:</span> 2022-07-19
                            </Typography>
                            <Typography gutterBottom>
                                <span className={classes.span}>Organisation unique ID:</span> TES-TRX-33
                            </Typography>
                            <Typography gutterBottom>
                                <span className={classes.span}>Status:</span> SUCCESSFUL
                            </Typography>
                        </Grid>
                        <Grid item sx={12} sm={12} md={6}>
                            <Typography gutterBottom>
                                <span className={classes.span}>Depositor:</span> Segun Itodo
                            </Typography>
                            <Typography gutterBottom>
                                <span className={classes.span}>From:</span> 20220719
                            </Typography>
                            <Typography gutterBottom>
                                <span className={classes.span}>To:</span> 2022000719
                            </Typography>
                            <Typography gutterBottom>
                                <span className={classes.span}>Description:</span> Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' startIcon={<PrintIcon />} onClick={Print}>
                        Print
                    </Button>
                    <Button variant='outlined' onClick={handleClose}>
                        close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

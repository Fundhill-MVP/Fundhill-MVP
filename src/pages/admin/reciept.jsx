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
    },
    deviderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        width: 300,
        borderBottom: '1px solid gray',
    },
    innerGrid: {
        // borderBottom: '1px solid gray'
        fontSize: '0.8rem'
    },
    innerGrid1: {
        display: 'flex',
        justifyContent: 'end',
        fontSize: '0.8rem',
        textAlign: 'right',
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
                    Transaction Reciept
                </BootstrapDialogTitle>
                <Alert severity="success" color="info">
                    This is a success alert — check it out!
                </Alert>
                <DialogContent dividers className={classes.deviderContainer} id='printable'>
                    <Typography gutterBottom style={{ fontWeight: 600, fontSize: '0.8rem' }}>Transaction Reciept</Typography>
                    <Typography gutterBottom style={{ fontSize: '0.8rem' }}>Completed on 08 August 2022 6:17pm</Typography>

                    <div className={classes.grid}>
                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid}>
                                <p className={classes.span}>Amount</p>
                            </div>
                        </div>

                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid1}>
                                <p>200</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.grid}>
                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid}>
                                <p className={classes.span}>Sender</p>
                            </div>
                        </div>

                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid1}>
                                <p>Joseph Segun Stephen</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.grid}>
                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid}>
                                <p className={classes.span}>Recipient</p>
                            </div>
                        </div>

                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid1}>
                                <p>Joseph Segun Stephen 09603884 Union Bank</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.grid}>
                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid}>
                                <p className={classes.span}>Description</p>
                            </div>
                        </div>

                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid1}>
                                <p>-</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.grid}>
                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid}>
                                <p className={classes.span}>Transaction ID</p>
                            </div>
                        </div>

                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid1}>
                                <p>29293039</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.grid}>
                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid}>
                                <p className={classes.span}>Status</p>
                            </div>
                        </div>

                        <div className={classes.gridItems}>
                            <div className={classes.innerGrid1}>
                                <p>Successful</p>
                            </div>
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='info' fullWidth startIcon={<PrintIcon />} onClick={Print}>
                        Print
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

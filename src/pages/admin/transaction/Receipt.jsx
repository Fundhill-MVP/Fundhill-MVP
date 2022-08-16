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
import { Alert } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { trigger } from '../../../events';

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

export default function Reciept(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState("");
    const [transtype, setTrans] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        trigger("reRenderTransCustomer")
    };

    const Print = () => {
        //console.log('print');  
        let printContents = document.getElementById('printable').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    React.useEffect(() => {
        if (JSON.stringify(props) !== "{}") {
            console.log("ok working")
            handleClickOpen()
            setData(props)
            // console.log(data);
            const trans = data.trx_type;
            if (trans === "WITHDRAWAL") {
                setTrans(true)
            }
        }
    }, [props.id])


    // if(id){
    //     console.log("ok working")
    //     // handleClickOpen()
    //     setData(amount,trnx_type,depositor,description,id,status,date)
    //     console.log(data);
    //     // const trans = data.trnx_type;
    //     // if(trans === "WITHDRAWAL" ){
    //     //     setTrans(true)
    //     // }
    // }

    return (
        <div>
            {
                transtype ? (
                    <>
                        <Button style={{ display: "none" }} variant="outlined" onClick={handleClickOpen}>
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
                                <Typography gutterBottom style={{ fontSize: '0.8rem' }}>Completed on {data.created_date} </Typography>

                                <div className={classes.grid}>
                                    <div className={classes.gridItems}>
                                        <div className={classes.innerGrid}>
                                            <p className={classes.span}>Amount</p>
                                        </div>
                                    </div>

                                    <div className={classes.gridItems}>
                                        <div className={classes.innerGrid1}>
                                            <p> {data.amount} </p>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className={classes.grid}>
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
                        </div> */}

                                <div className={classes.grid}>
                                    <div className={classes.gridItems}>
                                        <div className={classes.innerGrid}>
                                            <p className={classes.span}>Description</p>
                                        </div>
                                    </div>

                                    <div className={classes.gridItems}>
                                        <div className={classes.innerGrid1}>
                                            <p> {data?.description} </p>
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
                                            <p> {data.id} </p>
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
                                            <p> {data?.status} </p>
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
                    </>
                ) :
                    (
                        <>
                            <Button style={{ display: "none" }} variant="outlined" onClick={handleClickOpen}>
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
                                                <p> {data.amount} </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={classes.grid}>
                                        <div className={classes.gridItems}>
                                            <div className={classes.innerGrid}>
                                                <p className={classes.span}>Depositor</p>
                                            </div>
                                        </div>

                                        <div className={classes.gridItems}>
                                            <div className={classes.innerGrid1}>
                                                <p> {data.depositor} </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className={classes.grid}>
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
                        </div> */}





                                    <div className={classes.grid}>
                                        <div className={classes.gridItems}>
                                            <div className={classes.innerGrid}>
                                                <p className={classes.span}>Transaction ID</p>
                                            </div>
                                        </div>

                                        <div className={classes.gridItems}>
                                            <div className={classes.innerGrid1}>
                                                <p> {data.id} </p>
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
                                                <p> {data?.status} </p>
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
                        </>
                    )
            }

        </div>
    );
}

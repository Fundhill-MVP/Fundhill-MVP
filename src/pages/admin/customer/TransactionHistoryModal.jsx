import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import { css } from "@emotion/react";
import SearchButton from './SearchButton';
import {BounceLoader} from "react-spinners";
import { trigger } from '../../../events';
import { api  } from "../../../services";
import useStyles from "./styles";


import { Box, Divider, Fade, Modal, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { Formik, Form} from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { TextField } from '../../../components/FormsUI';
import {DotLoader} from "react-spinners";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
  
  };

const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
  align-items: center;
`;

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








const TransactionHistoryModal = ({customerId}) => {


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openTranxs, setOpenTranxs] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    let [loading, setLoading] = React.useState(true);
    let [color, setColor] = React.useState("#ADD8E6");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const clickOpen = ()=> {
        setOpenTranxs(true)
    }

    const closeTrans = () =>{
        setOpenTranxs(false)
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [btnLoading, setBtnLoading] = React.useState(false);

    
    const initialFormState = () => ({
        min_date: "",
        max_date: "",
      });
    
      const validationSchema = yupObject().shape({
        min_date: yupString()
          .required("Minimum date is required"),
        max_date: yupNumber()
          .required("Maximum date is required"),
      });
    
      const get_deposit = async (values) => {
        try {
          // setBtnLoading(true);
          setIsLoading(true)
          console.log(values)
    
          const response = await api.service().fetch(`/dashboard/transactions/?min_date=${values.min_date}&max_date=${values.max_date}&_from=${customerId}`, true);
    
          if (api.isSuccessful(response)) {
            setTimeout(() => {
              handleClose()
              setData(response.data.results)
            }, 0);
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error)
          setIsLoading(false);
        }
      }



    const Print = () => {
        //console.log('print');  
        handleClose()
        let printContents = document.getElementById('printable').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    
    const allTransactions = async () => {
        setIsLoading(true)
      const res = await api.service().fetch(`/dashboard/transactions/?_from=${customerId}`, true);
      console.log(res.data)
      if (api.isSuccessful(res)) {
        setData(res.data.results)
      }
      setIsLoading(false);

    }

    React.useEffect(() => {
        allTransactions();
      }, [customerId])


    return (
        <div>
            <Button variant="text" onClick={clickOpen}>
                Transaction History
            </Button>
            <BootstrapDialog
                onClose={closeTrans}
                aria-labelledby="customized-dialog-title"
                open={openTranxs}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={closeTrans}>
                    Transaction History
                </BootstrapDialogTitle>
                <div>
              <Button variant='contained' style={{ textTransform: 'none', marginLeft: 20 }} onClick={handleOpen} >Search</Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                      <IconButton onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                      Transaction Date
                    </Typography>

                    <Divider />

                    <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2, fontWeight: 600 }} gutterBottom>
                      Enter Transaction Date
                    </Typography>

                    <Formik
                      initialValues={initialFormState()}
                      // validationSchema={validationSchema}
                      onSubmit={async (values, actions) => {
                        await get_deposit(values)
                      }}
                    >
                      <Form style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
                        <div className={classes.formDiv}>
                          <div className={classes.divTypo}><Typography>From </Typography></div>
                          <TextField fullWidth variant='outlined' type="date" name="min_date" size='small' />

                        </div>
                        <div className={classes.formDiv}>
                          <div className={classes.divTypo}><Typography>To </Typography></div>
                          <TextField fullWidth variant='outlined' type="date" name="max_date" size='small' />

                        </div>

                        {
                          isLoading ?
                            (<div className={classes.sweet_loading}>
                              <DotLoader color={color} loading={loading} css={override} size={80} />
                            </div>)
                            : (
                              <Button type="submit" variant='contained' fullWidth style={{ background: 'green', marginTop: 10, alignSelf: 'center' }}>
                                Search
                              </Button>
                            )
                        }

                      </Form>
                    </Formik>

                    <Divider />
                    <Button variant='contained' onClick={handleClose} style={{ background: 'gray', marginTop: 10, alignSelf: 'flex-end' }}>
                      Close
                    </Button>
                  </Box>
                </Fade>
              </Modal>
            </div>
                <DialogContent dividers>
                    <TableContainer component={Paper} id='printable'>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right"> Date </TableCell>
                                    <TableCell align="right"> Amount </TableCell>
                                    <TableCell align="right"> Depositor </TableCell>
                                    <TableCell align="right">Agent</TableCell>
                                    <TableCell align="right"> Description </TableCell>
                                    <TableCell align="right"> Status </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                                        isLoading ?
                                                        (
                                            
                                            
                                                          <div className={classes.sweet_loading}>
                                                            <BounceLoader color={color} loading={loading} css={override} size={150} />
                                                          </div>
                                            
                                                        ):
                                                        (
                                                            data.map((tranx) => (
                                                                <TableRow key={tranx.id}>
                                                                    <TableCell component="th" scope="row">
                                                                        {tranx.id}
                                                                    </TableCell>
                                                                    <TableCell align="right">{tranx?.created_date}</TableCell>              
                                                                    <TableCell align="right">{tranx?.amount}</TableCell>
                                                                    <TableCell align="right">{tranx._from?.first_name}</TableCell>
                                                                    <TableCell align="right">{tranx._from?.agent?.last_name}</TableCell>
                                                                    <TableCell align="right">{tranx?.description}</TableCell>
                                                                    <TableCell align="right">{tranx.status}</TableCell>
                                                                </TableRow>
                                                            ))         
                                                        )
                                }
                            </TableBody>
                        </Table>
                        <DialogActions>
                            <Button variant='contained' color='info' fullWidth startIcon={<PrintIcon />} onClick={() => [Print(),handleClose()]}>
                                Statement of Account
                            </Button>
                        </DialogActions>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeTrans}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}

export default TransactionHistoryModal
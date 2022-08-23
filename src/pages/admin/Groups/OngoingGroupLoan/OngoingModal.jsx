import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { CircularProgress } from "@material-ui/core";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useStyles from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import { DotLoader, BounceLoader } from "react-spinners";
import { api } from "../../../../services";
import { TextField } from "../../../../components/FormsUI"
import { trigger } from '../../../../events';




const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
  align-items: center;
`;


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
};

// table
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(1, '2022-05-2', 15000, 'Cash', 'For Loan'),
    // createData('Ice cream sandwich', 237, 9.0, 37,),

];
export default function OptionModal({ history, groupId }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [btnLoading, setBtnLoading] = useState(false);
    const [delBtn, setDelBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [data, setData] = useState([]);
    const [item, setItem] = useState("");
    const navigate = useNavigate();
    const [loanHist, setLoanHist] = useState([]);




    const loanHistory = async () => {
        const loans = await api
            .service()
            .fetch(`/dashboard/transactions/?group_loan=${groupId}`, true);
        console.log(loans.data)

        if ((api.isSuccessful(loans))) {
            setLoanHist(loans.data.results);
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }

    useEffect(() => {
        loanHistory();

    }, [])




    const handleProps = () => {
        return setOpen(true);
    }



    const initialFormState = (id) => ({
        group_id: id,
        amount: 0,
    });

    const validationSchema = yupObject().shape({
        group_id: yupString()
            .required("user id is required"),
        amount: yupNumber()
            .required("Enter a percentage"),
    });


    const payLoan = async (values) => {
        setBtnLoading(true);
        console.log(values)
        const response = await api
            .service()
            .push(`/dashboard/group-loan/${groupId}/repay/`, values, true)

        if (api.isSuccessful(response)) {
            setTimeout(() => {
                trigger("reRenderOngoingCustomerLoan")
                handleClose()
                toast.success("Transaction was successfully.");
            }, 0);
            setBtnLoading(false);
        }
        setBtnLoading(false);

    }

    //   const paymentHistory = async () => {
    //     try {

    //           loanHistory();
    //     } catch (error) {
    //         console.log(error);
    //         setDelBtn(false)
    //     }

    //   }

    return (
        <div>
            <Button style={{ color: 'black', textTransform: 'none' }} onClick={handleOpen && handleProps} >{history ? `Payment History` : `Pay Loan`}</Button>
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
                        {history ?

                            isLoading ?
                                (


                                    <div className={classes.sweet_loading}>
                                        <BounceLoader color={color} loading={loading} css={override} size={150} />
                                    </div>

                                ) :
                                (
                                    <>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                            <IconButton onClick={handleClose}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                        <Divider />
                                        <TableContainer component={Paper}>
                                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Payment History</Typography>
                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>ID</TableCell>
                                                        <TableCell align="right">Date</TableCell>
                                                        <TableCell align="right">Amount Paid</TableCell>
                                                        <TableCell align="right">Method</TableCell>
                                                        <TableCell align="right">Description</TableCell>
                                                        <TableCell align="right">Status</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {loanHist.map((row) => (
                                                        <TableRow
                                                            key={row.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {row.id}
                                                            </TableCell>
                                                            <TableCell align="right">{row.created_date}</TableCell>
                                                            <TableCell align="right">{row.amount}</TableCell>
                                                            <TableCell align="right">{row.trx_type}</TableCell>
                                                            <TableCell align="right">{row.description}</TableCell>
                                                            <TableCell align="right">{row.status}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </>
                                )

                            :

                            (
                                <>

                                    <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                                        Repay Loan
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                        <IconButton onClick={handleClose}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                    <Divider />

                                    <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }}>
                                        Enter Repayment Amount
                                    </Typography>
                                    <Formik
                                        initialValues={initialFormState(groupId)}
                                        onSubmit={async (values) => {
                                            await payLoan(values)
                                        }}
                                    >
                                        <Form style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div className={classes.formDiv}>
                                                <div className={classes.divTypo}><Typography>Amount</Typography></div>
                                                <TextField fullWidth variant='outlined' type="text" name="amount" size='small' />

                                            </div>




                                            {
                                                btnLoading ?
                                                    (<div className={classes.sweet_loading}>
                                                        <DotLoader color={color} loading={loading} css={override} size={80} />
                                                    </div>)
                                                    : (

                                                        <Button type="submit" variant='contained' style={{ background: 'green', marginTop: 10, alignSelf: 'center' }}>
                                                            Submit
                                                        </Button>
                                                    )
                                            }
                                        </Form>
                                    </Formik>
                                </>
                            )
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

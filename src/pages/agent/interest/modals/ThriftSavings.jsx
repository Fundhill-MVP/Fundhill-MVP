import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { CircularProgress } from "@material-ui/core";
import { Box, Button, Divider, IconButton, MenuItem, Modal, OutlinedInput, Typography } from '@mui/material';
import useStyles from '../styles';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@material-ui/styles';

import { toast } from "react-toastify";
import { css } from "@emotion/react";
import { DotLoader, BounceLoader } from "react-spinners";
import { api } from "../../../../services";
import { TextField, Select } from "../../../../components/FormsUI";
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
    width: 600,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};



const frequency = {
    "DAILY": "DAILY",
    "WEEKLY": "WEEKLY",
    "MONTHLY": "MONTHLY",
    "YEARLY": "YEARLY"
};



const fixedAmount = {
    "true": "True",
};

const ThriftSavingsModal = ({ customerId }) => {
    const classes = useStyles();
    // modal
    const [lock, setUnlock] = useState(false);
    const handleUnlock = () => setUnlock(true);
    const handleLock = () => setUnlock(false);
    const [planBtn, setPlanBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setloading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [data, setData] = useState([]);
    const [interests, setInterest] = useState([]);
    const [fees, setfees] = useState([]);



    const allCustomer = async () => {
        setIsLoading(true)
        const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=VERIFIED", true);
        console.log(res.data.results)
        if (api.isSuccessful(res)) {
            setData(res.data.results)
            setIsLoading(false)
        }
        setIsLoading(false);


    }

    const allinterest = async () => {
        setIsLoading(true)
        const res = await api
            .service()
            .fetch("/dashboard/interest-rates/", true);
        console.log(res.data.results)

        if ((api.isSuccessful(res))) {
            setInterest(res.data.results);
            setIsLoading(false)
        }
        setIsLoading(false)

    }


    const allfee = async () => {
        setIsLoading(true)
        const res = await api.service().fetch("/dashboard/fees/", true);
        console.log(res.data.results)
        if (api.isSuccessful(res)) {
            setfees(res.data.results)
            setIsLoading(false)
        }

        setIsLoading(false);

    }


    useEffect(() => {
        allCustomer();
        allinterest();
        allfee();

    }, [])


    const thriftSavingsFormState = (id) => ({
        user: id,
        name: "",
        frequency: "",
        amount_per_cycle: "",
        duration_in_months: "",
        plan_type: "THRIFT SAVINGS",
        interest_rate: "",
        fee: "",
        fixed_amount: true
    });


    const thriftSavingsValidationSchema = yupObject().shape({
        user: yupNumber()
            .required("User is required"),
        name: yupString()
            .required("name is required"),
        frequency: yupString()
            .required("frequency is required"),
        amount_per_cycle: yupNumber()
            .required("Amount cycle is required"),
        duration_in_months: yupNumber()
            .required("Duration is required"),
        interest_rate: yupNumber()
            .required("Select an interest rate"),
        fee: yupNumber()
            .required("Select fee"),
        fixed_amount: yupString()
            .required("Select an option")
    });




    const savings = async (values) => {
        setPlanBtn(true);
        console.log(values)

        const response = await api
            .service()
            .push("/dashboard/savings-plan/add/", values, true)

        if (api.isSuccessful(response)) {
            setTimeout(() => {
                trigger("reRenderCustomerSavingsPlan")
                handleLock()
                toast.success("Savings Plan successfully added!");

            }, 0);
        }
        setPlanBtn(false);
    }
    return (
        <div>
            <Button variant='text' style={{ color: '#000', textTransform: 'none', padding: 0, fontSize: '1rem', fontWeight: 200 }} onClick={handleUnlock}>Thrift Savings</Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={lock}
                onClose={handleLock}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={lock}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            User ID
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLock}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />

                        <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Add Thrift Savings Plan</Typography>

                        <>
                            <Formik
                                initialValues={thriftSavingsFormState(customerId)}
                                validationSchema={thriftSavingsValidationSchema}
                                onSubmit={async (values, actions) => {
                                    await savings(values)
                                }}
                            >
                                <Form style={{ display: 'flex', flexDirection: 'column' }} >
                                    {
                                        isLoading ?
                                            (
                                                <div className={classes.sweet_loading}>
                                                    <BounceLoader color={color} loading={loading} css={override} size={150} />
                                                </div>
                                            )
                                            :
                                            (
                                                <>
                                                    <div className={classes.formDiv}>
                                                        <div className={classes.divTypo}><Typography>Name</Typography></div>
                                                        <TextField fullWidth variant='outlined' type="text" name="name" size='small' />

                                                    </div>
                                                    <div className={classes.formDiv}>
                                                        <div className={classes.divTypo}><Typography>Frequency</Typography></div>
                                                        <Select
                                                            size="small"
                                                            fullWidth
                                                            label="Select One"
                                                            name="frequency"
                                                            options={frequency}
                                                        />

                                                    </div>



                                                    <div className={classes.formDiv}>
                                                        <div className={classes.divTypo}><Typography>Amount Per Cycle</Typography></div>
                                                        <TextField fullWidth variant='outlined' type="number" name="amount_per_cycle" size='small' />

                                                    </div>

                                                    <div className={classes.formDiv}>
                                                        <div className={classes.divTypo}><Typography>Duration in months</Typography></div>
                                                        <TextField fullWidth variant='outlined' type="number" name="duration_in_months" size='small' />

                                                    </div>

                                                    <div className={classes.formDiv}>
                                                        <div className={classes.divTypo}><Typography>Interest Rate</Typography></div>
                                                        <TextField
                                                            select={true}
                                                            label="Select One"
                                                            name="interest_rate"
                                                            fullWidth
                                                            variant='outlined'
                                                        >
                                                            {
                                                                interests.map((interest) => {
                                                                    return (
                                                                        <MenuItem key={interest.id} value={interest.id} > {interest.name} </MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </TextField>

                                                    </div>
                                                    <div className={classes.formDiv}>
                                                        <div className={classes.divTypo}><Typography>Charges Fee</Typography></div>
                                                        <TextField
                                                            select={true}
                                                            fullWidth
                                                            name="fee"
                                                            variant='outlined'
                                                            label="Select One"
                                                        >
                                                            {
                                                                fees.map((fee) => {
                                                                    return (
                                                                        <MenuItem key={fee.id} value={fee.id} > {fee.name} </MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </TextField>

                                                    </div>
                                                    <div className={classes.formDiv}>
                                                        <div className={classes.divTypo}><Typography>Fixed Amount</Typography></div>
                                                        <Select
                                                            size='small'
                                                            fullWidth
                                                            name="fixed_amount"
                                                            options={fixedAmount}
                                                            label="Choose One"
                                                        />
                                                    </div>
                                                </>
                                            )
                                    }

                                    {
                                        planBtn ?
                                            (<div className={classes.sweet_loading}>
                                                <DotLoader color={color} loading={loading} css={override} size={80} />
                                            </div>)
                                            : (
                                                <Button type="submit" variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                    Submit
                                                </Button>
                                            )
                                    }

                                </Form>
                            </Formik>
                        </>
                        <Divider style={{ marginTop: 40 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                            <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default ThriftSavingsModal
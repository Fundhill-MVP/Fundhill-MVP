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
import { DotLoader } from "react-spinners";
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


// select input
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const frequency = {
    "DAILY": "DAILY",
    "WEEKLY": "WEEKLY",
    "MONTHLY": "MONTHLY",
    "YEARLY": "YEARLY"
};

const savingsPlan = {
    "FIXED DEPOSIT SAVINGS": "Fixed Savings",
    "TARGETED SAVINGS": "Targeted Savings",
};

const collect = {
    "true": "True",
    "false": "False"
};

const fixedAmount = {
    "true": "True",
    "false": "False"
};

const SavingsModal = ({ activate, deactivate, groupId }) => {
    const classes = useStyles();

    // modal
    const [locks, setUnlocks] = useState(false);
    const handleUnlocks = () => setUnlocks(true);
    const handleLocks = () => setUnlocks(false);


    // select input

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [planBtn, setPlanBtn] = useState(false);
    const [deactivateBtn, setDeactivatePlan] = useState(false);
    const [activateBtn, setActivateBtn] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [Loading, setLoading] = useState(false)
    let [loading, setloading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [data, setData] = useState([]);
    const [interests, setInterest] = useState([]);
    const [fees, setfees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [decustomer, setDeactivateCustomer] = useState([]);
    const [groupPlan, setGroupPlan] = useState([]);
    const [deactivatedGroupPlan, setDeactivatedGroupPlan] = useState([]);
    const [user, setUser] = useState("");
    const [item, setItem] = useState("");
    const navigate = useNavigate();

    const allGroup = async () => {
        const res = await api.service().fetch("/accounts/group/", true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
            setData(res.data.results)
        }


    }

    const allfee = async () => {
        const res = await api.service().fetch("/dashboard/fees/", true);
        console.log(res.data.results)
        if (api.isSuccessful(res)) {
            setfees(res.data.results)
        }

    }

    const interestRate = async () => {
        setIsLoading(true)
        const interests = await api
            .service()
            .fetch("/dashboard/interest-rates/", true);
        console.log(interests.data.results)

        if ((api.isSuccessful(interests))) {
            setInterest(interests.data.results);
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }

    }
    useEffect(() => {
        allGroup();
        allfee();
        interestRate();
    }, []);



    const savingsFormState = () => ({
        group: groupId,
        name: "",
        collection_frequency: "",
        amount_per_cycle: 0,
        auto_collect: true,
        auto_disburse: true,
        fee: '',
        fixed_amount: true,
    });


    const savingsValidationSchema = yupObject().shape({
        group: yupNumber()
            .required("Group is required"),
        name: yupString()
            .required("name is required"),
        collection_frequency: yupString()
            .required("frequency is required"),
        amount_per_cycle: yupNumber()
            .required("Amount cycle is required"),
    });


    const savings = async (values) => {
        setPlanBtn(true);
        console.log(values)

        const response = await api
            .service()
            .push("/dashboard/group-savings-plan/add/", values, true)

        if (api.isSuccessful(response)) {
            setTimeout(() => {
                trigger("reRenderAllGroup")
                handleLocks()
                toast.success("Group Savings Plan successfully added!");
            }, 0);
        }
        setPlanBtn(false);
    }

    useEffect(() => {
        setIsLoading(true)

        const allSavingsPlan = async () => {
            try {
                const res = await api.service().fetch(`/dashboard/group-savings-plan/?group=${groupId}`, true);
                console.log(res.data.results)
                if (api.isSuccessful(res)) {
                    setGroupPlan(res.data.results)
                }

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        const allDeactivedSavingsPlan = async () => {
            try {
                const res = await api.service().fetch(`/dashboard/group-savings-plan/?group=${groupId}&status=DEACTIVATED`, true);
                console.log(res.data.results)
                if (api.isSuccessful(res)) {
                    //   console.log(res)
                    setDeactivatedGroupPlan(res.data.results)
                }

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }


        allSavingsPlan();
        allDeactivedSavingsPlan();

    }, []);







    const activatePlan = async (value) => {
        try {
            setActivateBtn(true);
            console.log(value)

            const response = await api
                .service()
                .fetch(`/dashboard/group-savings-plan/${value.id}/activate/`, true)

            if (api.isSuccessful(response)) {
                setTimeout(() => {
                    trigger("reRenderAllGroup")
                    console.log(response.data)
                    handleLocks()
                    toast.success("Savings plan activated successfully");
                }, 0);
            }
            setActivateBtn(false);
        } catch (error) {
            setActivateBtn(false);
            console.log(error)
        }
    }


    const deactivatePlan = async (value) => {
        try {
            setDeactivatePlan(true);
            console.log(value)

            const response = await api
                .service()
                .fetch(`/dashboard/group-savings-plan/${value.id}/deactivate/`, true)

            if (api.isSuccessful(response)) {
                setTimeout(() => {
                    trigger("reRenderAllGroup")
                    console.log(response.data)
                    handleLocks()
                    toast.success("Savings deactivated successfully!!!");
                }, 0);
            }
            setDeactivatePlan(false);
        } catch (error) {
            console.log(error)
        }
    }














    const getGroup = (id) => {
        let item = data.filter((customer) => customer.id === id);
        if (item.length !== 0) {
            setUser(item[0]);
        }

    }

    return (
        <div>

            {activate && (
                <Button onClick={() => [handleUnlocks(), getGroup(groupId)]}>Activate Plan</Button>
            )}

            {deactivate && (
                <Button onClick={() => [handleUnlocks(), getGroup(groupId)]}>Deactivate Plan</Button>
            )}

            {!activate && !deactivate ? (
                <Button onClick={() => [handleUnlocks(), getGroup(groupId)]}>Add Plan</Button>

            ) : ''}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={locks}
                onClose={handleLocks}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={locks}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {activate ? `Activate ${user.name} Plan ` : `Group Id: ${user.id} `}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLocks}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />
                        {activate && (
                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Are you sure you want to activate this plan</Typography>
                        )}

                        {deactivate && (
                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Deactivate</Typography>
                        )}

                        {!activate && !deactivate ? (
                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Add Plan</Typography>
                        ) : ''}

                        {!activate && !deactivate ? (
                            <>

                                <Formik
                                    initialValues={savingsFormState(groupId)}
                                    validationSchema={savingsValidationSchema}
                                    onSubmit={async (values, actions) => {
                                        await savings(values)
                                    }}
                                >
                                    <Form style={{ display: 'flex', flexDirection: 'column' }} >

                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Name</Typography></div>
                                            <TextField fullWidth variant='outlined' type="text" name="name" size='small' />

                                        </div>
                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Collection Frequency</Typography></div>
                                            <Select
                                                size="small"
                                                fullWidth
                                                label="Select One"
                                                name="collection_frequency"
                                                options={frequency}
                                            />

                                        </div>


                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Amount Per Cycle</Typography></div>
                                            <TextField fullWidth variant='outlined' type="number" name="amount_per_cycle" size='small' />

                                        </div>



                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Auto Collect</Typography></div>
                                            <Select
                                                size='small'
                                                fullWidth
                                                label="Select One"
                                                name="auto_collect"
                                                options={collect}
                                            />

                                        </div>
                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Auto Disburse</Typography></div>
                                            <Select
                                                size='small'
                                                fullWidth
                                                label="Select One"
                                                name="auto_disburse"
                                                options={collect}
                                            />

                                        </div>
                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Interest Rates</Typography></div>
                                            <TextField
                                                select={true}
                                                fullWidth
                                                name="interest_rate"
                                                variant='outlined'
                                                label="Select One"
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


                                        {
                                            planBtn ?
                                                (<div className="sweet-loading">
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
                        ) : ''}


                        {deactivate && (
                            <>
                                <Formik
                                    initialValues={{
                                        id: 0
                                    }}
                                    // validationSchema= {validationSchema}
                                    onSubmit={async (value) => {
                                        await deactivatePlan(value)
                                    }}
                                >
                                    <Form style={{ display: 'flex', flexDirection: 'column' }} >

                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Savings Plan</Typography></div>
                                            <TextField
                                                select={true}
                                                fullWidth
                                                name="id"
                                                variant='outlined'
                                                label="Select One"

                                            >
                                                <MenuItem>Select One</MenuItem>
                                                {
                                                    groupPlan.map((plan) => {
                                                        return (
                                                            <MenuItem key={plan.id} value={plan.id} > {plan.plan_type} </MenuItem>
                                                        )
                                                    })
                                                }
                                            </TextField>



                                        </div>


                                        {
                                            deactivateBtn ?
                                                (<div className="sweet-loading">
                                                    <DotLoader color={color} loading={loading} css={override} size={80} />
                                                </div>)
                                                : (
                                                    <Button type="submit" variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                        deactivate
                                                    </Button>
                                                )
                                        }

                                    </Form>
                                </Formik>

                            </>
                        )}

                        {activate && (
                            <>
                                <Formik
                                    initialValues={{
                                        id: 0
                                    }}
                                    // validationSchema= {savingsValidationSchema}
                                    onSubmit={async (value, actions) => {
                                        await activatePlan(value)
                                    }}
                                >
                                    <Form style={{ display: 'flex', flexDirection: 'column' }}>

                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Savings Plan</Typography></div>
                                            <TextField
                                                select={true}
                                                fullWidth
                                                name="id"
                                                variant='outlined'
                                                label="Select One"

                                            >
                                                <MenuItem>Select One</MenuItem>
                                                {
                                                    deactivatedGroupPlan.map((plan) => {
                                                        return (
                                                            <MenuItem key={plan.id} value={plan.id} > {plan.plan_type} </MenuItem>
                                                        )
                                                    })
                                                }
                                            </TextField>

                                        </div>


                                        {
                                            activateBtn ?
                                                (<div className={classes.sweet_loading}>
                                                    <DotLoader color={color} loading={loading} css={override} size={80} />
                                                </div>)
                                                : (
                                                    <Button type="submit" variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                        activate
                                                    </Button>
                                                )
                                        }

                                    </Form>
                                </Formik>

                            </>
                        )}

                        <Divider style={{ marginTop: 40 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                            <Button onClick={handleLocks} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default SavingsModal
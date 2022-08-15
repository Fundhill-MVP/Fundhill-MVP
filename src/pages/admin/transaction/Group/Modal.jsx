import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {Formik,Form} from "formik";
import {object as yupObject, string as yupString,number as yupNumber} from "yup";
import {CircularProgress} from "@material-ui/core";
import { Box, Button, Divider, IconButton, MenuItem, Modal, Typography } from '@mui/material';
import useStyles from '../styles';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@material-ui/styles';
import { Hidden } from "@material-ui/core";


import { toast } from "react-toastify";
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import { api  } from "../../../../services";
import {TextField,Select} from "../../../../components/FormsUI";
import Receipt from "./Receipt"


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
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


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

const fixedAmount = {
    "true": "True",
    "false": "False"
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function TransactionModal({ fund, widthdraw,groupId }) {
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

    const [planBtn,setPlanBtn] = useState(false);
    const [withdrawBtn,setWithdrawBtn] = useState(false);
    const [fundBtn,setFundBtn] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [Loading, setLoading] = useState(false)
    let [loading, setloading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [data,setData] = useState([]);
    const [interests,setInterest] = useState([]);
    const [fees,setfees] = useState([]);
    const [customers,setCustomers] = useState([]);
    const [groups,setGroups] = useState([]);
    const [plans,setPlans] = useState([])
    const [user,setUser] = useState("");
    const [item,setItem] = useState("");
    const [result,setResult] = useState("")
    const navigate = useNavigate();

    const allGroup = async () => {
        setIsLoading(true)
        const res = await api.service().fetch(`/accounts/group/?id=${groupId}`, true);
        console.log(res.data.results[0])
        if (api.isSuccessful(res)) {
          setData(res.data.results)
          setGroups(res.data.results)
        }
    
        setIsLoading(false);
    
      }
      useEffect(() => {
        allGroup();
      }, [])



    useEffect(() => {
        setIsLoading(true)
    
        const allSavingsPlan = async() => {
                    try {
                        const res = await api.service().fetch(`/dashboard/group-savings-plan/?is_active=true&group=${groupId}`,true);
                        // console.log(res.data.results)
                        if(api.isSuccessful(res)){
                          //   console.log(res)
                          setPlans(res.data.results)
                        }
                  
                        setIsLoading(false);
                    } catch (error) {
                        console.log(error);
                    }  
        }
    
        allSavingsPlan();
      },[]);


      const customerFundFormState = (id) => ({
        amount: 0,
        depositor: "",
        plan_id: 0,
        // member_id: groups?.members[0]?.id
      });






const fundGroup = async(values) => {
    try {
        setFundBtn(true);
        console.log(values)

        const response = await api
        .service()
        .push("/dashboard/group-savings-plan/collect/",values,true)

        if(api.isSuccessful(response)){
            setTimeout( () => {
                console.log(response.data.data.transaction);
                setResult(response.data.data.transaction);
                handleLocks()
                toast.success("Transaction successful");
            // navigate("/dashboard/loan-product",{replace: true});
            },0);
        }
        setFundBtn(false);
    } catch (error) {
        console.log(error)
    }
}


const withdrawCustomer = async(values) => {
    try {
        setWithdrawBtn(true);
        console.log(values)

        const response = await api
        .service()
        .push("/dashboard/group-savings-plan/withdraw/",values,true)

  if(api.isSuccessful(response)){
    setTimeout( () => {
        console.log(response.data.data.transaction)
        setResult(response.data.data.transaction);
        handleLocks()
      toast.success("Transaction successful!");
      // navigate("/dashboard/loan-product",{replace: true});
    },0);
  }
        setWithdrawBtn(false);
    } catch (error) {
        console.log(error)
    }
}


const withdrawCustomerFormState = () => ({
    amount: 0,
    reason: "",
    plan_id: 0
  });



    //   console.log(customers);
      const plan = (id)=> {
            return customers.filter(group => group.id === id)
      }




      const getGroup = (id)  => {
        console.log(data[0])
            let item = data.filter((customer) => customer.id === id);
            if(item.length !== 0){
                setUser(item[0]);
            }

      }
   
    return (
        <div>

            {fund && (
                <Button onClick={()=> [handleUnlocks(),getGroup(groupId)]}>Fund Wallet</Button>
            )}

            {widthdraw && (
                <Button onClick={()=> [handleUnlocks(),getGroup(groupId)]}>Widthdraw</Button>
            )}

                {result && (
                    <Hidden>
                    <Receipt {...result} />
                </Hidden>
                )}
                <Hidden>
                <Receipt {...result}  />
                </Hidden>

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
                            {fund ? 'Fund Group  Wallet' : ' Customer ID'}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLocks}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />
                        {fund && (
                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Are you sure you want to fund this account</Typography>
                        )}

                        {widthdraw && (
                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Withdraw</Typography>
                        )}


                      

                        {widthdraw && (
                            <>
                                <Formik
                                    initialValues={{
                                    amount: 0,
                                    reason: "",
                                    plan_id: 0,
                                    members_list:[data[0]?.members[0]?.id]
                                }}
                                     // validationSchema= {validationSchema}
                                     onSubmit = { async (values,actions) => {
                                        await withdrawCustomer(values)
                                    }}
                                >
                                    <Form style={{ display: 'flex', flexDirection: 'column' }} >
                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Amount</Typography></div>
                                            <TextField fullWidth variant='outlined' type="number" name="amount" size='small' />

                                        </div>

                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Savings Plan</Typography></div>
                                            <TextField 
                                                select={true}
                                                fullWidth
                                                name="plan_id"
                                                variant='outlined'
                                                label="Select One"

                                            >
                                            {
                                            plans.map((customer) => {
                                                return (
                                                <MenuItem key={customer.id} value={customer.id} > {customer.name} </MenuItem>
                                            )
                                            })
                                            }
                                            </TextField>

                                        </div>

                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Reason</Typography></div>
                                            <TextField fullWidth variant='outlined' type="text" name="reason" size='small' />
                                        </div>

                                        {
                                            withdrawBtn ? 
                                            ( <div className="sweet-loading">
                                                <DotLoader color={color} loading={loading} css={override}  size={80} />
                                                </div>)
                                            : (
                                                <Button type="submit" variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                    Widthdraw
                                                </Button> 
                                              )
                                        }

                                    </Form>
                                </Formik>

                            </>
                        )}

                        {fund && (
                            <>
                                <Formik
                                    initialValues={{
                                    amount: 0,
                                    depositor: "",
                                    plan_id: 0,
                                    member_id: data[0]?.members[0]?.id
                                }}
                                    // validationSchema= {savingsValidationSchema}
                                    onSubmit = { async (values,actions) => {
                                        await fundGroup(values)
                                    }}
                                >
                                    <Form style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Depositor</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="depositor" size='small'  />

                                    </div>


                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Amount</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="amount" size='small' />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Savings Plan</Typography></div>
                                        <TextField
                                            select={true}
                                            fullWidth
                                            name="plan_id"
                                            variant='outlined'
                                            label = "Select One"

                                        >
                                             <MenuItem>Select One</MenuItem>
                                             {
                                             plans.map((plan) => {
                                                return (
                                                <MenuItem key={plan.id} value={plan.id} > {plan.name} </MenuItem>
                                            )
                                             })
                                             }
                                        </TextField>

                                    </div>
                                    

                                    {
                                            fundBtn ? 
                                            ( <div className="sweet-loading">
                                                <DotLoader color={color} loading={loading} css={override}  size={80} />
                                                </div>)
                                            : (
                                                <Button type="submit" variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                    Fund
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

export default TransactionModal
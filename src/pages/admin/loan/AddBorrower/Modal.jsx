import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React,{ Fragment, useEffect,useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { toast } from "react-toastify";
import { api } from '../../../../services';
import { css } from "@emotion/react";
import { DotLoader } from "react-spinners";
import {TextField,Select} from "../../../../components/FormsUI";
import useStyles from '../styles';
import {Context} from "../../../../context/Context"


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
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
    display: 'flex',
    flexDirection: 'column'
};

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



const category = {
    "FLAT": "FLAT RATE",
    "REDUCING BALANCE": "REDUCING BALANCE"
};

const period = {
    "DAILY": "DAILY",
    "WEEKLY": "WEEKLY",
    "MONTHLY": "MONTHLY",
    "YEARLY": "YEARLY"
};

const schedule = {
    "MANUAL": "MANUAL",
    "AUTO": "AUTO"
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
export default function OptionModal({customerId}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    const [isLoading, setIsLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#ADD8E6");
    const [myuser,setUser] = useState("");
    const [marketers, setMarketers] = useState([]);
    const [branches, setBranches] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const {user} = useContext(Context)
    const navigate = useNavigate();
  
  

    const allCustomer = async () => {
      const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=VERIFIED", true);
      if (api.isSuccessful(res)) {
        setCustomers(res.data.results)
      }

    }

    const allMarketer = async () => {
      const res = await api.service().fetch("/accounts/manage/?is_staff=True&user_role=AGENT", true);
      console.log(res.data)
      if (api.isSuccessful(res)) {
        //   console.log(res)
        setMarketers(res.data.results)
      }


    }

    const allBranches = async () => {
      const res = await api.service().fetch("/dashboard/branches/", true);
      if (api.isSuccessful(res)) {
        setBranches(res.data.results)
      }


    }

    const newProduct = async () => {
      const res = await api
        .service()
        .fetch("/dashboard/loan-product", true);
      // console.log(res.data.results)

      if ((api.isSuccessful(res))) {
        setProducts(res.data.results);
        setIsLoading(false)
      }
    }

    useEffect(() => {
      allCustomer();
      allMarketer();
      allBranches();
      newProduct();

    }, [])
  
  
    const initialFormState = (id) => ({
      borrower: customerId,
      loan_product: "",
      amount: "",
      branch: "",
      category: "",
      payment_frequency: "",
      loan_period_in_months: "",
      payment_schedule: "",
      loan_officer: "",
      organisation: user.data.organisation
    });
  
    const validationSchema = yupObject().shape({
      borrower: yupNumber()
        .required("Please select a valid customer"),
      loan_product: yupNumber()
        .required("Select a loan product"),
      amount: yupNumber()
        .required("Enter an amount to be disburse"),
      category: yupString()
        .required("Please select a category."),
      payment_frequency: yupString()
        .required("Select a payment frequency"),
      payment_schedule: yupString()
        .required("Select a payment schedule"),
      // branch: yupNumber()
      // .required("Select a branch name"),
      loan_period_in_months: yupNumber()
        .required("Enter loan period"),
      loan_officer: yupNumber()
        .required("Select a loan officer"),
  
    });
  
    const add_borrower = async (values) => {
          try {
            setLoader(true);
            console.log(values)
        
            const response = await api
              .service()
              .push("/dashboard/loan/add/", values, true)
        
            if (api.isSuccessful(response)) {
              setTimeout(() => {
                handleClose()
                toast.success("Successfully assign loan!");
                navigate("/admin/dashboard/loan/add_borrower", { replace: true });
              }, 0);
            }
            setLoader(false);
          } catch (error) {
            console.log(error);
            setLoader(false);
          }
    }
  
    const getCustomer = (id)  => {
          try {
              let item = customers.filter((customer) => customer.id === id);
              if(item.length !== 0){
                  setUser(item[0]);
              }    
          } catch (error) {
              console.log(error);
          }
    }

    return (
        <div>
            <Button variant='contained' style={{ textTransform: 'none' }} onClick={()=> [handleOpen(),getCustomer(customerId)]} >Assign Loan</Button>
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
                        <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                            Add New Borrower
                        </Typography>

                        <Divider />

                        <Formik 
                            initialValues={initialFormState(customerId)}
                            validationSchema={validationSchema}
                            onSubmit={ async(values) => {
                            await add_borrower(values)
                            }}
                         >
                            <Form style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }} >
                            <div className={classes.formDiv}>
                            <div className={classes.divTypo}><Typography>Branch</Typography></div>
                                <FormControl fullWidth >

                                    <TextField
                                            select={true}
                                            fullWidth
                                            name="branch"
                                            variant='outlined'
                                            label="Choose One"
                                        >
                                 {
                                    branches.map((branch) => (
                                        <MenuItem key={branch.id} value={branch.id} > {branch.name} </MenuItem>
                                                                    

                                    ))
                                 }
                                    </TextField>
                                </FormControl>
                            </div>
                            <div className={classes.formDiv}>
                            <div className={classes.divTypo}><Typography>Loan Officer</Typography></div>
                                <FormControl fullWidth >
                                    <TextField
                                            select={true}
                                            fullWidth
                                            name="loan_officer"
                                            variant='outlined'
                                            label="Choose One"
                                        >
                                      {
                                        marketers.map((marketer) => (
                                            <MenuItem  key={marketer.id} value={marketer.id} > {marketer.first_name} </MenuItem>
                                                                

                                        ))
                                     }
                                    </TextField>
                                </FormControl>
                            </div>
                            <div className={classes.formDiv}>
                            <div className={classes.divTypo}><Typography>Category</Typography></div>
                                <FormControl fullWidth >
                                    <Select
                                            size='small'
                                            fullWidth
                                            name="category"
                                            options={category}
                                            label="Choose One"
                                        />
                                </FormControl>
                            </div>
                            <div className={classes.formDiv}>
                                 <div className={classes.divTypo}><Typography>Loan Product</Typography></div>
                                <FormControl fullWidth >
                                    <TextField
                                            select={true}
                                            fullWidth
                                            name="loan_product"
                                            variant='outlined'
                                            label="Choose One"
                                        >
                                     {
                                        products.map((product) => (
                                            <MenuItem key={product.id} value={product.id} > {product.name} </MenuItem>
                                                                

                                         ))
                                     }
                                    </TextField>
                                </FormControl>
                            </div>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Loan Amount</Typography></div>
                                <TextField fullWidth variant='outlined' type="number" name="amount" size='small' />

                            </div>
                            <div className={classes.formDiv}>
                              <div className={classes.divTypo}><Typography>Payment Frequency</Typography></div>

                                <FormControl fullWidth >
                                    <Select
                                            size="small"
                                            fullWidth
                                            label="Select One"
                                            name='payment_frequency'
                                            options={period}
                                        />
                                </FormControl>
                            </div>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Loan Period in Months</Typography></div>
                                <TextField fullWidth variant='outlined' type="number" name="loan_period_in_months" size='small'   />

                            </div>

                            <div className={classes.formDiv}>
                               <div className={classes.divTypo}><Typography>Payment Schedule</Typography></div>

                                <FormControl fullWidth >
                                    <Select
                                            size="small"
                                            fullWidth
                                            label="Select One"
                                            name='payment_schedule'
                                            options={schedule}
                                        />
                                </FormControl>
                            </div>



                            {
                                            loader ? 
                                            ( <div className="sweet-loading">
                                                <DotLoader color={color} loading={loading} css={override}  size={80} />
                                                </div>)
                                            : (
                                                <Button type="submit" variant='contained' fullWidth style={{ background: 'green', marginTop: 10, alignSelf: 'center' }}>
                                                    Add
                                                </Button>
                                              )
                                        }
                            </Form>
                        </Formik>

                        <Divider />
                        <Button onClick={handleClose} style={{ background: 'gray', color: 'white', marginLeft: 5, alignSelf: 'flex-end' }}>Close</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

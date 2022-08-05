import { Box, Button, Divider, IconButton, MenuItem, Modal, CircularProgress, Select,  Typography } from '@mui/material';
import React, { useState,useEffect } from 'react';
import useStyles from './styles';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@material-ui/styles';
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {object as yupObject,string as yupString,number as yupNumber} from "yup";
import { toast } from "react-toastify";

import { api } from '../../../services';
import {DotLoader} from "react-spinners";
import {TextField} from "../../../components/FormsUI"
import { css } from "@emotion/react";



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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const AllCustomersModal = ({ edit,customerId }) => {
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
    const [delBtn,setDelBtn] = useState(false)
    const [btnLoading,setBtnLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [Loading, setLoading] = useState(false)
    let [loading, setloading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [data,setData] = useState([]);
    const [marketers,setMarketers] = useState([]);

    useEffect(() => {
        setIsLoading(true)

        const allCustomer = async() => {
          const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=VERIFIED",true);
          console.log(res.data)
          if(api.isSuccessful(res)){
            setData(res.data.results)
          }
        setIsLoading(false);
    
        }

        allCustomer();
      },[])

      const savingsFormState = (id) => ({
        user: id,
        frequency: "",
        amount_per_cycle: null,
        duration_in_months: null,
        amount: null,
        plan_type: ""
      });
    
    
      const savingsValidationSchema = yupObject().shape({
        user: yupNumber()
        .required("User is required"),
        frequency: yupString()
        .required("frequency is required"),
        amount_per_cycle: yupNumber()
        .required("Amount cycle is required"),
        duration_in_months: yupNumber()
        .required("Duration is required"),
        amount: yupNumber()
        .required("Amount is required"),
        plan_type: yupString()
        .required("Select a savings plan."),
      });


      const savings = async(values) => {
        setLoading(true);
        console.log(values)

        const response = await api
            .service()
            .push("/dashboard/savings-plan/add/",values,true)

        if(api.isSuccessful(response)){
        setTimeout( () => {
            toast.success("Savings Plan successfully added!");
            // navigate("/admin/allbranch",{replace: true})
        },0);
        }
        setLoading(false);
    }

    useEffect(() => {
        setIsLoading(true)
    
        const allMarketer = async() => {
          const res = await api.service().fetch("/accounts/manage/?is_staff=True&user_role=AGENT",true);
          // console.log(res.data)
          if(api.isSuccessful(res)){
            //   console.log(res)
            setMarketers(res.data.results)
          }
    
          setIsLoading(false);
    
        }
    
        allMarketer();
      },[])


    //   const initialFormState = (email) => ({
    //     first_name: "",
    //     middle_name: "",
    //     last_name: "",
    //     email: `${email}`,
    //     residential_address: "",
    //     business_address: "",
    //     phone: "",   
    //     agent_id: null,
    //   });
    
      const validationSchema = yupObject().shape({
        title: yupString()
        .required("The title is required"),
        first_name: yupString()
        .required("First name is required"),
        middle_name: yupString(),
        last_name: yupString()
        .required("Last name is required"),
        gender: yupString()
        .required("Gender is required"),
        dob: yupString()
        .required("Dirth of birth is required"),
        // avatar: yupString()
        // .required("Profile Picture is required"),
        // country: yupString()
        // .required("Please Select your country"),
        // state: yupString()
        // .required("Please select your state"),
        // city: yupString()
        // .required("Please select your city")
      })
      const edit_customer = async(values,id) => {
            try {
                setBtnLoading(true);
                console.log(values)
        
                const response = await api
                    .service()
                    .update(`/accounts/auth/${id}/`,values,true)
        
                if(api.isSuccessful(response)){
                setTimeout( () => {
                    handleLocks()
                    toast.success("Customer profile successfully updated!!");
                    // navigate("/admin/allbranch",{replace: true})
                },0);
                }
                setBtnLoading(false);
            } catch (error) {
                console.log(error);
            }
    }

    const deleteCustomer = async(id) => {
        setDelBtn(true)
        const res = await api.service().remove(`/accounts/auth/${id}/`,true);
        console.log(res.data)
        if(api.isSuccessful(res)){
            setTimeout( () => {
                setDelBtn(false)
                handleLocks()
                toast.success("Successfully deleted customer!");
            },0);
            }
  
      }




      const [user,setUser] = useState("");
      const getCustomer = (id)  => {
            let item = data.filter((customer) => customer.id === id);
            if(item.length !== 0){
                setUser(item[0]);
            }

      }




    return (
        <div>
            <Button onClick={()=> [handleUnlocks(),getCustomer(customerId)]}>
                                {edit ? 'Edit Profile' : 'View Profile'}
                                
            </Button>
    
        {user && (
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
                            Customer ID
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLocks}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />

                        {edit && (
                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Edit Customer Profile</Typography>
                        )}

                        {edit ? (
                            <>
                            <Formik
                                    initialValues={{
                                    first_name: `${user?.first_name}`,
                                    middle_name: `${user?.middle_name}`,
                                    last_name: `${user?.last_name}`,
                                    email: `${user?.email}`,
                                    residential_address: `${user?.residential_address}`,
                                    business_address: `${user?.business_address}`,
                                    phone: `${user?.phone}`,   
                                    agent_id: `${user?.agent?.id}`
                                }}
                            // validationSchema= {validationSchema}
                            onSubmit = { async (values,actions) => {
                                await edit_customer(values,user.id)
                            }}
                            >
                                <Form style={{ display: 'flex', flexDirection: 'column' }} >
                                <div className={classes.formDiv}>
                                    <div className={classes.divTypo}><Typography>First Name</Typography></div>
                                    <TextField fullWidth variant='outlined' type="text" name="first_name" size='small'  />

                                </div>

                                <div className={classes.formDiv}>
                                    <div className={classes.divTypo}><Typography>Middle Name</Typography></div>
                                    <TextField fullWidth variant='outlined' type="text" name="middle_name" size='small' />

                                </div>

                                <div className={classes.formDiv}>
                                    <div className={classes.divTypo}><Typography>Last Name</Typography></div>
                                    <TextField fullWidth variant='outlined' type="text" name="last_name" size='small'  />

                                </div>

                                <div className={classes.formDiv}>
                                    <div className={classes.divTypo}><Typography>Email</Typography></div>
                                    <TextField fullWidth variant='outlined' type="email" name="email" size='small'  />

                                </div>

                                <div className={classes.formDiv}>
                                    <div className={classes.divTypo}><Typography>Phone</Typography></div>
                                    <TextField fullWidth variant='outlined' type="text" name="phone" size='small'  />

                                </div>

                                <div className={classes.formDiv}>
                                    <div className={classes.divTypo}><Typography>Business Address</Typography></div>
                                    <TextField fullWidth variant='outlined' type="text" name="business_address" size='small'  />

                                </div>

                                <div className={classes.formDiv}>
                                    <div className={classes.divTypo}><Typography>Residential Address</Typography></div>
                                    <TextField fullWidth variant='outlined' type="text" name="residential_address" size='small' />

                                </div>

                                <div className={classes.formDiv}>
                                    <div className={classes.divTypo}><Typography>Marketer</Typography></div>
                                    <TextField
                                        select={true} 
                                        className={classes.input}
                                        name="agent_id"  
                                        variant='outlined'
                                        fullWidth={true}
                                        // type="number"
                                    >
                                        {marketers.map((marketer) => {
                                            return (
                                                <MenuItem key={marketer.id} value={marketer.id}>
                                                    {marketer.first_name}
                                                </MenuItem>      
   
                                            )
                                        })}
                                        </TextField>

                                </div>

                                {/* <Button variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                    Update
                                </Button> */}
                                {
                                            btnLoading ? 
                                            ( <div className="sweet-loading">
                                                <DotLoader color={color} loading={loading} css={override}  size={80} />
                                                </div>)
                                            : (
                                                <Button type="submit" variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                    Update
                                                </Button>
                                              )
                                        }

                                </Form>
                            </Formik>

                            </>
                        ) : (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <img
                                        className={classes.profileImage}
                                        src="https://i.ytimg.com/vi/K0u_kAWLJOA/maxresdefault.jpg"
                                        alt="profile"
                                    />
                                        {delBtn ? (
                                        <CircularProgress size={26} />
                                        )
                                        :
                                        (
                                            <Button onClick={() => deleteCustomer(user.id)} variant='contained' style={{ background: 'red', marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                Delete
                                            </Button>                        
                                                    )
                                        }
 
                                </div>
                            </>
                        )}

                        <Divider style={{ marginTop: 40 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                            <Button onClick={handleLocks} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        )}
        </div>
    )
}

export default AllCustomersModal
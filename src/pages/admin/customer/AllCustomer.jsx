import { Divider, Grid, MenuItem } from "@material-ui/core";
import {  useTheme } from "@material-ui/styles";
import { css } from "@emotion/react";
import useStyles from './styles'
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Chip
} from "@material-ui/core";
//   import useStyles from "./styles";
import React,{ Fragment, useState,useContext,useEffect } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { IconButton, OutlinedInput, Paper, Select} from "@mui/material";

import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {object as yupObject,string as yupString,number as yupNumber} from "yup";
import { toast } from "react-toastify";

import { api } from '../../../services';
import {BounceLoader,DotLoader} from "react-spinners";
import {Context} from "../../../context/Context";
import {TextField} from "../../../components/FormsUI"

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


// const useStyles = makeStyles(theme => ({
//     tableOverflow: {
//         overflow: 'auto'
//     }
// }))
const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


// table
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(1, '2022-05-2', 15000, 'Cash', 'For Loan'),
    // createData('Ice cream sandwich', 237, 9.0, 37,),

];

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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const Allcustomer = () => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    // modal
    const [openn, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClosee = () => setOpen(false);
    // second modal
    const [lock, setUnlock] = useState(false);
    const handleUnlock = () => setUnlock(true);
    const handleLock = () => setUnlock(false);
    // third modal
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
        const res = await api.service().remove(`/accounts/auth/${id}/`,true);
        console.log(res.data)
        if(api.isSuccessful(res)){
            setTimeout( () => {
                toast.success("Successfully deleted customer!");
            },0);
            }
  
      }




      const [user,setUser] = useState("");
      const getCustomer = (id)  => {
            let item = data.filter((customer) => customer.id === id);
            if(item[0].length !== 0){
                setUser(item[0]);
            }
            // console.log(user);
      }

      const getId = (id) => {
        // console.log(id)
        getCustomer(id)
    }
      const handleProps = () => {
        // console.log(setCurrentId);
        getCustomer();
        // setItem(branches(setCurrentId));
        return setUnlock(true);
      }

   

    return (
        <Fragment>
            <PageTitle title="All Customers" />
            <Grid container spacing={4}>
                {
                    isLoading ? 
                        (         <div className="sweet-loading">
                    <BounceLoader color={color} l css={override} size={150} />
                </div>
                ):
                (
                    <Grid item xs={12}>
                    <Widget title="Maketers" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                        <Table className="mb-0">
                            <TableHead>
                                <TableRow>
                                    <TableCell >ID</TableCell>
                                    <TableCell >Full Name</TableCell>
                                    <TableCell >Account Number</TableCell>
                                    <TableCell>Telephone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Marketer</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* <TableRow> */}
                                  {data.map((customer) => (
                                    <TableRow key={customer.id} >
                                    <TableCell className="pl-3 fw-normal"> {customer.id} </TableCell>
                                    <TableCell> {customer.first_name} {customer.last_name}	</TableCell>
                                    <TableCell> {customer.wallet.id} </TableCell>
                                    <TableCell> {customer.phone} </TableCell>
                                    <TableCell> {customer.email}	</TableCell>
                                    <TableCell>	{customer.agent.first_name} </TableCell>
                                    <TableCell>	<Button style={{ textTransform: 'none' }} variant="contained" disableElevation> {customer.status} </Button></TableCell>
                                    <TableCell>
                                        <div>
                                            <Button
                                                id="demo-customized-button"
                                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                variant="contained"
                                                disableElevation
                                                onClick={(event)=> [handleClick(event),
                                                getId(customer.id)
                                                ]}
                                                endIcon={<KeyboardArrowDownIcon />}
                                                style={{ textTransform: 'none' }}
                                            >
                                                Action
                                            </Button>
                                            <StyledMenu
                                                id="demo-customized-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'demo-customized-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                {/* <MenuItem onClick={handleOpen} history disableRipple>
                                                    Action
                                                </MenuItem> */}
                                                <MenuItem onClick={handleUnlock} disableRipple>
                                                    Edit Profile
                                                </MenuItem>
                                                <MenuItem onClick={handleUnlocks} disableRipple>
                                                    Add Plan
                                                </MenuItem>
                                                <MenuItem onClick={handleOpen} disableRipple>
                                                    Fund Wallet
                                                </MenuItem>
                                            </StyledMenu>
                                        </div>
                                    </TableCell>
                                    </TableRow>
                                  ))}
                                {/* </TableRow> */}
                            </TableBody>
                        </Table>
                    </Widget>
                </Grid>
                )
                }
       

            </Grid>

                {user && 
                
                    <div>


            {/* Edit Customer Profile */}
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
                                Customer ID {user?.id}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                <IconButton onClick={handleLock}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <Divider style={{ marginTop: 40 }} />

                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Edit {user?.first_name} Profile</Typography>

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

                            <Divider style={{ marginTop: 40 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                                <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>


            </div>
                }
        </Fragment>

    )
}

export default Allcustomer
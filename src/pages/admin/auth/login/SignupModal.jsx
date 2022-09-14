import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, IconButton, InputAdornment,  Tab } from '@mui/material';
import {CircularProgress} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { api } from "../../../../services";
import { TextField, Select } from '../../../../components/FormsUI'; 
import useStyles from './styles';


const registerInitialFormState = () => ({
    first_name: "",
    last_name: "",
    org_name: "",
    org_type: "",
    bvn: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    confirm_password: "",
    user_role: "ADMIN",
    country: "Nigeria"
  });


  const registerFormValidation = Yup.object().shape({
    first_name: Yup.string()
      .required('Required'),
    last_name: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Invalid email.')
      .required('Required'),
    phone: Yup.number()
      .integer()
      .typeError('Please enter a valid phone number')
      .required('Required'),
    org_name: Yup.string()
      .required('Required'),
    org_type: Yup.string()
      .required('Required'),
    password: Yup.string()
      .required('Required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null],"Passwords does not match")
  });

  const orgs = {
    "B": "MFB",
    "I": "MFI",
    // "E": "ESUSU",
    // "C": "COOPERATIVE"
  }

const SignupModal = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [showCpassword, setShowCpassword] = useState(false);
    const handleShowCpassword = () => setShowCpassword(!showCpassword);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const register = async (values) => {
        try {
          setIsLoading(true);
          console.log(values)
          localStorage.setItem("email", values.email);
    
          const response = await api
            .service()
            .push("/accounts/manage/signup/", values, true)
    
          if (api.isSuccessful(response)) {
            setTimeout(() => {
              toast.success('Registration successfully!');
              navigate("/auth/confirm_email", { replace: true })
            }, 0);
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }

    return (
        <div>
            {/* <Button variant="text" classes={{ root: classes.tab }} onClick={handleClickOpen}>
                New User
            </Button> */}
            <Tab label="New User" classes={{ root: classes.tab }} onClick={handleClickOpen} />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sign up is easy, it only take Few steps
                    </DialogContentText>
                    <Formik
                        initialValues={registerInitialFormState()}
                        validationSchema={registerFormValidation}
                        onSubmit={async (values) => {
                        await register(values)
                        }}
                    >
                        <Form>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="first_name"
                            id="first_name"
                            placeholder='First Name'
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="last_name"
                            name="last_name"
                            placeholder='Last Name'
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="co_op_name"
                            name="org_name"
                            placeholder="Full Co-operation/Organisation Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            type="number"
                            fullWidth
                            variant="outlined"
                        />

                        <FormControl style={{ marginTop: 2, width: '100%' }} className={classes.textField}>
                            {/* <InputLabel id="demo-select-small">Company Type</InputLabel> */}
                            <Select
                                // select={true}
                                labelid="demo-select-small"
                                id="demo-select-small"
                                name="org_type"
                                label="Company Type"
                            options={orgs}
                            />
                        </FormControl>

                        <TextField
                            margin="dense"
                            id="address"
                            name="address"
                            placeholder="Address location of company"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="bvn"
                            name="bvn"
                            placeholder="BVN"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                        />


                  <TextField
                    variant="outlined"
                    name="confirm_password"
                    id="confirm_password"
                    InputProps={{
                      classes: {
                        // underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowCpassword}>
                            {showCpassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    margin="dense"
                    placeholder="Confirm Password"
                    type={showCpassword ? "text" : "password"}
                    fullWidth
                    autoComplete="off"
                  />


                    <div className={classes.creatingButtonContainer}>
                            {isLoading ? (
                            <CircularProgress size={26} />
                            ) : (
                            <Button type="submit" variant='outlined' color='success'>Create Account</Button>
                            )}
                        </div>
                    </Form>
                    </Formik>

                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='secondary' onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SignupModal
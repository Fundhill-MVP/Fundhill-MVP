// CONTEXT
import { Context } from "../../../../context/Context";


// import classnames from "classnames";

// styles
import useStyles from "./styles";
// context

import { InputAdornment, IconButton } from '@mui/material/';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import assets from "../../../../components/assets";

import { TextField, Button, Select } from "../../../../components/FormsUI"

import React, { useState, useContext } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
  Fade,
  FormControl,
} from "@material-ui/core";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { api } from "../../../../services";



const registerInitialFormState = () => ({
  first_name: "",
  last_name: "",
  org_name: "",
  org_type: "",
  bvn: "",
  email: "",
  phone: "",
  password: "",
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
});

const loginInitialFormState = () => ({
  email: "",
  password: "",
});



const loginFormValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});


function Login(props) {
  const classes = useStyles();
  // global

  const navigate = useNavigate();
  // const history = useHistory();
  const { dispatch, } = useContext(Context)

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);


  const orgs = {
    "B": "MFB",
    "I": "MFI",
    // "E": "ESUSU",
    // "C": "COOPERATIVE"
  }

  const login = async (values) => {
    setIsLoading(true);
    console.log(values);
    const response = await api
      .service()
      .push('/accounts/auth/signin/', values, true);

    if (api.isSuccessful(response)) {
      localStorage.setItem("token", response?.data?.data?.token)
      dispatch({ type: "LOGIN_SUCCESS", payload: response?.data });
      setTimeout(() => {
        // response?.data?.data?.user_role === "ADMIN" &&   toast.success('Logged in successfully!');
        // navigate("/admin/dashboard", { replace: true });
        if (response?.data?.data?.user_role === "ADMIN") {
          toast.success('Logged in successfully!');
          navigate("/admin/dashboard", { replace: true });
        } else if (response?.data?.data?.user_role === "AGENT" || response?.data?.data?.user_role === "TELLER") {
          toast.success('Logged in successfully!');
          navigate("/agent/dashboard", { replace: true });
        }
      }, 0);
    }

    setIsLoading(false);
  }

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

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [showCpassword, setShowCpassword] = useState(false);
  const handleShowCpassword = () => setShowCpassword(!showCpassword);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={assets.logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>FundHill</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>


              <Formik
                initialValues={loginInitialFormState()}
                validationSchema={loginFormValidation}
                onSubmit={async (values) => {
                  await login(values)
                }}
              >
                <Form>
                  <TextField
                    variant="outlined"
                    name="email"
                    id="email"
                    InputProps={{
                      classes: {
                        // underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    margin="normal"
                    placeholder="Email Adress"
                    type="email"
                    fullWidth
                  />

                  <TextField
                    variant="outlined"
                    name="password"
                    id="password"
                    InputProps={{
                      classes: {
                        input: classes.textField,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    margin="normal"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                  />
                  <div className={classes.formButtons}>
                    {isLoading ? (
                      <CircularProgress size={26} className={classes.loginLoader} />
                    ) : (
                      <Button
                        constiant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                      >
                        Login
                      </Button>
                    )}
                    <Link
                      className={classes.forgetButton}
                      // onClick={() => { navigate('/auth/forgot_password') }}
                      to="/auth/forgot_password"
                    >
                      Forget Password
                    </Link>
                  </div>
                </Form>
              </Formik>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography constiant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <Formik
                initialValues={registerInitialFormState()}
                validationSchema={registerFormValidation}
                onSubmit={async (values) => {
                  await register(values)
                }}
              >
                <Form>
                  <TextField
                    variant="outlined"
                    name="first_name"
                    id="first_name"
                    InputProps={{
                      classes: {
                        input: classes.textField,
                      },
                    }}
                    margin="normal"
                    placeholder="First Name"
                    type="text"
                    fullWidth
                  />

                  <TextField
                    variant="outlined"
                    name="last_name"
                    id="last_name"
                    InputProps={{
                      classes: {
                        input: classes.textField,
                      },
                    }}
                    margin="normal"
                    placeholder="Last Name"
                    type="text"
                    fullWidth
                  />

                  <TextField
                    variant="outlined"
                    name="org_name"
                    id="org_name"
                    InputProps={{
                      classes: {
                        // underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    margin="normal"
                    placeholder="Full Co-operation/Organization Name"
                    type="text"
                    fullWidth
                  />

                  <TextField
                    variant="outlined"
                    name="email"
                    id="email"
                    InputProps={{
                      classes: {
                        // underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    margin="normal"
                    placeholder="Email Adress"
                    type="email"
                    fullWidth
                  />

                  <TextField
                    variant="outlined"
                    name="phone"
                    id="number"
                    InputProps={{
                      classes: {
                        // underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    margin="normal"
                    placeholder="Enter your phone number"
                    type="number"
                    fullWidth
                  />

                  <FormControl style={{ marginTop: 2, width: '100%' }} className={classes.textField}>
                    {/* <InputLabel id="demo-select-small">Company Type</InputLabel> */}
                    <Select
                      labelid="demo-select-small"
                      id="demo-select-small"
                      name="org_type"
                      label="Company Type"
                      options={orgs}
                    />
                  </FormControl>

                  <TextField
                    variant="outlined"
                    name="address"
                    id="address"
                    InputProps={{
                      classes: {
                        // underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    margin="normal"
                    placeholder="Address location of company"
                    type="text"
                    fullWidth
                  />

                  <TextField
                    variant="outlined"
                    name="bvn"
                    id="last_name"
                    InputProps={{
                      classes: {
                        input: classes.textField,
                      },
                    }}
                    margin="normal"
                    placeholder="BVN"
                    type="text"
                    fullWidth
                  />

                  <TextField
                    variant="outlined"
                    name="password"
                    id="password"
                    InputProps={{
                      classes: {
                        // underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    margin="normal"
                    placeholder="Password"
                    type="password"
                    fullWidth
                    autocomplete="off"
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
                    margin="normal"
                    placeholder="Confirm Password"
                    type={showCpassword ? "text" : "password"}
                    fullWidth
                    autocomplete="off"
                  />

                  <div className={classes.creatingButtonContainer}>
                    {isLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      <Button
                        size="large"
                        constiant="contained"
                        color="primary"
                        fullWidth
                        className={classes.createAccountButton}
                      >
                        Create your account
                      </Button>
                    )}
                  </div>
                </Form>
              </Formik>

            </React.Fragment>
          )}
        </div>

      </div>
    </Grid>
  );
}

export default Login;

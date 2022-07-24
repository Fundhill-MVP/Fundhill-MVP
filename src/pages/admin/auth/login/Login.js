// CONTEXT
import { Context } from "../../../../context/Context";


// import classnames from "classnames";

// styles
import useStyles from "./styles";
// context
import { useUserDispatch, loginUser } from  "../../../../context/UserContext"


import assets from "../../../../components/assets/";
import TextField from "../../../../components/FormsUI/Textfield";
// import Button from "../../components/FormsUI/Button";
import Button from "../../../../components/FormsUI/Button"

import React, { useState,useContext } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners"
import { api } from "../../../../services";
;




const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const registerInitialFormState = () => ({
  first_name: "",
  last_name: "",
  "org_name": "",
  "org_type": "",
  email: "",
  phone: "",
  password: "",
  user_role: "ADMIN"
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
  const userDispatch = useUserDispatch();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");

  const navigate = useNavigate();
  // const history = useHistory();
  const {dispatch,} = useContext(Context)

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);



  const login = async (values) => {
    setIsLoading(true);
    console.log(values);
    const response = await api
      .service()
      .push('/accounts/auth/signin/', values, true);

    if (api.isSuccessful(response)) {
      localStorage.setItem("token",response?.data?.data?.token)
      dispatch({type: "LOGIN_SUCCESS",payload: response?.data});
      setTimeout(() => {
        toast.success('Logged in successfully!');
        // navigate("/admin/dashboard",{replace: true})
        navigate("/admin/dashboard/allbranch",{replace: true});
      }, 0);
    }

    setIsLoading(false);
  }

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
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
              {/* <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    constiant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button>
              </div> */}

              <Formik
                initialValues={loginInitialFormState()}
                validationSchema={loginFormValidation}
                onSubmit = {async(values) => {
                  await login(values)
                }}
              >
              <Form>
                <TextField
                  name = "email"
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  margin="normal"
                  placeholder="Email Adress"
                  type="email"
                  fullWidth
                />

              <TextField
                name = "password"
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                margin="normal"
                placeholder="Password"
                type="password"
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
                    >
                      Login
                    </Button>
                  )}
                  <Button
                    color="primary"
                    size="large"
                    className={classes.forgetButton}
                  >
                    Forget Password
                  </Button>
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
              {/* <TextField
                id="first_name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="First Name"
                type="text"
                fullWidth
              />
              <TextField
                id="last_name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={lastnameValue}
                onChange={e => setLastNameValue(e.target.value)}
                margin="normal"
                placeholder="Last Name"
                type="text"
                fullWidth
              />
              <TextField
                id="coop"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={coopValue}
                onChange={e => setCoopValue(e.target.value)}
                margin="normal"
                placeholder="Full Co-operation/Organization Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="number"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={numberValue}
                onChange={e => setNumberValue(e.target.value)}
                margin="normal"
                placeholder="Enter your phone number"
                type="number"
                fullWidth
              />

              <FormControl style={{ marginTop: 2, width: '100%' }} size="small">
                <InputLabel id="demo-select-small">Company Type</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={org_type}
                  name="company"
                  label="Company Type"
                  onChange={() => setOrgType(e.target.value)}
                >
                  <MenuItem value="MFB">MFB</MenuItem>
                  <MenuItem value="MFI">MFI</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="address"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={addressValue}
                onChange={e => setAddressValue(e.target.value)}
                margin="normal"
                placeholder="Address location of company"
                type="text"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        nameValue,
                        lastnameValue,
                        coopValue,
                        numberValue,
                        addressValue,
                        loginValue,
                        passwordValue,
                        age,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    constiant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div> */}

            </React.Fragment>
          )}
        </div>

      </div>
    </Grid>
  );
}

export default Login;

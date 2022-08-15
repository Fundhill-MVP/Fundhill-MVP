import { makeStyles } from '@material-ui/styles'
import { FormControl, IconButton, InputAdornment, OutlinedInput, Typography, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { TextField } from "../../../../components/FormsUI"
import { css } from "@emotion/react";
import React, { useState, useContext } from "react";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { api } from "../../../../services";
import { Context } from "../../../../context/Context";
import { DotLoader } from "react-spinners";

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        padding: 15
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'

    },
    form: {
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        background: '#fff',
        padding: 30,
        borderRadius: '10px',
        width: '50%',
        [theme.breakpoints.down("sm")]: {
            width: '100%'
        },
    },
    title: {
        fontWeight: 600,
    },
    input: {
        marginTop: '10px !important'
    },
    btn: {
        marginTop: '10px !important'
    }
}));


const ResetPassword = () => {
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const classes = useStyles();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");

    const queryParams = new URLSearchParams(window.location.search)
    const userid = queryParams.get("uidb64")
    const token = queryParams.get("token")
    console.log(userid, token);

    const initialFormState = () => ({
        uidb64: `${userid}`,
        token: `${token}`,
        password: ""
    });

    // const initialFormState = () => ({
    //     uidb64: `${9}`,
    //     token: `${1234567}`,
    //     password:""
    // });  

    const formValidation = Yup.object().shape({
        password: Yup.string()
            .required('Required'),
    });

    const submitResetPassword = async (values) => {
        setIsLoading(true);
        console.log(values);
        const response = await api
            .service()
            .push('/accounts/manage/complete-password-reset/', values, true);

        if (api.isSuccessful(response)) {
            setTimeout(() => {
                toast.success('Token Verified  successfully.');
                navigate('/auth/login')
            }, 0);
        }

        setIsLoading(false);
    }
    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <Formik
                    initialValues={initialFormState()}
                    validationSchema={formValidation}
                    onSubmit={async (values) => {
                        await submitResetPassword(values)
                    }}
                >
                    <Form className={classes.form}>
                        <Typography variant='h5' gutterBottom className={classes.title}>Reset Password?</Typography>
                        <TextField className={classes.input} variant='outlined' name="password" fullWidth type='password' placeholder='Insert New Password' />
                        <FormControl className={classes.input} fullWidth variant="outlined">
                            <OutlinedInput
                                placeholder="Confirm password"
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {/* <Button className={classes.btn} variant='contained' fullWidth>Submit</Button> */}
                        {
                            isLoading ?
                                (<div className="sweet-loading">
                                    <DotLoader color={color} loading={loading} css={override} size={80} />
                                </div>)
                                : (
                                    <Button type="submit" className={classes.btn} variant='contained' fullWidth>Submit</Button>
                                )
                        }
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default ResetPassword
import { makeStyles } from '@material-ui/styles'
import { Typography,Button } from '@mui/material';
import React, { useState, useContext } from "react";

import { TextField} from "../../../../components/FormsUI"
import { css } from "@emotion/react";
import {
  Grid,
  CircularProgress,
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
import { Context } from "../../../../context/Context";
import {DotLoader} from "react-spinners";


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
    },
    btn: {
        marginTop: '5px !important'
    }
}));

const initialFormState = () => ({
    email: "",
  });
  
  
  
  const formValidation = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email.')
      .required('Required'),
  });

const ForgotPassword = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");

    const submit_email = async (values) => {
        setIsLoading(true);
        console.log(values);
        const response = await api
          .service()
          .push('/accounts/manage/request-password-reset/', values, true);
    
        if (api.isSuccessful(response)) {
          setTimeout(() => {
            toast.success('We have successfully sent reset token to your email.');
            // navigate('/auth/token')
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
                  await submit_email(values)
                }}
            >
                <Form className={classes.form}>
                <Typography variant='h5' gutterBottom className={classes.title}>Forgot Password?</Typography>
                    <TextField className={classes.input} variant='outlined' name="email" fullWidth type='email' placeholder='Insert a valid email' />
                    {
                         isLoading ? 
                         ( <div className="sweet-loading">
                             <DotLoader color={color} loading={loading} css={override}  size={80} />
                             </div>)
                         : (
                             <Button type="submit" className={classes.btn} variant='contained' fullWidth>Submit</Button>
                          )
                    }
                                           
                </Form>
            </Formik>
            <Link to="/auth/login" >Go back</Link>
            </div>
        </div>
    )
}

export default ForgotPassword
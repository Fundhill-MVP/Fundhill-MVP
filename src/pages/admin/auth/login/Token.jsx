import { makeStyles } from '@material-ui/styles'

import { TextField, Button} from "../../../../components/FormsUI"
import { css } from "@emotion/react";
import React, { useState, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
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
    token: "",
  });
  
  
  
  const formValidation = Yup.object().shape({
    token: Yup.number()
      .required('Required'),
  });
const Token = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");

    const submit_token = async (values) => {
        setIsLoading(true);
        console.log(values);
        const response = await api
          .service()
          .push('/accounts/manage/complete-password-reset/', values, true);
    
        if (api.isSuccessful(response)) {
          setTimeout(() => {
            toast.success('Token Verified  successfully.');
            navigate('/auth/reset_password')
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
                  await submit_token(values)
                }}
            >
                <Form className={classes.form}>
                    <TextField className={classes.input} variant='outlined' name="token" fullWidth type='number' placeholder='Insert your token' />
                    <Button className={classes.btn} variant='contained' fullWidth>Submit</Button>
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
            </div>
        </div>
    )
}

export default Token
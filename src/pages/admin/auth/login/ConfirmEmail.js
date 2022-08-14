import { Button, Container, Typography } from '@material-ui/core';
import assets from '../../../../components/assets';
import useStyles from './styles';
import React,{ Fragment, useState } from "react";
import { api } from "../../../../services";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";

const ConfirmEmail = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
  
  
    const handleClick = async(e) => {
          e.preventDefault()
          const email = localStorage.getItem("email")
          // console.log(typeof(user));
          // console.log(email)
          // console.log(user.email)
  
          const values = {"email": email};
  
  
          setIsLoading(true);
          console.log(values)
          const response = await api
                .service()
                .push("/accounts/manage/resend-activation-email/",values,true)
  
          if(api.isSuccessful(response)){
            setTimeout(() => {
              toast.success('Resend email successfully!');
            }, 0);
          }
          setIsLoading(false);
    }
    return (
        <Container className={classes.containerr}>
            <img alt='logo' src={assets.logo} width="130" height="100" />
            <Typography className={classes.confirmEmail}>Confirm your Email</Typography>
            <Typography variant='body2' gutterBottom className={classes.para}>Please check your inbox for a confirmation email. Click the link in the email to confirm your email address</Typography>
            <Typography variant='body2' gutterBottom className={classes.para}>After you confirm click Continue</Typography>
            <Button onClick={handleClick} className={classes.reSend}>Re-send confirmation email</Button>

            <div>

                <Button onClick={() => { navigate('/auth/login') }} variant='contained' style={{ background: '#198754', borderColor: '#198754', color: '#fff' }} >Continue</Button>
                <Button onClick={() => { navigate('/auth/login') }} variant='contained' style={{ background: '#0d6efd', borderColor: '#0d6efd', color: '#fff', marginLeft: 5 }}>Back to Sign in</Button>

            </div>
        </Container>
    )
}

export default ConfirmEmail
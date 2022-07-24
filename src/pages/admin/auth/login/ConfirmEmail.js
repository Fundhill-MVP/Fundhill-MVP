import { Button, Container, Typography } from '@material-ui/core';
import assets from '../../../../components/assets';
import React from 'react'
import useStyles from './styles';
import { Link } from 'react-router-dom';

const ConfirmEmail = () => {
    const classes = useStyles();

    return (
        <Container className={classes.containerr}>
            <img alt='logo' src={assets.logo} width="130" height="100" />
            <Typography className={classes.confirmEmail}>Confirm your Email</Typography>
            <Typography variant='body2' gutterBottom className={classes.para}>Please check your inbox for a confirmation email. Click the link in the email to confirm your email address</Typography>
            <Typography variant='body2' gutterBottom className={classes.para}>After you confirm click Continue</Typography>
            <Link className={classes.reSend}>Re-send confirmation email</Link>

            <div>

                <Button variant='contained' style={{ background: '#198754', borderColor: '#198754', color: '#fff' }} >Continue</Button>
                <Button variant='contained' style={{ background: '#0d6efd', borderColor: '#0d6efd', color: '#fff', marginLeft: 5 }}>Back to Sign in</Button>

            </div>
        </Container>
    )
}

export default ConfirmEmail
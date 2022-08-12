import { makeStyles } from '@material-ui/styles';
import { Typography } from '@mui/material';
import React from 'react';

const useStyles = makeStyles(() => ({
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 15,

    },
    span: {
        color: 'blue',
    }
}))

const EmailInstructions = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography>Check your email for a 7 digit token we sent</Typography>
            <Typography>Token sent to: <span className={classes.span}>whateverthemailis@yahoo.com</span></Typography>
        </div>
    )
}

export default EmailInstructions
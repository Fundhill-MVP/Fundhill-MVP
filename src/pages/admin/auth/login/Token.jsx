import { makeStyles } from '@material-ui/styles'
import { Button, TextField, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
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
}))
const Token = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/auth/reset_password')
    }
    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <form onClick={handleSubmit} className={classes.form}>
                    {/* <Typography variant='h5' gutterBottom className={classes.title}></Typography> */}
                    <TextField className={classes.input} variant='outlined' fullWidth type='number' placeholder='Insert your token' />
                    <Button className={classes.btn} variant='contained' fullWidth>Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default Token
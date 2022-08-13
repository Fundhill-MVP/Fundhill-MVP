import { makeStyles } from '@material-ui/styles'
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
        marginTop: '10px !important'
    },
    btn: {
        marginTop: '10px !important'
    }
}))
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
    // const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <form className={classes.form}>
                    <Typography variant='h5' gutterBottom className={classes.title}>Reset Password?</Typography>
                    <TextField className={classes.input} variant='outlined' fullWidth type='password' placeholder='Insert New Password' />
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
                    <Button className={classes.btn} variant='contained' fullWidth>Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, IconButton, InputAdornment, Select, Tab } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './styles';

const SignupModal = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [showCpassword, setShowCpassword] = useState(false);
    const handleShowCpassword = () => setShowCpassword(!showCpassword);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <Button variant="text" classes={{ root: classes.tab }} onClick={handleClickOpen}>
                New User
            </Button> */}
            <Tab label="New User" classes={{ root: classes.tab }} onClick={handleClickOpen} />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sign up is easy, it only take Few steps
                    </DialogContentText>
                    <form >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="first_name"
                            placeholder='First Name'
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="last_name"
                            placeholder='Last Name'
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="co_op_name"
                            placeholder="Full Co-operation/Organisation Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="email"
                            placeholder="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="phone"
                            placeholder="Enter your phone number"
                            type="number"
                            fullWidth
                            variant="outlined"
                        />

                        <FormControl style={{ marginTop: 2, width: '100%' }} className={classes.textField}>
                            {/* <InputLabel id="demo-select-small">Company Type</InputLabel> */}
                            <Select
                                labelid="demo-select-small"
                                id="demo-select-small"
                                name="org_type"
                                label="Company Type"
                            // options={orgs}
                            />
                        </FormControl>

                        <TextField
                            margin="dense"
                            id="address"
                            placeholder="Address location of company"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="bvn"
                            placeholder="BVN"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="password"
                            placeholder="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            margin="dense"
                            id="confirm_password"
                            placeholder="Confirm password"
                            type="password"
                            fullWidth
                            variant="outlined"

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
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='success'>Create Account</Button>
                    <Button variant='outlined' color='secondary' onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SignupModal
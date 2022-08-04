import { Box, Button, Divider, Fade, IconButton, Modal, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import useStyles from '../styles';
import Backdrop from '@mui/material/Backdrop';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AllmarketerModal = ({ profile }) => {
    const classes = useStyles();

    const [lock, setUnlock] = useState(false);
    const handleUnlock = () => setUnlock(true);
    const handleLock = () => setUnlock(false);
    return (
        <div>
            <Button onClick={handleUnlock}>{profile ? 'View Profile' : 'Edit Profile'}</Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={lock}
                onClose={handleLock}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={lock}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Marketer ID
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLock}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />
                        <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Fund Marketer</Typography>

                        {profile ? (

                            <>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <img
                                        className={classes.profileImage}
                                        src="https://i.ytimg.com/vi/K0u_kAWLJOA/maxresdefault.jpg"
                                        alt="profile"
                                    />
                                    <Button variant='contained' style={{ background: 'red', marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                        Delete
                                    </Button>
                                </div>
                            </>

                        ) : (

                            <>
                                <form style={{ display: 'flex', flexDirection: 'column' }}>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>First Name</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='First Name' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Middle Name</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Middle Name' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Last Name</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Last Name' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Email</Typography></div>
                                        <TextField fullWidth variant='outlined' type="email" name="" size='small' placeholder='Email' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Phone</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="" size='small' placeholder='Phone Number' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Marketer</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Marketer' required />

                                    </div>

                                    <Button variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                        Update
                                    </Button>
                                </form>

                            </>
                        )}

                        <Divider style={{ marginTop: 40 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                            <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default AllmarketerModal
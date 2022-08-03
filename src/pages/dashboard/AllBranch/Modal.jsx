import { Backdrop, Box, Button, Divider, Fade, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
// import { makeStyles } from "@material-ui/styles";
import useStyles from '../styles';
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



const AllModal = ({ updates }) => {

    const [lock, setUnlock] = useState(false);
    const handleUnlock = () => setUnlock(true);
    const handleLock = () => setUnlock(false);
    const classes = useStyles();

    return (
        <div>
            <Button onClick={handleUnlock}>{updates ? 'Delete' : 'Update'}</Button>

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
                            {updates ? 'Confirm Delete of Leasson Teacher' : 'branch ID'}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLock}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />
                        {updates ? (
                            <>
                                <Typography style={{ fontWeight: 500, marginTop: 10, marginBottom: 10, marginLeft: 10, textAlign: 'center' }}>Are you sure you want to delete this branch?</Typography>

                                <Divider style={{ marginTop: 40 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                                    <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                                    <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none', background: 'red', marginLeft: 5 }}>Delete</Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Edit branch Profile</Typography>

                                <form style={{ display: 'flex', flexDirection: 'column' }}>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Name</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Branch Address' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Branch Address</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Branch Address' required />

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
                        {!updates &&
                            (
                                <>
                                    <Divider style={{ marginTop: 40 }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                                        <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                                    </Box>
                                </>
                            )
                        }

                    </Box>
                </Fade>
            </Modal>

            {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openn}
        onClose={handleLock}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={openn}>
            <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Confirm Delete of Leasson Teacher
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <IconButton onClick={handleLock}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Divider style={{ marginTop: 40 }} />

                <Typography style={{ fontWeight: 500, marginTop: 10, marginBottom: 10, marginLeft: 10, textAlign: 'center' }}>Are you sure you want to delete this branch?</Typography>

                <Divider style={{ marginTop: 40 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                    <Button onClick={handleClosee} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                    <Button onClick={handleClosee} variant="contained" style={{ textTransform: 'none', background: 'red', marginLeft: 5 }}>Delete</Button>
                </Box>
            </Box>
        </Fade>
    </Modal> */}
        </div>
    )
}

export default AllModal
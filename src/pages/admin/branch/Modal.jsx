import {useState}  from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, TextField,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from './styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function OptionModal({ del }) {
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    // modal
    const [openn, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClosee = () => setOpen(false);
    // second modal
    const [lock, setUnlock] = useState(false);
    const handleUnlock = () => setUnlock(true);
    const handleLock = () => setUnlock(false);

    return (
        <div>
            <Button style={{ color: 'black', textTransform: 'none' }} onClick={handleOpen} >{del ? `Delete` : `Update`}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {del ? (
                            <>
                                <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                                    Confirm delete of lesson teacher
                                </Typography>

                                <Divider />

                                <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2 }} gutterBottom>
                                    Are you sure you want to delete this branch?
                                </Typography>

                                <Divider />
                                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button style={{ background: 'gray', color: 'white' }} >Delete</Button>
                                    <Button style={{ background: 'red', color: 'white', marginLeft: 5 }}>Delete</Button>
                                </div>
                            </>
                        ) :

                            (


                                <>
                            {/* <Button >Open modal</Button> */}
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={openn}
                                onClose={handleClosee}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={openn}>
                                    <Box sx={style}>
                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                            Fund Josephine Istifanius Wallet
                                        </Typography>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                            <IconButton onClick={handleClosee}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                        <Divider style={{ marginTop: 40 }} />
                                        <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Fund Marketer</Typography>

                                        <form style={{ display: 'flex', flexDirection: 'column' }}>

                                            <div className={classes.formDiv}>
                                                <div className={classes.divTypo}><Typography>Amount</Typography></div>
                                                <TextField fullWidth variant='outlined' type="number" name="" size='small' placeholder='Amount' required />

                                            </div>
                                            <Button variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                Fund
                                            </Button>
                                        </form>
                                        <Divider style={{ marginTop: 40 }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                                            <Button onClick={handleClosee} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                                        </Box>
                                    </Box>
                                </Fade>
                            </Modal>

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

                                        <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Edit marketer Profile</Typography>

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

                                        <Divider style={{ marginTop: 40 }} />
                                        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                                            <Button onClick={handleClosee} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                                        </Box> */}
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                                            <Button onClick={handleClosee} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                                        </Box>
                                    </Box>
                                </Fade>
                            </Modal>
                        </>
                            )
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, TextField } from '@mui/material';
import useStyles from '../styles';

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

                                    <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                                        Branch ID
                                    </Typography>

                                    <Divider />

                                    <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }}>
                                        Edit branch Profile
                                    </Typography>

                                    <form style={{ display: 'flex', flexDirection: 'column' }}>

                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Name</Typography></div>
                                            <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Lesson teacher' required />

                                        </div>

                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Branch address</Typography></div>
                                            <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Address' required />

                                        </div>

                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Marketer</Typography></div>
                                            <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Name of marketer' required />

                                        </div>

                                        <Button variant='contained' style={{ background: 'green', marginTop: 10, alignSelf: 'center' }}>
                                            Update
                                        </Button>
                                    </form>
                                </>
                            )
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

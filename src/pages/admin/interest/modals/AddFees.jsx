import { Backdrop, Box, Button, Divider, Fade, IconButton, Modal, TextField, Typography } from '@mui/material'
import React from 'react';
import useStyles from '../styles';
import CloseIcon from '@mui/icons-material/Close';


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

const AddFees = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant='contained'
                disableElevation
                style={{ marginLeft: 20, textTransform: 'none' }}
                onClick={handleOpen}>
                Add Fees
            </Button>
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
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Add Fees
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 10 }} />

                        <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Charge Fee</Typography>

                        <form style={{ display: 'flex', flexDirection: 'column' }}>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Fee Name</Typography></div>
                                <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Fee Name' required />

                            </div>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Percentage (%)</Typography></div>
                                <TextField fullWidth variant='outlined' type="number" name="" size='small' placeholder='Percentage (%)' required />

                            </div>

                            <Button variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                ADD
                            </Button>
                        </form>

                        <Divider style={{ marginTop: 40 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                            <Button onClick={handleClose} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default AddFees
import { Backdrop, Box, Button, Divider, Fade, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
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
    display: 'flex',
    flexDirection: 'column'
};
const ActionButton = () => {
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
                Disburse Loan
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
                            Disburse Loan
                        </Typography>
                        <Divider style={{ marginTop: 10 }} />

                        <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Enter Disbursement Date</Typography>
                        <form style={{ display: 'flex', flexDirection: 'column' }} >
                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Disburse Date</Typography></div>
                                <TextField fullWidth variant='outlined' type="date" name="name" size='small' placeholder='mm/dd/yyyy' required />

                            </div>
                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>First Repayment Date</Typography></div>
                                <TextField fullWidth variant='outlined' type="date" name="name" size='small' placeholder='mm/dd/yyyy' required />

                            </div>

                            <Button variant='contained' fullWidth style={{ textTransform: 'none' }}>Disburse</Button>
                        </form>

                        <Divider style={{ marginTop: 10 }} />
                        <Button onClick={handleClose} style={{ background: 'gray', color: 'white', alignSelf: 'flex-end', marginTop: 10 }}>Close</Button>
                    </Box >
                </Fade >
            </Modal >
        </div >

    )
}

export default ActionButton
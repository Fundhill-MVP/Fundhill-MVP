import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

export default function ActionButton({ del }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button style={{ textTransform: 'none' }} variant='contained' onClick={handleOpen} >View</Button>
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
                        <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                            Customer ID
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider />

                        <img className={classes.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMltxBUZCeJjJCrE18S0PZktyxZyhJMXyPuc9fc9zRU-Qi6sm9lv9UaStBK6m77lgsO7o&usqp=CAU" alt="" />

                        <Divider />
                        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" style={{ textTransform: 'none', marginRight: 5 }} >Activate</Button>
                            <Button style={{ background: 'gray', color: 'white', textTransform: 'none' }} >Deactivate</Button>
                            <Button style={{ background: 'red', color: 'white', marginLeft: 5, textTransform: 'none' }}>Delete</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

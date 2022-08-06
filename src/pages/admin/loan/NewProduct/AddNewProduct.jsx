import { Box, Button, Divider, Fade, Modal, TextField, Typography } from '@mui/material';
import useStyles from '../styles';
import Backdrop from '@mui/material/Backdrop';

import React from 'react';

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
    display: 'flex',
    flexDirection: 'column',

};
const AddNewProduct = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant='contained' style={{ textTransform: 'none', marginLeft: 20 }} onClick={handleOpen} >Add Product</Button>
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
                            Add New Product
                        </Typography>

                        <Divider />

                        <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2, fontWeight: 600 }} gutterBottom>
                            Product
                        </Typography>

                        <form style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Product Name</Typography></div>
                                <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Product Name' required />

                            </div>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Product Interest (%)</Typography></div>
                                <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Product Interest (%)' required />

                            </div>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Mgt Charges (%)</Typography></div>
                                <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Mgt Charges (%)' required />

                            </div>

                            <Button variant='contained' fullWidth style={{ background: 'green', marginTop: 10, alignSelf: 'center' }}>
                                Add
                            </Button>
                        </form>

                        <Divider />
                        <Button variant='contained' onClick={handleClose} style={{ background: 'gray', marginTop: 10, alignSelf: 'flex-end' }}>
                            Close
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default AddNewProduct
import { Backdrop, Box, Button, Divider, Fade, IconButton, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Formik, Form } from "formik";
import CloseIcon from '@mui/icons-material/Close';
import useStyles from '../styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};

const TargetedSavingsModal = () => {
    const classes = useStyles();
    // modal
    const [lock, setUnlock] = useState(false);
    const handleUnlock = () => setUnlock(true);
    const handleLock = () => setUnlock(false);

    return (
        <div>
            <Button variant='text' style={{ color: '#000', textTransform: 'none', padding: 0, fontSize: '1rem', fontWeight: 200 }} onClick={handleUnlock}>Targeted Savings</Button>

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
                            User ID
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLock}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />

                        <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Add Targeted Savings Plan</Typography>

                        <>
                            <Formik

                            >
                                <Form style={{ display: 'flex', flexDirection: 'column' }} >
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Name3</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="name" size='small' />

                                    </div>
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Frequency</Typography></div>
                                        <Select
                                            size="small"
                                            fullWidth
                                            label="Select One"
                                            name="frequency"
                                            options='{frequency}'
                                        />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Amount</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="amount" size='small' />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Amount Per Cycle</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="amount_per_cycle" size='small' />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Duration in months</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="duration_in_months" size='small' />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Savings Plan</Typography></div>
                                        <Select
                                            size='small'
                                            fullWidth
                                            label="Select One"
                                            name="plan_type"
                                            options='{savingsPlan}'
                                        />

                                    </div>
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Interest Rate</Typography></div>
                                        <TextField
                                            select={true}
                                            label="Select One"
                                            name="interest_rate"
                                            fullWidth
                                            variant='outlined'
                                        >

                                            <MenuItem value='value' > string name </MenuItem>
                                        </TextField>

                                    </div>
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Charges Fee</Typography></div>
                                        <TextField
                                            select={true}
                                            fullWidth
                                            name="fee"
                                            variant='outlined'
                                            label="Select One"
                                        >

                                            <MenuItem value='just value' > string </MenuItem>

                                        </TextField>

                                    </div>
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Fixed Amount</Typography></div>
                                        <Select
                                            size='small'
                                            fullWidth
                                            name="fixed_amount"
                                            options='just somthing'
                                            label="Choose One"
                                        />
                                    </div>


                                    <Button type="submit" variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                        Submit
                                    </Button>
                                </Form>
                            </Formik>
                        </>
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

export default TargetedSavingsModal
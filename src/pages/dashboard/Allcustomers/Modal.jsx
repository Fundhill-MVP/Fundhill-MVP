import { Box, Button, Divider, IconButton, MenuItem, Modal, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useStyles from '../styles';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@material-ui/styles';



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


// select input
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const AllCustomersModal = ({ edit }) => {
    const classes = useStyles();

    // modal
    const [locks, setUnlocks] = useState(false);
    const handleUnlocks = () => setUnlocks(true);
    const handleLocks = () => setUnlocks(false);


    // select input

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <div>
            <Button onClick={handleUnlocks}>{edit ? 'Edit Profile' : 'View Profile'}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={locks}
                onClose={handleLocks}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={locks}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Customer ID
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLocks}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />

                        {edit && (
                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Edit Customer Profile</Typography>
                        )}

                        {edit ? (
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
                                        <div className={classes.divTypo}><Typography>Business Address</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Business Address' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Residential Address</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Residential Address' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Marketer</Typography></div>
                                        <Select
                                            fullWidth
                                            value={personName}
                                            onChange={handleChange}
                                            // input={<OutlinedInput label="Name" />}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, personName, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </div>

                                    <Button variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                        Update
                                    </Button>
                                </form>

                            </>
                        ) : (
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
                        )}

                        <Divider style={{ marginTop: 40 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                            <Button onClick={handleLocks} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default AllCustomersModal
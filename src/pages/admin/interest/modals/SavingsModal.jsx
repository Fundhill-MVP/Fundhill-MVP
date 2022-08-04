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
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
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
const SavingsModal = ({ fund, widthdraw }) => {
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

            {fund && (
                <Button onClick={handleUnlocks}>Fund Wallet</Button>
            )}

            {widthdraw && (
                <Button onClick={handleUnlocks}>Widthdraw</Button>
            )}

            {!fund && !widthdraw ? (
                <Button onClick={handleUnlocks}>Add Plan</Button>

            ) : ''}
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
                            {fund ? 'Fund Vic Gyang Wallet' : ' Customer ID'}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLocks}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />
                        {fund && (
                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Are you sure you want to fund this account</Typography>
                        )}

                        {widthdraw && (
                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Withdraw</Typography>
                        )}

                        {!fund && !widthdraw ? (
                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Deposite</Typography>
                        ) : ''}

                        {!fund && !widthdraw ? (
                            <>

                                <form style={{ display: 'flex', flexDirection: 'column' }}>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Frequency</Typography></div>
                                        <Select
                                            size="small"
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

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Amount</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="" size='small' placeholder='Amount' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Amount Cycle</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="" size='small' placeholder='Amount Cycle' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Duration</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="" size='small' placeholder='1-12' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Savings Plan</Typography></div>
                                        <Select
                                            size='small'
                                            fullWidth
                                            value={personName}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Select saving type" />}
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
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Interest Rate</Typography></div>
                                        <Select
                                            size='small'
                                            fullWidth
                                            value={personName}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Interest Rate" />}
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
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Charges Fee</Typography></div>
                                        <Select
                                            size='small'
                                            fullWidth
                                            value={personName}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Charges Fee" />}
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
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Fixed Amount</Typography></div>
                                        <Select
                                            size='small'
                                            fullWidth
                                            value={personName}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Fixed Amount" />}
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
                                        Submit
                                    </Button>
                                </form>
                            </>
                        ) : ''}


                        {widthdraw && (
                            <>
                                <form style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Amount</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="" size='small' placeholder='Amount' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Savings Plan</Typography></div>
                                        <Select
                                            size="small"
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

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Reason</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Reason' required />

                                    </div>
                                    <Button variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                        Widthdraw
                                    </Button>
                                </form>

                            </>
                        )}

                        {fund && (
                            <>
                                <form style={{ display: 'flex', flexDirection: 'column' }}>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Depositor</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Depositor' required />

                                    </div>


                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Amount</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="" size='small' placeholder='Amount' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Savings Plan</Typography></div>
                                        <Select
                                            size="small"
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
                                        Fund
                                    </Button>
                                </form>
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

export default SavingsModal
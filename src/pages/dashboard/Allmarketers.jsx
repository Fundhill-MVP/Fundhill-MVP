import { Divider, Grid, TableContainer } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { css } from "@emotion/react";
import useStyles from './styles'
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { BounceLoader } from "react-spinners";
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Chip
} from "@material-ui/core";
//   import useStyles from "./styles";
import { Fragment, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";

// Modal
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { IconButton, Paper, TextField } from "@mui/material";
import { textTransform } from "@mui/system";

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


// const useStyles = makeStyles(theme => ({
//     tableOverflow: {
//         overflow: 'auto'
//     }
// }))
const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


// table
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(1, '2022-05-2', 15000, 'Cash', 'For Loan'),
    // createData('Ice cream sandwich', 237, 9.0, 37,),

];


const Allmarketers = () => {

    const classes = useStyles();
    let [color, setColor] = useState("#ADD8E6");
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
        <Fragment>
            <PageTitle title="Disbursed Loan" />
            <Grid container spacing={4}>

                {/* <div className="sweet-loading">
                    <BounceLoader color={color} l css={override} size={150} />
                </div> */}
                <Grid item xs={12}>
                    <Widget title="Disburse Loan Details" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                        <Table className="mb-0">
                            <TableHead>
                                <TableRow>
                                    <TableCell >Marketer ID</TableCell>
                                    <TableCell >Full Name</TableCell>
                                    <TableCell >Telephone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="pl-3 fw-normal">40</TableCell>
                                    <TableCell>	Lerit Zachariah</TableCell>
                                    <TableCell>8061516479</TableCell>
                                    <TableCell>zachariahlerit@gmail.com</TableCell>
                                    <TableCell>AGENT</TableCell>
                                    <TableCell>
                                        <div>
                                            <Button
                                                id="demo-customized-button"
                                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                variant="contained"
                                                disableElevation
                                                onClick={handleClick}
                                                endIcon={<KeyboardArrowDownIcon />}
                                                style={{ textTransform: 'none' }}
                                            >
                                                Action
                                            </Button>
                                            <StyledMenu
                                                id="demo-customized-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'demo-customized-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                {/* <MenuItem onClick={handleOpen} history disableRipple>
                                                    Action
                                                </MenuItem> */}
                                                <MenuItem onClick={handleUnlock} disableRipple>
                                                    Edit Profile
                                                </MenuItem>
                                                <MenuItem onClick={handleOpen} history disableRipple>
                                                    Fund Wallet
                                                </MenuItem>
                                            </StyledMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Widget>
                </Grid>
            </Grid>

            <div>
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
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                                <Button onClick={handleClosee} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </Fragment>

    )
}

export default Allmarketers
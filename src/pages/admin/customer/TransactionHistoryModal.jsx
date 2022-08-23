import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { css } from "@emotion/react";
import {BounceLoader} from "react-spinners";
import { trigger } from '../../../events';
import { api  } from "../../../services";
import useStyles from "./styles";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
  align-items: center;
`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};



function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
]

const TransactionHistoryModal = ({customerId}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    let [loading, setLoading] = React.useState(true);
    let [color, setColor] = React.useState("#ADD8E6");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    
    const allTransactions = async () => {
        setIsLoading(true)
      const res = await api.service().fetch(`/dashboard/transactions/?_from=${customerId}`, true);
      console.log(res.data)
      if (api.isSuccessful(res)) {
        setData(res.data.results)
      }
      setIsLoading(false);

    }

    React.useEffect(() => {
        allTransactions();
      }, [customerId])


    return (
        <div>
            <Button variant="text" onClick={handleClickOpen}>
                Transaction History
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Transaction History
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right"> Date </TableCell>
                                    <TableCell align="right"> Amount </TableCell>
                                    <TableCell align="right"> Depositor </TableCell>
                                    <TableCell align="right">Agent</TableCell>
                                    <TableCell align="right"> Description </TableCell>
                                    <TableCell align="right"> Status </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                                        isLoading ?
                                                        (
                                            
                                            
                                                          <div className={classes.sweet_loading}>
                                                            <BounceLoader color={color} loading={loading} css={override} size={150} />
                                                          </div>
                                            
                                                        ):
                                                        (
                                                            data.map((tranx) => (
                                                                <TableRow key={tranx.id}>
                                                                    <TableCell component="th" scope="row">
                                                                        {tranx.id}
                                                                    </TableCell>
                                                                    <TableCell align="right">{tranx?.created_date}</TableCell>              
                                                                    <TableCell align="right">{tranx?.amount}</TableCell>
                                                                    <TableCell align="right">{tranx._from?.first_name}</TableCell>
                                                                    <TableCell align="right">{tranx._from?.agent?.last_name}</TableCell>
                                                                    <TableCell align="right">{tranx?.description}</TableCell>
                                                                    <TableCell align="right">{tranx.status}</TableCell>
                                                                </TableRow>
                                                            ))         
                                                        )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}

export default TransactionHistoryModal
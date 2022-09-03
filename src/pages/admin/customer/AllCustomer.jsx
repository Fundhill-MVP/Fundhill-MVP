import React, { Fragment, useState, useEffect, useContext } from "react";
import { Divider, Grid, MenuItem } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { css } from "@emotion/react";
import useStyles from './styles'
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Chip
} from "@material-ui/core";
//   import useStyles from "./styles";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import { api } from '../../../services';
import { Context } from "../../../context/Context";
import { BounceLoader } from "react-spinners";
import ActionButton from './ActionButton';
import {on} from "../../../events";

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



function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const AllActiveCustomer = () => {

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    let [color, setColor] = useState("#ADD8E6");
    const { user } = useContext(Context);

    const activeCustomer = async () => {
        setIsLoading(true)

        const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=VERIFIED", true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
            setData(res.data.results)
        }
        setIsLoading(false);
    }


    useEffect(() => {
        activeCustomer();

    }, [])
    on("reRenderActiveCustomer",activeCustomer);

    return (
        <Fragment>
            <PageTitle title={`${user.data.organisation_name}`} />
            <Grid container spacing={4}>
                {
                    isLoading ?
                        (
                            <div className={classes.sweet_loading}>
                                <BounceLoader color={color} l css={override} size={150} />
                            </div>
                        ) :
                        (
                            <Grid item xs={12}>
                                <Widget title="All Active Customers" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                                    <Table className="mb-0">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >ID</TableCell>
                                                <TableCell >Full Name</TableCell>
                                                <TableCell >Account Number</TableCell>
                                                <TableCell>Wallet Balance</TableCell>
                                                <TableCell>Telephone</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Marketer</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* <TableRow> */}
                                            {data.map((customer) => (
                                                <TableRow key={customer.id} >
                                                    <TableCell className="pl-3 fw-normal"> {customer.id} </TableCell>
                                                    <TableCell> {customer.first_name} {customer.last_name}	</TableCell>
                                                    <TableCell> {customer.bank_account_number} </TableCell>
                                                    <TableCell> {parseInt(customer.wallet.balance)} </TableCell>
                                                    <TableCell> {customer.phone} </TableCell>
                                                    <TableCell> {customer.email}	</TableCell>
                                                    <TableCell>	{customer.agent.first_name} </TableCell>
                                                    <TableCell>	<Button style={{ textTransform: 'none' }} variant="contained" disableElevation> {customer.status} </Button></TableCell>
                                                    <TableCell>
                                                        <ActionButton customerId={customer?.id} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {/* </TableRow> */}
                                        </TableBody>
                                    </Table>
                                </Widget>
                            </Grid>
                        )
                }


            </Grid>


        </Fragment>

    )
}

export default AllActiveCustomer
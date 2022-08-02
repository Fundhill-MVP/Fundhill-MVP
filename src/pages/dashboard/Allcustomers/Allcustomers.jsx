import { Divider, Grid, TableContainer } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { css } from "@emotion/react";
import useStyles from '../styles'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
import { Fragment } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import ActionButton from "./ActionButton";

// const useStyles = makeStyles(theme => ({
//     tableOverflow: {
//         overflow: 'auto'
//     }
// }))
// const override = css`
// display: block;
// margin: 0 auto;
// border-color: green;
// align-items: center;
// `;


// table
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(1, '2022-05-2', 15000, 'Cash', 'For Loan'),
    // createData('Ice cream sandwich', 237, 9.0, 37,),

];




const Allcustomers = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <PageTitle title="All Customers" />
            <Grid container spacing={4}>

                {/* <div className="sweet-loading">
                    <BounceLoader color={color} l css={override} size={150} />
                </div> */}
                <Grid item xs={12}>
                    <Widget title="Maketers" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                        <Table className="mb-0">
                            <TableHead>
                                <TableRow>
                                    <TableCell >ID</TableCell>
                                    <TableCell >Full Name</TableCell>
                                    <TableCell >Account Number</TableCell>
                                    <TableCell>Telephone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Marketer</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="pl-3 fw-normal">5</TableCell>
                                    <TableCell>	Steven Umar</TableCell>
                                    <TableCell>8061516479</TableCell>
                                    <TableCell>2348084395900</TableCell>
                                    <TableCell>	testcustomer@gmail.com</TableCell>
                                    <TableCell>	john</TableCell>
                                    <TableCell>	<Button style={{ textTransform: 'none' }} variant="contained" disableElevation>Approved</Button></TableCell>
                                    <TableCell>
                                        <ActionButton />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Widget>
                </Grid>
            </Grid>


        </Fragment>

    )
}

export default Allcustomers
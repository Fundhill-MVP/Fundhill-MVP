import { Grid } from "@material-ui/core";
import useStyles from './styles'
import Button from '@mui/material/Button';
import { BounceLoader } from "react-spinners";
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    // Chip
} from "@material-ui/core";
//   import useStyles from "./styles";
import { Fragment } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import ActionButton from "./ActionButtons/SavingsActionButton";

const SavingsPlan = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <PageTitle title="All Customers" />
            <Grid container spacing={4}>

                {/* <div className={classes.sweet_loading}>
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

export default SavingsPlan
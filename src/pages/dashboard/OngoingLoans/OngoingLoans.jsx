import { Grid } from "@material-ui/core";
import { css } from "@emotion/react";
import useStyles from '../styles'
// import { BounceLoader } from "react-spinners";
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    // Chip
} from "@material-ui/core";
//   import useStyles from "./styles";
import { Fragment, useState } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import ActionButton from "./ActionButton";

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


const OngoingLoans = () => {

    const classes = useStyles();
    // let [color, setColor] = useState("#ADD8E6");

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
                                    <TableCell >ID </TableCell>
                                    <TableCell >Loan Officer</TableCell>
                                    <TableCell >Client Names</TableCell>
                                    <TableCell>Account Number</TableCell>
                                    <TableCell>Client Contact</TableCell>
                                    <TableCell>Loan ID</TableCell>
                                    <TableCell>Principal</TableCell>
                                    <TableCell>Loan + Interest</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Payment Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="pl-3 fw-normal">23</TableCell>
                                    <TableCell>	Daniel Yusuf</TableCell>
                                    <TableCell>Yakuku John</TableCell>
                                    <TableCell>Account Number</TableCell>
                                    <TableCell>08080080808</TableCell>
                                    <TableCell>123456</TableCell>
                                    <TableCell>5000000</TableCell>
                                    <TableCell>	5400000</TableCell>
                                    <TableCell>Approved</TableCell>
                                    <TableCell>On-going loan</TableCell>
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

export default OngoingLoans
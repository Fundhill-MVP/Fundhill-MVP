import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { css } from "@emotion/react";
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

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))
const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;

const TotalWithdrawal = () => {
    const classes = useStyles();
    let [color, setColor] = useState("#ADD8E6");


    return (
        <Fragment>
            <PageTitle title="All Withdrawals Made Today" />
            <Grid container spacing={4}>

                {/* <div className="sweet-loading">
                    <BounceLoader color={color} l css={override} size={150} />
                </div> */}
                <Grid item xs={12}>
                    <Widget title="Withdrawals" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                        <Table className="mb-0">
                            <TableHead>
                                <TableRow>
                                    <TableCell >Transaction ID </TableCell>
                                    <TableCell >Date</TableCell>
                                    <TableCell >Amount</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Marketer</TableCell>
                                    <TableCell>Account Number</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="pl-3 fw-normal">1</TableCell>
                                    <TableCell>1-2-2022</TableCell>
                                    <TableCell>200000</TableCell>
                                    <TableCell>Smart Dev</TableCell>
                                    <TableCell>Tobi</TableCell>
                                    <TableCell>0000000443</TableCell>
                                    <TableCell>meaningfull</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Widget>
                </Grid>

            </Grid>
        </Fragment>
    )
}

export default TotalWithdrawal
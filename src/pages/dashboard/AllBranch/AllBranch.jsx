import { Grid, } from "@material-ui/core";
// import { css } from "@emotion/react";
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
import { Fragment } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";

// Modal
import * as React from 'react';
import BtnAction from "./BtnAction";

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
// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData(1, '2022-05-2', 15000, 'Cash', 'For Loan'),
//     // createData('Ice cream sandwich', 237, 9.0, 37,),
// ];


const AllBranch = () => {

    const classes = useStyles();

    return (
        <Fragment>
            <PageTitle title="Branch" />
            <Grid container spacing={4}>

                {/* <div className="sweet-loading">
                    <BounceLoader color={color} l css={override} size={150} />
                </div> */}
                <Grid item xs={12}>
                    <Widget title="All Collections of Branches" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                        <Table className="mb-0">
                            <TableHead>
                                <TableRow>
                                    <TableCell >Branch ID </TableCell>
                                    <TableCell >Branch Name</TableCell>
                                    <TableCell >Branch Location</TableCell>
                                    <TableCell>Head of Branch</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="pl-3 fw-normal">1</TableCell>
                                    <TableCell>	Leasson Teacher</TableCell>
                                    <TableCell>bukuru locus</TableCell>
                                    <TableCell>John onaks</TableCell>
                                    <TableCell>
                                        <BtnAction />
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

export default AllBranch
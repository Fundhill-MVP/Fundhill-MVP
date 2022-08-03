import { Grid } from "@material-ui/core";
import { css } from "@emotion/react";
import useStyles from './styles'
import { styled, alpha } from '@mui/material/styles';
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
import { Fragment, } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";

// Modal
import * as React from 'react';

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


// table
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(1, '2022-05-2', 15000, 'Cash', 'For Loan'),
    // createData('Ice cream sandwich', 237, 9.0, 37,),

];


const FixedSavingsRep = () => {

    const classes = useStyles();
    return (
        <Fragment>
            <PageTitle title="All Savings Plan Report" />
            <Grid container spacing={4}>

                {/* <div className="sweet-loading">
                    <BounceLoader color={color} l css={override} size={150} />
                </div> */}
                <Grid item xs={12}>
                    <Widget title="Fixed Savings" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
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
                                    <TableCell>	Tiger Nixon</TableCell>
                                    <TableCell>John Bull</TableCell>
                                    <TableCell>1234567890</TableCell>
                                    <TableCell>	Esusu</TableCell>
                                    <TableCell>08076895837</TableCell>
                                    <TableCell>$320,800</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Widget>
                </Grid>
            </Grid>
        </Fragment>

    )
}

export default FixedSavingsRep
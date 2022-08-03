import { Grid } from "@material-ui/core";
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
// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData(1, '2022-05-2', 15000, 'Cash', 'For Loan'),
//     // createData('Ice cream sandwich', 237, 9.0, 37,),

// ];


const Allmarketers = () => {
    const classes = useStyles();

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

export default Allmarketers
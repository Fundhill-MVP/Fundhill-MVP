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
import useStyles from "./styles";
import { Fragment, useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import { api } from '../../../services';


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

const TotalDeposits = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      setIsLoading(true)
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      const allDeposits = async () => {
        const res = await api.service().fetch(`/dashboard/transactions/?min_date=${today}&max_date=${today}&trx_type=DEPOSIT`, true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
          setData(res.data.results)
        }
        setIsLoading(false);

      }

      allDeposits();
    } catch (error) {
      console.log(error)
    }
  }, [])


  return (
    <Fragment>
      <PageTitle title="All Deposits made today" />
      <Grid container spacing={4}>

        <div className={classes.sweet_loading}>
          <BounceLoader color={color} l css={override} size={150} />
        </div>
        {
          isLoading ?
            (


              <div className={classes.sweet_loading}>
                <BounceLoader color={color} loading={loading} css={override} size={150} />
              </div>

            ) :
            (
              <Grid item xs={12}>
                <Widget title="Deposit" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >Transaction ID </TableCell>
                        <TableCell >Date</TableCell>
                        <TableCell >Amount</TableCell>
                        <TableCell>Depositors Name</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Marketer</TableCell>
                        <TableCell>Account Number</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((tranx) => (
                        <TableRow key={tranx?.id} >
                          <TableCell className="pl-3 fw-normal"> {tranx?.id} </TableCell>
                          <TableCell> {tranx?.created_date} </TableCell>
                          <TableCell> {tranx?.amount} </TableCell>
                          {/* <TableCell> {tranx?.depositor} </TableCell>
                                    <TableCell> {tranx?.customer} </TableCell>
                                    <TableCell> {tranx?.agent} </TableCell>
                                    <TableCell> {tranx?.customer.bank_account_number} </TableCell> */}
                          <TableCell> {tranx?.status} </TableCell>
                        </TableRow>
                      ))}
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

export default TotalDeposits
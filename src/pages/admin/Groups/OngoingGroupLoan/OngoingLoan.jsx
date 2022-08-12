import { Fragment, useEffect, useContext, useState } from 'react'
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { toast } from "react-toastify";
import { api } from '../../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { Context } from "../../../../context/Context";
import PageTitle from "../../../../components/PageTitle"
import Widget from "../../../../components/Widget/Widget";
import useStyles from './styles';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
} from "@material-ui/core";
import { Button } from '@mui/material';

import ActionButton from './OngoingButton';
import { on } from '../../../../events';


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function OngoingLoan() {

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);



  const allGroup = async () => {
    setIsLoading(true)
    const res = await api.service().fetch("/dashboard/group-loan/?is_disbursed=true", true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      setData(res.data.results)
    }
    setIsLoading(false);

  }

  useEffect(() => {
    allGroup();

  }, [])
  on("reRenderAllGroup",allGroup)



  return (
    <Fragment>
      <PageTitle title="Fundhill" />
      <Grid container spacing={4}>
        {
          isLoading ?
            (


              <div className={classes.sweet_loading}>
                <BounceLoader color={color} loading={loading} css={override} size={150} />
              </div>

            )
            :
            (
              <Grid item xs={12}>
                <Widget title="All Customers" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                {/* <SearchButton /> */}
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell > ID </TableCell>
                        <TableCell >Full Names </TableCell>
                        <TableCell > Amount + Interest </TableCell>
                        <TableCell > Account Number </TableCell>
                        <TableCell> Loan Product </TableCell>
                        <TableCell> Payback Date </TableCell>
                        <TableCell>  Day created </TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((customer) => (
                        <TableRow key={customer?.id}>
                          <TableCell className="pl-3 fw-normal">{customer?.id}</TableCell>
                          <TableCell>{customer?.group?.created_by?.first_name} {customer?.borrower?.last_name} </TableCell>
                          <TableCell>{customer?.amount_to_repay}</TableCell>
                          <TableCell>{customer?.group?.created_by?.bank_account_number}</TableCell>
                          <TableCell>{customer?.loan_product.name}</TableCell>
                          <TableCell>{customer?.final_due_date}</TableCell>
                          <TableCell>{customer?.date_created} </TableCell>
                          <TableCell>
                          <Button
                            variant='contained'
                            style={{ textTransform: 'none', fontSize: 12, background: 'red' }}>
                            {customer?.status}
                          </Button>
                        </TableCell>
                          <TableCell>
                            <ActionButton loanId={customer.id} />
                          </TableCell>
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

export default OngoingLoan
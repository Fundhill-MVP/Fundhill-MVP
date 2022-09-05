import { Fragment, useEffect, useContext, useState } from 'react'
import { Button } from '@mui/material';
// import "./Dashboard.css"
import { Formik, Form, Field } from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { toast } from "react-toastify";
import { api } from '../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { Context } from "../../../context/Context";
import PageTitle from "../../../components/PageTitle"
import Widget from "../../../components/Widget/Widget";
import useStyles from './styles';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
} from "@material-ui/core";
import ActionButton from './PendingModal';
import { on } from '../../../events';

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function DeletedCustomer() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false)
  let [loading, setloading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);



  const allPendingCustomer = async () => {
    setIsLoading(true)
    const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=DISABLED", true);
    if (api.isSuccessful(res)) {
      setData(res.data.results)
    }
    setIsLoading(false);

  }
  useEffect(() => {
    allPendingCustomer();
  }, [])
  on("reRenderPendingCustomer",allPendingCustomer)

  return (
    <Fragment>
      <PageTitle title={`${user.data.organisation_name}`} />
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
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell >Full Name </TableCell>
                        <TableCell >Account Number </TableCell>
                        <TableCell >Telephone </TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Marketer</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((customer) => (
                        <TableRow key={customer?.id}>
                          <TableCell className="pl-3 fw-normal">{customer?.id}</TableCell>
                          <TableCell>{customer?.first_name} {customer?.last_name} </TableCell>
                          <TableCell>{customer?.bank_account_number}</TableCell>
                          <TableCell>{customer?.phone}</TableCell>
                          <TableCell>{customer?.email}</TableCell>
                          <TableCell>{customer?.agent.first_name} </TableCell>
                          <TableCell>
                            <Button
                              variant='contained'
                              style={{ textTransform: 'none', fontSize: 12, background: 'red' }}>
                              {customer?.status}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <ActionButton customerId={customer?.id} />
                          </TableCell>
                        </TableRow>
                      ))
                      }
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

export default DeletedCustomer
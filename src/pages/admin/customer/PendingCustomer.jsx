import { Fragment, useEffect, useState, useContext } from 'react'

import { api } from '../../../services';
import { Context } from "../../../context/Context";
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import PageTitle from "../../../components/PageTitle/PageTitle"
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
import { Button } from '@mui/material';
import ActionButton from './PendingModal';

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function PendingCustomer() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false)
  let [loading, setloading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const [data, setData] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    try {
      setIsLoading(true)

      const allCustomer = async () => {
        const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=PENDING", true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
          setData(res.data.results)
        }
        setIsLoading(false);

      }
      allCustomer();

    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }

  }, [])


  return (
    <Fragment>
      <PageTitle title={`${user.data.organisation_name}`} />
      {
        isLoading ?
          (


            <div className={classes.sweet_loading}>
              <BounceLoader color={color} loading={loading} css={override} size={150} />
            </div>

          ) :
          (
            <Grid container spacing={4}>
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
                      <TableRow >
                        <TableCell className="pl-3 fw-normal">50</TableCell>
                        <TableCell>John Mike</TableCell>
                        <TableCell>000122234</TableCell>
                        <TableCell>09033020094</TableCell>
                        <TableCell>something@gmail.come</TableCell>
                        <TableCell>mohamed</TableCell>
                        <TableCell>
                          <Button
                            variant='contained'
                            style={{ textTransform: 'none', fontSize: 12, background: 'red' }}>
                            Not Approved
                          </Button></TableCell>
                        <TableCell>
                          <ActionButton />
                        </TableCell>
                      </TableRow>
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
            </Grid>
          )
      }

    </Fragment>
  )
}

export default PendingCustomer
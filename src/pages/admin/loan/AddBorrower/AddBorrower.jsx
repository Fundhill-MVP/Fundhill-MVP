import { Fragment, useEffect, useContext, useState } from 'react'
import { api } from '../../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { Context } from "../../../../context/Context";
import PageTitle from "../../../../components/PageTitle/PageTitle"
import Widget from "../../../../components/Widget/Widget";
import useStyles from '../styles';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
} from "@material-ui/core";
import CheckBox from './CheckBox';
import OptionModal from './Modal';

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function AddBorrower() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)

  const [customers, setCustomers] = useState([]);


  useEffect(() => {
    try {
        setIsLoading(true)

        const allCustomer = async() => {
          const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=VERIFIED",true);
          console.log(res.data)
          if(api.isSuccessful(res)){
            setCustomers(res.data.results)
          }
    
        }
        setIsLoading(false);

        allCustomer();
    } catch (error) {
        console.log(error);
        setIsLoading(false);

    }
  },[])


  return (
    <Fragment>
      <PageTitle title="Fundhill" />
      <Grid container spacing={4}>
        {
          isLoading ?
            (
              (


                <div className={classes.sweet_loading}>
                  <BounceLoader color={color} loading={loading} css={override} size={150} />
                </div>

                )

            )
            :
            (
              <Grid item xs={12}>
                <Widget title="All Customers" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >ID</TableCell>
                        <TableCell >Full Name</TableCell>
                        <TableCell>Account Number</TableCell>
                        <TableCell>Wallet Balance</TableCell>
                        <TableCell >Telephone </TableCell>
                        <TableCell>Email</TableCell>
                        {/* <TableCell >Group Loan</TableCell> */}
                        <TableCell>Single Loan</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers.map((customer) => (
                                    <TableRow key={customer.id} >
                                    <TableCell className="pl-3 fw-normal"> {customer.id} </TableCell>
                                    <TableCell> {customer.first_name} {customer.last_name}	</TableCell>
                                    <TableCell> {customer.bank_account_number} </TableCell>
                                    <TableCell> {customer.wallet.balance} </TableCell>
                                    <TableCell> {customer.phone} </TableCell>
                                    <TableCell> {customer.email}	</TableCell>
                                    {/* <TableCell><CheckBox /></TableCell> */}
                                    {/* <TableCell>	{customer.agent.first_name} </TableCell> */}
                                    <TableCell>
                                        <OptionModal customerId={customer?.id} />
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

export default AddBorrower
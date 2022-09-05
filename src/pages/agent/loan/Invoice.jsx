import { Box, Divider, Fab, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { Fragment, useEffect, useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import useStyles from './styles';
import PrintIcon from '@mui/icons-material/Print';
import { api } from '../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
// import { Context } from "../../../context/Context";

import { Button } from '@mui/material';


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Invoice = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  let [color, setColor] = useState("#ADD8E6");
  const [data, setData] = useState([]);

  const Print = () => {
    //console.log('print');  
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  console.log(id)

  useEffect(() => {
    try {
      setIsLoading(true)

      const allCustomer = async () => {
        const res = await api.service().fetch(`/dashboard/loan/?is_disbursed=true&id=${id}`, true);
        //  const res = await api.service().fetch(`/dashboard/loan/?is_disbursed=true`, true);
        console.log(res.data);
        if (api.isSuccessful(res)) {
          setData(res.data.results[0])
        }
        setIsLoading(false);
      }

      allCustomer();
    } catch (error) {
      console.log(error)
    }
  }, []);

  // const getCustomer = (id) => {
  //     const customer = data.filter(data => data.id === id);
  //     console.log(customer)
  //     setItem(customer[0])
  //     console.log(data);
  // }


  return (
    <Fragment>

      {
        isLoading ?
          (

            <div className={classes.sweet_loading}>
              <BounceLoader color={color} loading={loading} css={override} size={150} />
            </div>

          )
          :
          (
            data && (
              <>
                <PageTitle title="Fundhill" />
                <Paper className={classes.invoicePaper} id='printablediv'>
                <Box className={classes.invoiceBox1}>
                    <div>
                        <Typography style={{ fontWeight: 600, fontSize: '1.3rem' }}>FUNDHILL</Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography style={{ fontWeight: 600, }}>Invoice #</Typography>
                        <Typography> {data.time_stamp} </Typography>
                    </div>
                </Box>
                <Divider sx={{ mt: 5 }} />
                <Box sx={{ mt: 5 }} className={classes.invoiceBox1}>
                    <div>
                        <Typography style={{ fontWeight: 600, }}>Twitter, Inc.</Typography>
                        <Typography>795 Folsom Ave, Suite 600</Typography>
                        <Typography>San Francisco, CA 94107</Typography>
                        <Typography>P: (123) 456-7890</Typography>
                    </div>
                    <div >
                        <Typography>Loan Date: {data.date_created} </Typography>
                        <Typography>Loan Status: <small style={{ padding: 4, background: 'lightred', color: 'white', borderRadius: 4 }}> {data.status} </small></Typography>
                        <Typography>Loan ID: #{data.id} </Typography>
                    </div>
                </Box>

                <Box sx={{ mt: 5, border: '1px solid lightgray' }}>
                    <Table className="mb-0" >
                        <TableHead>
                            <TableRow>
                                <TableCell >#</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell > Account Number </TableCell>
                                <TableCell> Account officer </TableCell>
                                <TableCell> Principal </TableCell>
                                <TableCell> Product </TableCell>
                                <TableCell> Category </TableCell>
                                <TableCell> Disubursed Date </TableCell>
                                <TableCell> 1st Repayment </TableCell>
                                <TableCell> Frequency</TableCell>
                                <TableCell> Schedule </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell className="pl-3 fw-normal"> {data.id} </TableCell>
                                {/* <TableCell > {data.borrower.first_name} {data.borrower.last_name} </TableCell>
                                <TableCell> {data.borrower.bank_account_number} </TableCell> */}
                                <TableCell> {data.loan_officer.first_name} {data.loan_officer.last_name} </TableCell>
                                <TableCell> {data.amount} </TableCell>
                                <TableCell> {data.loan_product.name} </TableCell>
                                <TableCell> {data.category} </TableCell>
                                <TableCell> {data.time_stamp} </TableCell>
                                <TableCell> {data.date}</TableCell>
                                <TableCell> {data.payment_frequency} </TableCell>
                                <TableCell> {data.payment_schedule} </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>

                <Grid container sx={{ p: 2, mt: 5 }}>
                    <Grid item sm={12} xs={12} md={6}>
                        <Typography style={{ fontWeight: 600, }}>PAYMENT TERMS AND POLICIES</Typography>
                        <Typography style={{ color: 'grey', fontSize: '0.9rem', marginTop: 15 }}>We are delighted to inform your that your loan application has been approved by our management. In accordance with your application, we will grant your a sum of #50000- with interest rate of 2%. According to our terms and conditions, it is mandatory for your to pay the first installment of your Loan amounting to #150,000- within 4 weeks after we Dsiburse the principal amount to your bank account. Thereafter, you are supposed to make your weekly payment. Kindly go through the enclosed literature discussing the details of our TERMSand conditions and amortization rules. Incase you fail to abide by these rules, we will be authorized to take legal action.</Typography>
                    </Grid>
                    <Grid item sx={{ textAlign: 'right' }} sm={12} xs={12} md={6}>
                        <Typography>Amount Per Installement: {data.amount_per_installment} </Typography>
                        {/* <Typography>Discout: 12.9%</Typography>
                        <Typography>VAT: 12.9%</Typography> */}
                        <Divider sx={{ mt: 3, mb: 3 }} />
                        <Typography style={{ fontWeight: 900, fontSize: '1.3rem', }}>{data.amount_to_repay} {data.borrower.currency} </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 5, mb: 5 }} />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Fab onClick={Print} aria-label="like">
                        <PrintIcon />
                    </Fab>
                </Box>

            </Paper>
              </>
            )
          )
      }

    </Fragment>
  )
}

export default Invoice
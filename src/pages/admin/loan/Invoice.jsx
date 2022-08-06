import { Box, Divider, Fab, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import PageTitle from "../../../components/PageTitle";
import useStyles from './styles';
import PrintIcon from '@mui/icons-material/Print';
const Invoice = () => {
    const classes = useStyles();
    const Print = () => {
        //console.log('print');  
        let printContents = document.getElementById('printablediv').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
    return (
        <Fragment>
            <PageTitle title="Fundhill" />
            <Paper className={classes.invoicePaper} id='printablediv'>
                <Box className={classes.invoiceBox1}>
                    <div>
                        <Typography style={{ fontWeight: 600, fontSize: '1.3rem' }}>FUNDHILL</Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography style={{ fontWeight: 600, }}>Invoice #</Typography>
                        <Typography>2022-04-23654789</Typography>
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
                        <Typography>Loan Date: April 17, 2022</Typography>
                        <Typography>Loan Status: <small style={{ padding: 4, background: 'lightred', color: 'white', borderRadius: 4 }}>pending</small></Typography>
                        <Typography>Loan ID: #123456</Typography>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell className="pl-3 fw-normal">23</TableCell>
                                <TableCell >Emeka Slyvester</TableCell>
                                <TableCell>12345678.</TableCell>
                                <TableCell>John Bull</TableCell>
                                <TableCell>100000</TableCell>
                                <TableCell>Student Loan</TableCell>
                                <TableCell>Fixed</TableCell>
                                <TableCell>2022-04-17</TableCell>
                                <TableCell>	2022-04-24</TableCell>
                                <TableCell>Weekly</TableCell>
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
                        <Typography>Sub-total: 2930.00</Typography>
                        <Typography>Discout: 12.9%</Typography>
                        <Typography>VAT: 12.9%</Typography>
                        <Divider sx={{ mt: 3, mb: 3 }} />
                        <Typography style={{ fontWeight: 900, fontSize: '1.3rem', }}>#150,000.00 USD</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 5, mb: 5 }} />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Fab onClick={Print} aria-label="like">
                        <PrintIcon />
                    </Fab>
                </Box>

            </Paper>
        </Fragment>
    )
}

export default Invoice
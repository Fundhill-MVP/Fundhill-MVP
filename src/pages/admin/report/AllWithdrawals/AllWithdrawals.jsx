import { Grid } from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
import { css } from "@emotion/react";
import { BounceLoader, DotLoader } from "react-spinners";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../styles";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Context } from "../../../../context/Context";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Widget from "../../../../components/Widget/Widget";
import { api } from '../../../../services';
import { Box, Button, Divider, Fade, Modal, Typography, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { Formik, Form, Field } from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";

import { TextField } from '../../../../components/FormsUI';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',

};
const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;

const AllWithdrawals = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [btnLoading, setBtnLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  useEffect(() => {
    try {
      setIsLoading(true)

      const AllWithdrawals = async () => {
        const res = await api.service().fetch(`/dashboard/transactions/?min_date=${today}&max_date=${today}&trx_type=WITHDRAWAL`, true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
          setData(res.data.results)
        }
        setIsLoading(false);

      }

      AllWithdrawals();
    } catch (error) {
      console.log(error)
    }
  }, [])


  const initialFormState = () => ({
    min_date: "",
    max_date: "",
  });

  const validationSchema = yupObject().shape({
    min_date: yupString()
      .required("Minimum date is required"),
    max_date: yupNumber()
      .required("Maximum date is required"),
  });

  const get_deposit = async (values) => {
    try {
      // setBtnLoading(true);
      setIsLoading(true)
      console.log(values)

      const response = await api.service().fetch(`/dashboard/transactions/?min_date=${values.min_date}&max_date=${values.max_date}&trx_type=WITHDRAWAL`, true);

      if (api.isSuccessful(response)) {
        console.log(response.data.results);
        setTimeout(() => {
          handleClose()
          setData(response.data.results)
        }, 0);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    }
  }

  return (
    <Fragment>
      <PageTitle title={`${user.data.organisation_name}`} />
      <Grid container spacing={4}>

        <Grid item xs={12}>
          <Widget title="All Withdrawals" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <div>
              <Button variant='contained' style={{ textTransform: 'none', marginLeft: 20 }} onClick={handleOpen} >Search</Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                      <IconButton onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                      Transaction Date
                    </Typography>

                    <Divider />

                    <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2, fontWeight: 600 }} gutterBottom>
                      Enter Transaction Date
                    </Typography>

                    <Formik
                      initialValues={initialFormState()}
                      // validationSchema={validationSchema}
                      onSubmit={async (values, actions) => {
                        await get_deposit(values)
                      }}
                    >
                      <Form style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
                        <div className={classes.formDiv}>
                          <div className={classes.divTypo}><Typography>From </Typography></div>
                          <TextField fullWidth variant='outlined' type="date" name="min_date" size='small' />

                        </div>
                        <div className={classes.formDiv}>
                          <div className={classes.divTypo}><Typography>To </Typography></div>
                          <TextField fullWidth variant='outlined' type="date" name="max_date" size='small' />

                        </div>

                        {
                          isLoading ?
                            (<div className={classes.sweet_loading}>
                              <DotLoader color={color} loading={loading} css={override} size={80} />
                            </div>)
                            : (
                              <Button type="submit" variant='contained' fullWidth style={{ background: 'green', marginTop: 10, alignSelf: 'center' }}>
                                Search
                              </Button>
                            )
                        }

                      </Form>
                    </Formik>

                    <Divider />
                    <Button variant='contained' onClick={handleClose} style={{ background: 'gray', marginTop: 10, alignSelf: 'flex-end' }}>
                      Close
                    </Button>
                  </Box>
                </Fade>
              </Modal>
            </div>
            {
              isLoading ?
                (


                  <div className={classes.sweet_loading}>
                    <BounceLoader color={color} loading={loading} css={override} size={150} />
                  </div>

                ) :
                (
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >Transaction ID </TableCell>
                        <TableCell >Date</TableCell>
                        <TableCell >Amount</TableCell>
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
                          <TableCell> {tranx?._from?.first_name} {tranx?._from?.last_name} </TableCell>
                          <TableCell> {tranx?._from?.agent?.first_name} {tranx?._from?.agent.last_name} </TableCell>
                          <TableCell> {tranx?._from?.bank_account_number} </TableCell>
                          <TableCell> {tranx?.status} </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )
            }
          </Widget>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default AllWithdrawals
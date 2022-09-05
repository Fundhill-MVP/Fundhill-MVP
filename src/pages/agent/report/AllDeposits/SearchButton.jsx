import { Box, Button, Divider, Fade, Modal, Typography } from '@mui/material';
import useStyles from '../styles';
import Backdrop from '@mui/material/Backdrop';

import React from 'react';
import { Fragment, useEffect, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
// import "./Dashboard.css"
import { Formik, Form, Field } from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { toast } from "react-toastify";
import { api } from '../../../../services';
import { css } from "@emotion/react";
import { DotLoader } from "react-spinners";
import { Context } from "../../../../context/Context";
import PageTitle from "../../../../components/PageTitle/PageTitle"
import Widget from "../../../../components/Widget/Widget";
import { TextField } from '../../../../components/FormsUI';


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



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
const SearchButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);
  const navigate = useNavigate();




  useEffect(() => {
    try {
      setIsLoading(true)

      const newProduct = async () => {
        const products = await api
          .service()
          .fetch("/dashboard/loan-product", true);
        console.log(products.data.results)

        if ((api.isSuccessful(products))) {
          setData(products.data.results);
          setIsLoading(false)
        } else {
          setIsLoading(true)
        }
      }
      newProduct();
    } catch (error) {
      console.log(error)
    }

  }, [])

  const initialFormState = () => ({
    name: "",
    mgt_charges: 0,
    interest: 0,
  });

  const validationSchema = yupObject().shape({
    name: yupString()
      .required("Product name is required"),
    mgt_charges: yupNumber()
      .required("Managment Charges is required"),
    interest: yupNumber()
      .required("interest rate is required"),
  });

  const add_product = async (values) => {
    try {
      setIsLoading(true);
      console.log(values)

      const response = await api
        .service()
        .push("dashboard/loan-product/add/", values, true)

      if (api.isSuccessful(response)) {
        setTimeout(() => {
          handleClose()
          toast.success("Loan Product successfully created!");
          navigate("/admin/dashboard/loan/new_product", { replace: true });
        }, 0);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
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

            <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
              Transaction Date
            </Typography>

            <Divider />

            <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2, fontWeight: 600 }} gutterBottom>
              Enter Disbursement Date
            </Typography>

            <Formik
              initialValues={initialFormState()}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                await add_product(values)
              }}
            >
              <Form style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
                <div className={classes.formDiv}>
                  <div className={classes.divTypo}><Typography>Disburse Date</Typography></div>
                  <TextField fullWidth variant='outlined' type="date" name="name" size='small' />

                </div>
                <div className={classes.formDiv}>
                  <div className={classes.divTypo}><Typography>First Repayment Date</Typography></div>
                  <TextField fullWidth variant='outlined' type="date" name="name" size='small' />

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
  )
}

export default SearchButton
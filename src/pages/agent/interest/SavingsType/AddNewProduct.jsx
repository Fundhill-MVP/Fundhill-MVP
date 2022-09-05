import { Box, Button, Divider, Fade, Modal, Typography } from '@mui/material';
import useStyles from '../styles';
import Backdrop from '@mui/material/Backdrop';
import React from 'react';
import {  useEffect, useContext, useState } from 'react'
import { Formik, Form} from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { toast } from "react-toastify";
import { api } from '../../../../services';
import { css } from "@emotion/react";
import { DotLoader } from "react-spinners";
import { Context } from "../../../../context/Context";
import { TextField, Select } from '../../../../components/FormsUI';
import {trigger} from "../../../../events"

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const is_periodic = {
  "true": "True",
  "false": "False"
};


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
const AddNewProduct = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [btnLoading,setBtnLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);




  useEffect(() => {
    try {
      setIsLoading(true)

      const newProduct =  async() => {
        const products = api
          .service()
          .fetch("dashboard/savings-plan-type/", true);
        // console.log(products.data.results)

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
    marketer_earnings: 0,
    is_periodic: false,
    number_of_cycles_to_charge: 0
  });

  const validationSchema = yupObject().shape({
    name: yupString()
      .required("Savings product name is required"),
    marketer_earnings: yupNumber()
      .required("marketers fees is required"),
    is_periodic: yupString()
      .required("Savings product name is required"),
    number_of_cycles_to_charge: yupNumber()
      .required("number of cycles to charge is required"),
  });

  const add_product =  async(values) => {
  
      setBtnLoading(true);
      console.log(values)

      const response = await api
        .service()
        .push("/dashboard/savings-plan-type/add/", values, true)

      if (api.isSuccessful(response)) {
        setTimeout(() => {
          handleClose()
          toast.success("Savings product  successfully created!");
          trigger("reRenderSavingsType")
        }, 0);
      }
      setBtnLoading(false);

  }

  return (
    <div>
      <Button variant='contained' style={{ textTransform: 'none', marginLeft: 20 }} onClick={handleOpen} >Add Product</Button>
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
              Add New Product
            </Typography>

            <Divider />

            <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2, fontWeight: 600 }} gutterBottom>
              Product
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
                  <div className={classes.divTypo}><Typography>Product Name</Typography></div>
                  <TextField fullWidth variant='outlined' type="text" name="name" size='small' />

                </div>

                <div className={classes.formDiv}>
                  <div className={classes.divTypo}><Typography>Marketer Earning (%)</Typography></div>
                  <TextField fullWidth variant='outlined' type="number" name="marketer_earnings" size='small' />

                </div>

                <div className={classes.formDiv}>
                  <div className={classes.divTypo}><Typography>Number of Cycle to Charge (%)</Typography></div>
                  <TextField fullWidth variant='outlined' type="number" name="number_of_cycles_to_charge" size='small' />

                </div>

                <div className={classes.formDiv}>
                  <div className={classes.divTypo}><Typography>Is it Periodic</Typography></div>
                  <Select
                      size='small'
                      fullWidth
                      name="is_periodic"
                      options={is_periodic}
                      label="Choose One"
                  />
               </div>


                {
                  btnLoading ?
                    (<div className={classes.sweet_loading}>
                      <DotLoader color={color} loading={loading} css={override} size={80} />
                    </div>)
                    : (
                      <Button type="submit" variant='contained' fullWidth style={{ background: 'green', marginTop: 10, alignSelf: 'center' }}>
                        Add
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

export default AddNewProduct
import { Backdrop, Box, Button, Divider, Fade, IconButton, Modal,  Typography } from '@mui/material'
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import {Formik,Form} from "formik";
import {object as yupObject, string as yupString,number as yupNumber} from "yup";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import useStyles from '../styles';
import {TextField} from "../../../../components/FormsUI";
import { api  } from "../../../../services";



const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
  align-items: center;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddNewInterest = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isLoading, setIsLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [data, setData] = useState([]);
    const  navigate = useNavigate();






    const initialFormState = () => ({
        name: "",
        percentage: 0,
        minimum_time_in_months: 0,
      });

      const validationSchema = yupObject().shape({
        name: yupString()
        .required("What type of interest rate is this"),
        percentage: yupNumber()
        .required("Enter a percentage"),
        minimum_time_in_months: yupNumber()
        .required("minimum time in months"),
      });

      

      const add_interest = async(values) => {
        setBtnLoading(true);
        try {
            console.log(values)

            const response = await api
                  .service()
                  .push("/dashboard/interest-rates/add/",values,true)
    
            if(api.isSuccessful(response)){
              setTimeout( () => {
                    handleClose()
                toast.success("Interest rate successfully created!");
                navigate("/admin/dashboard/customer/interest_rate/");
              },0);
            }
            setBtnLoading(false);
        } catch (error) {
            console.log(error.message)
            setBtnLoading(false);
        }
   
  }

    return (
        <div>
            <Button variant='contained'
                disableElevation
                style={{ marginLeft: 20, textTransform: 'none' }}
                onClick={handleOpen}>
                Add Interest
            </Button>
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
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Add New Interest
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 10 }} />

                        <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Interest Rate</Typography>

                        <Formik 
                            initialValues={initialFormState()}
                            validationSchema={validationSchema}
                            onSubmit={async (values,actions) => {
                                await add_interest(values)
                            }}    
                        >
                            <Form style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Interest Name</Typography></div>
                                <TextField fullWidth variant='outlined' type="text" name="name" size='small' />

                            </div>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Percentage (%)</Typography></div>
                                <TextField fullWidth variant='outlined' type="number" name="percentage" size='small' />

                            </div>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Minimum Time in Month </Typography></div>
                                <TextField fullWidth variant='outlined' type="number" name="minimum_time_in_months" size='small' />

                            </div>

                            {
                                            btnLoading ? 
                                            ( <div className="sweet-loading">
                                                <DotLoader color={color} loading={loading} css={override}  size={80} />
                                                </div>)
                                            : (
                                                <Button type="submit" variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                    ADD
                                                </Button>
                                             )
                                        }
                       
                            </Form>
                        </Formik>
                        <Divider style={{ marginTop: 40 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                            <Button onClick={handleClose} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default  AddNewInterest
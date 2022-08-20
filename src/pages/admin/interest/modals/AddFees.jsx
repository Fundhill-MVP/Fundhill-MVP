import React,{useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import {Formik,Form} from "formik";
import {object as yupObject, string as yupString,number as yupNumber} from "yup";
import { Backdrop, Box, Button, Divider, Fade, IconButton, Modal,  Typography } from '@mui/material'
import useStyles from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import { api  } from "../../../../services";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import {TextField} from "../../../../components/FormsUI"
import { trigger } from '../../../../events';

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

const AddFees = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [btnLoading,setBtnLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [data, setData] = useState([]);
    const  navigate = useNavigate();


    const initialFormState = () => ({
        name: "",
        percentage: 0,
      });

      const validationSchema = yupObject().shape({
        name: yupString()
        .required("What type of interest rate is this"),
        percentage: yupNumber()
        .required("Enter a percentage"),
      });


    const add_fee = async(values) => {
        setBtnLoading(true);

        try {
            console.log(values)

            const response = await api
                  .service()
                  .push("/dashboard/fees/add/",values,true)
    
            if(api.isSuccessful(response)){
              setTimeout( () => {
                trigger("reRenderFees")
                handleClose()
                toast.success("Fees created successfully!");
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
                Add Fees
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
                            Add Fees
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 10 }} />

                        <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Charge Fee</Typography>

                        <Formik
                            initialValues={initialFormState()}
                            validationSchema={validationSchema}
                            onSubmit={async (values,actions) => {
                                    await add_fee(values)
                                    }}
                        >
                            <Form style={{ display: 'flex', flexDirection: 'column' }} >
                                <div className={classes.formDiv}>
                                    <div className={classes.divTypo}><Typography>Fee Name</Typography></div>
                                    <TextField fullWidth variant='outlined' type="text" name="name" size='small' placeholder='Fee Name' required />

                                </div>

                                <div className={classes.formDiv}>
                                    <div className={classes.divTypo}><Typography>Percentage (%)</Typography></div>
                                    <TextField fullWidth variant='outlined' type="number" name="percentage" size='small' placeholder='Percentage (%)' required />

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

                        {/* <form style={{ display: 'flex', flexDirection: 'column' }}>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Fee Name</Typography></div>
                                <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Fee Name' required />

                            </div>

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Percentage (%)</Typography></div>
                                <TextField fullWidth variant='outlined' type="number" name="" size='small' placeholder='Percentage (%)' required />

                            </div>

                            <Button variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                ADD
                            </Button>
                        </form> */}

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

export default AddFees
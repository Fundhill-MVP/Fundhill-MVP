import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {Formik,Form} from "formik";
import {object as yupObject, string as yupString,number as yupNumber} from "yup";
import {CircularProgress} from "@material-ui/core";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, IconButton } from '@mui/material';
import useStyles from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import { api  } from "../../../../services";
import {TextField} from "../../../../components/FormsUI"




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
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function OptionModal({ del,loanId }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [btnLoading,setBtnLoading] = useState(false);
    const [delBtn,setDelBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [data, setData] = useState([]);
    const [item, setItem] = useState("");
    const  navigate = useNavigate();




    useEffect(() => {
        try {
          setIsLoading(true)
    
          const allLoans = async () => {
            const loans = await api
              .service()
              .fetch("/dashboard/loan/?status=APPROVED", true);
            console.log(loans.data.results)
    
            if ((api.isSuccessful(loans))) {
              setData(loans.data.results);
              setIsLoading(false)
            } else {
              setIsLoading(true)
            }
          }
          allLoans();
        } catch (error) {
          console.log(error)
        }
    
      }, [])


    const getProducts = (id) => {
        const product = data.filter((item) => item.id === id);
        // console.log(fee);
        setItem(product[0]);
        console.log(item);
      }
    
      const handleProps = () => {
        // console.log(loanId);
        getProducts(loanId);
        // setItem(getProducts(loanId));
        return setOpen(true);
      }
    

      const disburseLoan = async (values) => {
        try {
            setDelBtn(true);
            console.log(values);
            const res = await api.service().fetch(`/dashboard/loan/${values.id}/disburse/`, true);
            console.log(res.data)
            if (api.isSuccessful(res)) {
              setTimeout(() => {
                handleClose()
                toast.success("Successfully Disbursed Loan!");
        
              }, 0);
            }
            setDelBtn(false)
        } catch (error) {
            console.log(error);
            setDelBtn(false)
        }
    
      }



  const deleteLoan = async (values) => {
    try {
        setDelBtn(true);
        console.log(values);
        const res = await api.service().push(`/dashboard/loan/action/`,values, true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
          setTimeout(() => {
            handleClose()
            toast.success("Successfully denied Loan!");
    
            setDelBtn(false)
          }, 0);
        }
    } catch (error) {
        console.log(error);
        setDelBtn(false)
    }

  }

    return (
        <div>
            <Button style={{ color: 'black', textTransform: 'none' }} onClick={handleOpen && handleProps} >{del ? `Deny` : `Disburse`}</Button>
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
                        {del ? (
                            <>
                                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                                    Confirm Status of Loan
                                </Typography>
                                <Divider />

                                <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2 }} gutterBottom>
                                    Are you sure you want to delete this Loan?
                                </Typography>

                                <Divider />
                                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button onClick={handleClose} style={{ background: 'gray', color: 'white' }} >No</Button>

                                    <Formik
                                        initialValues={{
                                            id: item?.id,
                                            status: "DENIED",
                                        }}
                                        onSubmit={async(values) => {
                                        await deleteLoan(values)
                                    }}
                                    >          
                                        <Form >

                                        {delBtn ? (
                                        <CircularProgress size={26} />
                                        )
                                        :
                                        (
                                            <Button type="submit" style={{ background: 'red', color: 'white', marginLeft: 5 }}>yes</Button>
                                        )
                                        }
                                        </Form>
                                    </Formik>


                                </div>
                            </>
                        ) :

                            (
                                <>


                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                                    Confirm Status of Loan
                                </Typography>
                                <Divider />

                                <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2 }} gutterBottom>
                                    Are you sure you have disbursed this Loan?
                                </Typography>

                                <Divider />
                                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button onClick={handleClose} style={{ background: 'gray', color: 'white' }} >No</Button>

                                    <Formik
                                        initialValues={{
                                            id: loanId,
                                        }}
                                        onSubmit={async(values) => {
                                        await disburseLoan(values)
                                    }}
                                    >          
                                        <Form >

                                        {delBtn ? (
                                        <CircularProgress size={26} />
                                        )
                                        :
                                        (
                                            <Button type="submit" style={{ background: 'red', color: 'white', marginLeft: 5 }}>yes</Button>
                                        )
                                        }
                                        </Form>
                                    </Formik>


                                </div>
                            </>
                            )
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

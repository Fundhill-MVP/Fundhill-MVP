import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {Formik,Form} from "formik";
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
import {TextField} from "../../../../components/FormsUI"
import { api  } from "../../../../services";
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
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function InterestRateModal({del,setInterestRateId}) {
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




    useEffect(  () => {
        setIsLoading(true)

            const allinterestRates = async() => {
             try {
                    const interestRates = await api
                    .service()
                    .fetch("/dashboard/interest-rates/",true);
                    // console.log(interestRates.data.results)
                    
                if((api.isSuccessful(interestRates))){
                    setData(interestRates.data.results);
                    setIsLoading(false)
                }else{
                    setIsLoading(true)
                }
             } catch (error) {
                console.log(error.message)
             }
    
            }

            allinterestRates();
    }, [])


    const getInterestRate = (id) => {
        const interestRate = data.filter((item) => item.id === id);
        // console.log(interestRate);
        setItem(interestRate[0]);
        console.log(item);
      }
    
      const handleProps = () => {
        // console.log(setInterestRateId);
        getInterestRate(setInterestRateId);
        // setItem(getInterestRate(setInterestRateId));
        return setOpen(true);
      }
    



  


    const editInterestRate = async(values,id) => {
        setBtnLoading(true);

        try {
            console.log(values)

            const response = await api
                  .service()
                  .update(`/dashboard/${id}/interest-rates/`,values,true)
    
            if(api.isSuccessful(response)){
              setTimeout( () => {
                trigger("reRenderInterestRates")
                toast.success("interestRates edited successfully!");
              },0);
            }
            setBtnLoading(false);
        } catch (error) {
            console.log(error.message)
        }
   
  }

  const deleteInterestRate = async (id) => {
    try {
        setDelBtn(true);
        const res = await api.service().remove(`/dashboard/interest-rates/${id}/`, true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
          setTimeout(() => {
            trigger("reRenderInterestRates")
            toast.success("Successfully deleted interestRate!");
            setDelBtn(false)
          }, 0);
        }
    } catch (error) {
        console.log(error);
    }

  }

    return (
        <div>
            <Button style={{ color: 'black', textTransform: 'none' }} onClick={handleOpen && handleProps } >{del ? `Delete` : `Update`}</Button>
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
                                <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                                    Confirm delete of Interest Rate
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <Divider />

                                <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2 }} gutterBottom>
                                    Are you sure you want to delete this interestRate?
                                </Typography>

                                <Divider />
                                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button onClick={handleClose} style={{ background: 'gray', color: 'white' }} >No</Button>
                                    {delBtn ? (
                                        <CircularProgress size={26} />
                                        )
                                        :
                                        (
                                            <Button onClick={() =>  deleteInterestRate(item.id)} variant="contained" style={{ textTransform: 'none', background: 'red', marginLeft: 5 }}>Yes</Button>
                                            
                                        )
                                        }

                                </div>
                            </>
                        ) :

                            (
                                <>

                                    <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h6" component="h5" gutterBottom>
                                        Interest Rates
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                        <IconButton onClick={handleClose}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                    <Divider />

                                    <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }}>
                                        Edit Interest Rates
                                    </Typography>
                                    <Formik
                                        initialValues={{
                                            name: `${item?.name}`,
                                            percentage: item?.percentage,
                                            minimum_time_in_months: item?.minimum_time_in_months,
                                        }}
                                        onSubmit={async(values) => {
                                        await editInterestRate(values,item.id)
                                    }}
                                    >          
                                        <Form style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Name</Typography></div>
                                            <TextField fullWidth variant='outlined' type="text" name="name" size='small'  />

                                        </div>

                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Percentage (%)</Typography></div>
                                            <TextField fullWidth variant='outlined' type="number" name="percentage" size='small' />

                                        </div>

                                        <div className={classes.formDiv}>
                                            <div className={classes.divTypo}><Typography>Minimum Time in Month</Typography></div>
                                            <TextField fullWidth variant='outlined' type="number" name="minimum_time_in_months" size='small' />
                                        </div>


                                        {
                                        btnLoading ? 
                                            ( <div className="sweet-loading">
                                                <DotLoader color={color} loading={loading} css={override}  size={80} />
                                                </div>)
                                            : (
                                       
                                                <Button type="submit" variant='contained' style={{ background: 'green', marginTop: 10, alignSelf: 'center' }}>
                                                    Update
                                                </Button>
                                             )
                                        }
                                        </Form>
                                    </Formik>
                                </>
                            )
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default InterestRateModal
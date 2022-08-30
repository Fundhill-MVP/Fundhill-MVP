import { Box, Button, Divider, Fade, IconButton, Modal,MenuItem,Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import {  useState,useEffect,useContext } from "react";
import {DotLoader} from "react-spinners";
import { Formik, Form} from "formik";
import { toast } from "react-toastify";
import { api } from '../../../services';
import { css } from "@emotion/react";
import {Context} from "../../../context/Context";
import useStyles from './styles';
import {TextField} from "../../../components/FormsUI"

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
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AllmarketerModal = ({ fund,setCurrentId }) => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const {user} = useContext(Context);
    const [marketers,setMarketers] = useState([]);
    const [data,setData] = useState("");
    const [lock, setUnlock] = useState(false);
    const handleUnlock = () => setUnlock(true);
    const handleLock = () => setUnlock(false);





      useEffect(() => {
          setIsLoading(true)
  
          const allMarketer = async() => {
            const res = await api.service().fetch("/accounts/manage/?is_staff=True",true);
            console.log(res.data)
            if(api.isSuccessful(res)){
              //   console.log(res)
              setMarketers(res.data.results)
            }
      
            setIsLoading(false);
      
          }
  
          allMarketer();
        },[]);

        const getMarketer = (id) => {
            const marketer = marketers.filter((item) => item.id === id);
            // console.log(branch);
            setData(marketer[0]);
            console.log(data);
            // return branch
          }
        
          const handleProps = () => {
            // console.log(setCurrentId);
            getMarketer(setCurrentId);
            // setItem(branches(setCurrentId));
            return setUnlock(true);
          }
  
  
        const edit_marketer = async(values,id) => {
            setBtnLoading(true);
            console.log(values)
  
          const response = await api
              .service()
              .update(`/accounts/auth/${id}/`,values,true)
  
          if(api.isSuccessful(response)){
          setTimeout( () => {
                handleLock()
              toast.success("Marketer profile successfully updated!!");
              // navigate("/admin/allbranch",{replace: true})
          },0);
          }
          setBtnLoading(false);
        }
      const fund_marketer = async(values,id) => {
              try {
                  setBtnLoading(true);
                  console.log(values)
  
                  const response = await api
                      .service()
                      .push(`/wallets/marketers/${id}/fund-wallet/`,values,true)
                  if(api.isSuccessful(response)){
                  setTimeout( () => {
                      toast.success("Transaction successful");
                      // navigate("/admin/allbranch",{replace: true})
                  },0);
                  }
                  setBtnLoading(false);
              } catch (error) {
                  console.log(error)
              }
                  }
  
  


        const deactivateMarketer = async(id) => {
            try {
                setDeactiveBtn(true);
                const res = await api.service().fetch(`/accounts/auth/${id}/deactivate/`,true);
                console.log(res.data)
                if(api.isSuccessful(res)){
                    setTimeout( () => {
                        trigger("reRenderAllMarketer");
                        setDeactiveBtn(false)
                        handleClose()
                        toast.success("Successfully deactivated marketer!");
                    },0);
                    }
            } catch (error) {
                setDeactiveBtn(false)
                console.log(error);
            }
          }
    
          const deleteMarketer = async(id) => {
                try {
                    setDelBtn(true);
                    const res = await api.service().remove(`/accounts/auth/${id}/`,true);
                    console.log(res.data)
                    if(api.isSuccessful(res)){
                        setTimeout( () => {
                            trigger("reRenderAllMarketer");
                            setDelBtn(false);
                            handleClose()
                            toast.success("Successfully deleted marketer!");
                        },0);
                        }
              
                } catch (error) {
                    setDelBtn(false)
                    console.log(error)
                }
          }
    return (
        <div>
            <Button onClick={handleUnlock && handleProps }>{fund ? 'Fund Wallet' : 'Edit Profile'}</Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={lock}
                onClose={handleLock}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={lock}>
                    <Box sx={style}>

                        {fund ? (
                        <>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLock}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Typography id="transition-modal-title" variant="h6" component="h2">
                           Fund Marketer
                        </Typography>

                        <Divider style={{ marginTop: 40 }} />
                         <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Fund Marketer Wallet </Typography> 

                         <Formik
                                    initialValues={{
                                         amount: 0,
                                        }}
                                 // validationSchema= {validationSchema}
                                 onSubmit = { async (values) => {
                                    await fund_marketer(values,data.wallet.id)
                                }}
                                >
                                    <Form style={{ display: 'flex', flexDirection: 'column' }} >
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Amount</Typography></div>
                                        <TextField fullWidth variant='outlined' type="number" name="amount" size='small' />

                                    </div>


                                    {
                                            btnLoading ? 
                                            ( <div className={classes.sweet_loading}>
                                                <DotLoader color={color} loading={loading} css={override}  size={80} />
                                                </div>)
                                            : (
                                                <Button type="submit" variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                    Fund
                                                </Button>
                                              )
                                        }
                                    </Form>
                                </Formik>
                        </>      
                        ) : (
                            <>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLock}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                             <Typography id="transition-modal-title" variant="h6" component="h2">
                            Marketer Id
                            </Typography> 
                        <Divider style={{ marginTop: 40 }} />
                         <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Edit Marketer Profile</Typography>
                         <Formik
                                        initialValues={{
                                        first_name: `${data?.first_name}`,
                                        middle_name: `${data?.middle_name}`,
                                        last_name: `${data?.last_name}`,
                                        email: `${data?.email}`,
                                        phone: `${data?.phone}`,   
                                        user_role: `${data?.user_role}`,
                                     }}
                            // validationSchema= {validationSchema}
                            onSubmit = { async (values) => {
                                await edit_marketer(values,data.id)
                            }}
                        >         
                                    <Form style={{ display: 'flex', flexDirection: 'column' }}>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>First Name</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="first_name" size='small' />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Middle Name</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="middle_name" size='small' />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Last Name</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="last_name" size='small' />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Email</Typography></div>
                                        <TextField fullWidth variant='outlined' type="email" name="email" size='small' />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Phone</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="phone" size='small' />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Marketer</Typography></div>
                                        <TextField
                                            select={true}
                                            className={classes.input}
                                            variant="outlined"
                                            size='small'
                                            name='user_role'
                                            type='text'
                                            required
                                        >   
                                            <MenuItem value={"MANAGER"} >Manager</MenuItem>
                                            <MenuItem value={"TELLER"}>Teller</MenuItem>
                                            <MenuItem value={"AGENT"}>Agent</MenuItem>

                                        </TextField>
                                    </div>

                                        {
                                            btnLoading ? 
                                            ( <div className={classes.sweet_loading}>
                                                <DotLoader color={color} loading={loading} css={override}  size={80} />
                                                </div>)
                                            : (
                                                <Button type="submit" variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                    Update
                                                </Button>
                                              )
                                        }

                                    </Form>
                                </Formik>
                        </>  
                        )   
                        }

                    
                        <Divider style={{ marginTop: 40 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                            <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

          
        </div>
    )
}

export default AllmarketerModal
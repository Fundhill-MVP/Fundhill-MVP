import  React,{useState,useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {CircularProgress} from "@material-ui/core";
import { toast } from "react-toastify";
import { api } from '../../../services';
import useStyles from './styles';
import { trigger } from '../../../events';
import {BounceLoader} from "react-spinners"
import { css } from "@emotion/react";

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

export default function ActionButton({ del, customerId }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [loading, setloading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [activeBtn,setActiveBtn] = useState(false);
    const [deactiveBtn,setDeactiveBtn] = useState(false);
    const [delBtn,setDelBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        const allCustomer = async() => {
          const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=PENDING",true);
        //   console.log(res.data)
          if(api.isSuccessful(res)){
            setData(res.data.results)
          }
        setIsLoading(false);
    
        }

        allCustomer();
      },[])


    
    const activateCustomer = async(id) => {
        try {
            setActiveBtn(true)
            const res = await api.service().fetch(`/accounts/auth/${id}/activate/`,true);
            console.log(res.data)
            if(api.isSuccessful(res)){
                setTimeout( () => {
                    trigger("reRenderAllPendingCustomer");
                    setActiveBtn(false);
                    handleClose()
                    toast.success("Successfully activated customer!");
                },0);
                }
                setActiveBtn(false);
        } catch (error) {
            setActiveBtn(false);
            console.log(error);
        }
  
      }


    const deactivateCustomer = async(id) => {
        try {
            setDeactiveBtn(true);
            const res = await api.service().fetch(`/accounts/auth/${id}/deactivate/`,true);
            console.log(res.data)
            if(api.isSuccessful(res)){
                setTimeout( () => {
                    trigger("reRenderAllPendingCustomer");
                    setDeactiveBtn(false)
                    handleClose()
                    toast.success("Successfully deactivated customer!");
                },0);
                }
        } catch (error) {
            setDeactiveBtn(false)
            console.log(error);
        }
      }

      const deleteCustomer = async(id) => {
            try {
                setDelBtn(true);
                const res = await api.service().remove(`/accounts/auth/${id}/`,true);
                console.log(res.data)
                if(api.isSuccessful(res)){
                    setTimeout( () => {
                        trigger("reRenderAllPendingCustomer");
                        setDelBtn(false);
                        handleClose()
                        toast.success("Successfully deleted customer!");
                    },0);
                    }
          
            } catch (error) {
                setDelBtn(false)
                console.log(error)
            }
      }


      const [user,setUser] = useState("");
      const getCustomer = (id)  => {
            try {
                let item = data.filter((customer) => customer.id === id);
                if(item.length !== 0){
                    setUser(item[0]);
                }    
            } catch (error) {
                console.log(error);
            }
      }
    return (
        <div>
            <Button style={{ textTransform: 'none' }} variant='contained' onClick={()=> [handleOpen(),getCustomer(customerId)]} >View</Button>
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
                             FullName:{user?.first_name} {user?.last_name} Id:  {user.id} 
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider />

                      
                            {isLoading ? 
                                (
                                    <div className={classes.sweet_loading}>
                                    <BounceLoader color={color} loading={loading} css={override} size={150} />
                                    </div>
                                )
                                :
                                (
                                    <img className={classes.img} src={user.avatar} alt={user.first_name}  />

                                )
                            }
                        <Divider />
                        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                        {activeBtn ? (
                             <CircularProgress size={26} />
                            )
                            :
                             (
                                <Button onClick={() => activateCustomer(customerId)} variant="contained" style={{ textTransform: 'none', marginRight: 5 }} >Activate</Button>
                             )
                             }
                             {deactiveBtn ? (
                             <CircularProgress size={26} />
                            )
                            :
                             (
                                <Button onClick={() =>  deactivateCustomer(customerId)} style={{ background: 'gray', color: 'white', textTransform: 'none' }} >Deactivate</Button>
                             )
                             }
                             {delBtn ? (
                             <CircularProgress size={26} />
                            )
                            :
                             (
                                <Button onClick={() => deleteCustomer(customerId)} style={{ background: 'red', color: 'white', marginLeft: 5, textTransform: 'none' }}>Delete</Button>

                             )
                             }
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
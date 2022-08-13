import  React,{useState,useEffect} from 'react';
import {  Dialog,  DialogTitle, } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, IconButton } from '@mui/material';
import {CircularProgress} from "@material-ui/core";
import { toast } from "react-toastify";
import { api } from '../../../services';
import { trigger } from '../../../events';
import useStyles from './styles';



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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const OrganisationModal = ({ activate,orgId }) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [activeBtn,setActiveBtn] = useState(false);
    const [deactiveBtn,setDeactiveBtn] = useState(false);
    const [delBtn,setDelBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData] = useState([]);

    const allActiveOrgs = async () => {
        setIsLoading(true)

        const res = await api.service().fetch("/accounts/organisation/", true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
            setData(res.data.results)
        }
        setIsLoading(false);
    }


    useEffect(() => {
        allActiveOrgs();

    }, []);


    
    const activateOrg = async(id) => {
        try {
            setActiveBtn(true)
            const res = await api.service().fetch(`/accounts/organisation/${id}/activate/`,true);
            console.log(res.data)
            if(api.isSuccessful(res)){
                setTimeout( () => {
                    trigger("reRenderActiveOrg");
                    setActiveBtn(false);
                    handleClose()
                    toast.success("Successfully activated organisation!");
                },0);
                }
                setActiveBtn(false);
        } catch (error) {
            setActiveBtn(false);
            console.log(error);
        }
  
      }


    const suspendOrg = async(id) => {
        try {
            setDeactiveBtn(true);
            console.log(id)
            const res = await api.service().fetch(`/accounts/organisation/${id}/suspend/`,true);
            console.log(res.data)
            if(api.isSuccessful(res)){
                setTimeout( () => {
                    trigger("reRenderActiveOrg");
                    setDeactiveBtn(false)
                    handleClose()
                    toast.success("Successfully deactivated organisation!");
                },0);
                }
                setDeactiveBtn(false)
        } catch (error) {
            setDeactiveBtn(false)
            console.log(error);
        }
      }

      const deleteCustomer = async(id) => {
            try {
                setDelBtn(true);
                const res = await api.service().remove(`/accounts/organisation/${id}/`,true);
                console.log(res.data)
                if(api.isSuccessful(res)){
                    setTimeout( () => {
                        trigger("reRenderActiveOrg");
                        setDelBtn(false);
                        handleClose()
                        toast.success("Successfully deleted organisation!");
                    },0);
                    }
                    setDelBtn(false);

            } catch (error) {
                setDelBtn(false)
                console.log(error)
            }
      }


      const [user,setUser] = useState("");
      const getOrg = (id)  => {
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
        <Button style={{ textTransform: 'none' }} variant='contained' onClick={()=> [handleClickOpen(),getOrg(orgId)]} >View</Button>
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
                         Name: {user?.name} Id:  {user.id} 
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Divider />

                    {/* <img className={classes.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMltxBUZCeJjJCrE18S0PZktyxZyhJMXyPuc9fc9zRU-Qi6sm9lv9UaStBK6m77lgsO7o&usqp=CAU" alt="" /> */}
                    <img className={classes.img} src={user.avatar} alt={user.first_name}  />

                    <Divider />
                    <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                    {activeBtn ? (
                         <CircularProgress size={26} />
                        )
                        :
                         (
                            <Button onClick={() => activateOrg(orgId)} variant="contained" style={{ textTransform: 'none', marginRight: 5 }} >Activate</Button>
                         )
                         }
                         {deactiveBtn ? (
                         <CircularProgress size={26} />
                        )
                        :
                         (
                            <Button onClick={() =>  suspendOrg(orgId)} style={{ background: 'gray', color: 'white', textTransform: 'none' }} >Suspend</Button>
                         )
                         }
                         {delBtn ? (
                         <CircularProgress size={26} />
                        )
                        :
                         (
                            <Button onClick={() => deleteCustomer(orgId)} style={{ background: 'red', color: 'white', marginLeft: 5, textTransform: 'none' }}>Delete</Button>

                         )
                         }
                    </div>
                </Box>
            </Fade>
        </Modal>
    </div>
    )
}

export default OrganisationModal; 
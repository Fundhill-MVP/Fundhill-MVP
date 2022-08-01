import { Backdrop, Box, Button, Divider, Fade, IconButton, Modal,  Typography, MenuItem } from '@mui/material'
import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, useField,useFormikContext } from "formik";
import {object as yupObject,string as yupString,number as yupNumber} from "yup";
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import { api } from '../../../services';
import {toast} from "react-toastify"
import {TextField} from "../../../components/FormsUI"
import CloseIcon from '@mui/icons-material/Close';
// import { makeStyles } from "@material-ui/styles";
import useStyles from './styles';


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


const AllModal = ({ updates,setCurrentId }) => {

    const [lock, setUnlock] = useState(false);
    const handleUnlock = () => setUnlock(true);
    const handleLock = () => setUnlock(false);
    const classes = useStyles();

 


  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const [data, setData] = useState([]);
  const [marketers, setMarketers] = useState([]);
  const navigate = useNavigate();
  const [item, setItem] = useState("");

  //  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  //  keys.shift(); // delete "id" key

 

  useEffect(() => {
    setIsLoading(true)

    const allBranch = async () => {
      const res = await api.service().fetch("/dashboard/branches/", true);
      console.log(res.data)
      if (api.isSuccessful(res)) {
        setData(res.data.results)
      }

      setIsLoading(false);

    }

    allBranch();
  }, [])


  const branches = (id) => {
    const branch = data.filter((item) => item.id === id);
    // console.log(branch);
    setItem(branch[0]);
    console.log(item);
    // return branch
  }

  const handleProps = () => {
    // console.log(setCurrentId);
    branches(setCurrentId);
    // setItem(branches(setCurrentId));
    return setUnlock(true);
  }


  const allBranch = async () => {
    setIsLoading(true)
    const res = await api.service().fetch("/dashboard/branches/", true);
    // console.log(res.data)
    if (api.isSuccessful(res)) {
      setData(res.data.results)
    }

    setIsLoading(false);

  }
  const initialFormState = () => ({
    name: `${item.name}`,
    branch_head_id: `${item.branch_head.id}`,
    branch_address: `${item.branch_address}`,
  });




  const deleteBranch = async (id) => {
    const res = await api.service().remove(`/dashboard/branches/${id}/`, true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      setTimeout(() => {
        toast.success("Successfully deleted branch!");
        allBranch();


      }, 0);
    }

  }

  const edit_branch = async (values, id) => {
    setLoading(true);
    console.log(values)

    const response = await api
      .service()
      .update(`/dashboard/branches/${id}/`, values, true)

    if (api.isSuccessful(response)) {
      setTimeout(() => {
        toast.success("branch successfully updated!!");
        navigate("/admin/dashboard/branch/allbranch",{replace: true})
        // allBranch();
      }, 0);
    }
    setLoading(false);
  }


  useEffect(() => {
    setIsLoading(true)

    const allMarketer = async () => {
      const res = await api.service().fetch("/accounts/manage/?is_staff=True", true);
      // console.log(res.data)
      if (api.isSuccessful(res)) {
        //   console.log(res)
        setMarketers(res.data.results)
      }

      setIsLoading(false);

    }

    allMarketer();
  }, []);

    return (
        <div>
            <Button onClick={handleUnlock  && handleProps}>{updates ? 'Delete' : 'Update'}</Button>

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
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {updates ? 'Confirm Delete of Leasson Teacher' : 'branch ID'}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLock}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />
                        {updates ? (
                            <>
                                <Typography style={{ fontWeight: 500, marginTop: 10, marginBottom: 10, marginLeft: 10, textAlign: 'center' }}>Are you sure you want to delete this branch?</Typography>

                                <Divider style={{ marginTop: 40 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                                    <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                                    <Button onClick={() => deleteBranch(item.id)} variant="contained" style={{ textTransform: 'none', background: 'red', marginLeft: 5 }}>Delete</Button>
                                </Box>
                            </>
                        ) : (
                            item && (
                                
                                <>
                                <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Edit branch Profile</Typography>
                                <Formik 
                                    initialValues={initialFormState()}
                                    onSubmit={async(values) => {
                                        await edit_branch(values,item.id)
                                    }}
                                >
                                    <Form>
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Branch Name </Typography></div>
                                        <TextField fullWidth variant='outlined' type="text"  name="name" size='small'  required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Branch Address</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="branch_address"  size='small'  required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Marketer</Typography></div>
                                        <TextField
                                        select={true} 
                                        className={classes.input}
                                        name="branch_head_id"  
                                        variant='outlined'
                                        fullWidth={true}
                                        // type="number"
                                    >
                                        {marketers.map((marketer) => {
                                            return (
                                                <MenuItem key={marketer.id} value={marketer.id}>
                                                    {marketer.first_name}
                                                </MenuItem>      
   
                                            )
                                        })}
                                        </TextField>
                                    </div>                                                    {
                                            isLoading ? 
                                            ( <div className="sweet-loading">
                                                <DotLoader color={color} loading={loading} css={override}  size={80} />
                                                </div>)
                                            : (
                                                <Button type='submit' variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                                        Update
                                                    </Button>
                                             )
                                        }
                                            
                                    </Form>
                                </Formik>
                                {/* <form style={{ display: 'flex', flexDirection: 'column' }}>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Branch Address </Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" value={item.name} size='small'  required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Branch Address</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Branch Address' required />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Marketer</Typography></div>
                                        <TextField fullWidth variant='outlined' type="text" name="" size='small' placeholder='Marketer' required />

                                    </div>


                                    <Button variant='contained' style={{ marginTop: 10, alignSelf: 'center', textTransform: 'none', width: '100%' }}>
                                        Update
                                    </Button>
                                </form> */}
                            
                                </>
                                
                            )
                        )}
                        {!updates &&
                            (
                                <>
                                    <Divider style={{ marginTop: 40 }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                                        <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                                    </Box>
                                </>
                            )
                        }

                    </Box>
                </Fade>
            </Modal>

            {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openn}
        onClose={handleLock}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={openn}>
            <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Confirm Delete of Leasson Teacher
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <IconButton onClick={handleLock}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Divider style={{ marginTop: 40 }} />

                <Typography style={{ fontWeight: 500, marginTop: 10, marginBottom: 10, marginLeft: 10, textAlign: 'center' }}>Are you sure you want to delete this branch?</Typography>

                <Divider style={{ marginTop: 40 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                    <Button onClick={handleClosee} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                    <Button onClick={handleClosee} variant="contained" style={{ textTransform: 'none', background: 'red', marginLeft: 5 }}>Delete</Button>
                </Box>
            </Box>
        </Fade>
    </Modal> */}
        </div>
    )
}

export default AllModal
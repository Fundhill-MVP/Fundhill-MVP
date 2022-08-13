import { Backdrop, Box, Button, Divider, Fade, IconButton, Modal,  Typography, MenuItem } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {CircularProgress} from "@material-ui/core";
import { Formik, Form,  } from "formik";
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import { api } from '../../../../services';
import {toast} from "react-toastify"
import {TextField} from "../../../../components/FormsUI"
import CloseIcon from '@mui/icons-material/Close';
import useStyles from '../styles';
import SearchGroup from "./SearchGroup";
import {trigger} from "../../../../events";

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


const AllModal = ({ updates,groupId }) => {

    const [lock, setUnlock] = useState(false);
    const handleUnlock = () => setUnlock(true);
    const handleLock = () => setUnlock(false);
    const classes = useStyles();

 

  const [btnLoading,setBtnLoading] = useState(false);
  const [delBtn,setDelBtn] = useState(false);
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

    const allGroup = async () => {
      const res = await api.service().fetch("/accounts/group/", true);
      console.log(res.data)
      if (api.isSuccessful(res)) {
        setData(res.data.results)
      }

      setIsLoading(false);

    }

    allGroup();
  }, [])


  const groups = (id) => {
    const group = data.filter((item) => item.id === id);
    // console.log(branch);
    setItem(group[0]);
    console.log(item);
    // return branch
  }

  const handleProps = () => {
    // console.log(groupId);
    groups(groupId);
    // setItem(groups(groupId));
    return setUnlock(true);
  }




  const initialFormState = () => ({
    name: `${item.name}`,
    members: [item.members],
    description: `${item.description}`,
});




  const deleteGroup = async (id) => {
        try {
            setDelBtn(true)
            const res = await api.service().remove(`/accounts/group/${id}/`, true);
            console.log(res.data)
            if (api.isSuccessful(res)) {
              setTimeout(() => {
                toast.success("Successfully deleted Group!");
                trigger("reRenderAllGroup")
                handleLock()
                setDelBtn(false)

              }, 0);
            }
        } catch (error) {
            console.log(error);
        }

  }

  const editGroup = async (values, id) => {
    try {
        setBtnLoading(true);
        console.log(values)
    
        const response = await api
          .service()
          .update(`/accounts/group/${id}/`, values, true)
    
        if (api.isSuccessful(response)) {
          setTimeout(() => {
            trigger("reRenderAllGroup")
            toast.success("Group successfully updated!!");
            handleLock()
            // allGroup();
          }, 0);
        }
        setBtnLoading(false);
    } catch (error) {
        console.log(error);
    }
  }





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
                            {updates ? 'Confirm Delete of Group' : 'Group ID'}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLock}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />
                        {updates ? (
                            <>
                                <Typography style={{ fontWeight: 500, marginTop: 10, marginBottom: 10, marginLeft: 10, textAlign: 'center' }}>Are you sure you want to delete this Group?</Typography>

                                <Divider style={{ marginTop: 40 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                                    <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none', background: 'gray' }}>Close</Button>
                                                                        {delBtn ? (
                                        <CircularProgress size={26} />
                                        )
                                        :
                                        (
                                            <Button onClick={() => deleteGroup(item.id)} variant="contained" style={{ textTransform: 'none', background: 'red', marginLeft: 5 }}>Delete</Button>
                                        )
                                        }

                                </Box>
                            </>
                        ) : (
                            item && (
                                
                                <>
                                <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Edit Group Profile</Typography>
                                <Formik 
                                    initialValues={initialFormState()}
                                    onSubmit={async(values) => {
                                        await editGroup(values,item.id)
                                    }}
                                >
                                    {(prop) => (
                                        <Form>
                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Group Name </Typography></div>
                                        <TextField fullWidth variant='outlined' type="text"  name="name" size='small' />

                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography>Members</Typography></div>
                                                <SearchGroup
                                            setSelectedOption = {(value) => {
                                                prop.setFieldValue("members",value)
                                            }}
                                        />
                                    </div>

                                    <div className={classes.formDiv}>
                                        <div className={classes.divTypo}><Typography> Description </Typography></div>
                                        <TextField fullWidth variant='outlined' type="text"  name="description" size='small' />

                                    </div>
                                                   {
                                            btnLoading ? 
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
                                    )}
                                </Formik>
                              
                            
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

         
        </div>
    )
}

export default AllModal
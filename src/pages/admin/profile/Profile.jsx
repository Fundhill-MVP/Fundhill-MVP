import {Fragment,useEffect,useContext,useState} from 'react'
import { useNavigate } from "react-router-dom";
// import "./Dashboard.css"
import { Formik, Form, Field } from "formik";
import {object as yupObject,string as yupString,number as yupNumber} from "yup";
import { toast } from "react-toastify";
import { api } from '../../../services';
import { css } from "@emotion/react";
import {BounceLoaderk,DotLoader} from "react-spinners";
import {Context} from "../../../context/Context";
import PageTitle from "../../../components/PageTitle"
import Widget from "../../../components/Widget/Widget";
import useStyles from './styles';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import ActionButton from './ActionButton';
// import {DateTimePicker,Select} from "../../../components/FormsUI"


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;





function Profile() {
  
  const classes = useStyles();
  const [isCompanyLoading, setIsCompanyLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading,setLoading] = useState(true)
  const [color,setColor] = useState("#ADD8E6");
  const navigate = useNavigate();
  const {user} = useContext(Context);





  const [avatar, setAvatar] = useState("");
  const [photo, setPhoto] = useState("");

  const handleAvatarOnChange = (file) => {
    setAvatar(file[0])
  }


  const handlePhotoOnChange = (file) => {
    setPhoto(file[0])
  }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
          setIsCompanyLoading(true)
          // setLoading(false)
          let data = new FormData(e.target);
          data.append("avatar",avatar);
    
          console.log(data)
  
  
  
          let values = Object.fromEntries(data.entries())
          // let remains = {
          //   user_role: "CUSTOMER",
          //   password: genPassword()
          // }
          // let values = Object.assign(data,remains)
          // values.append("user_role","CUSTOMER");
          // values.append("password",genPassword());
  
          console.log(values);
      const response = await api.service().update(`/accounts/organisation/${user.data.organisation}`,data,true,true);
  
      if(api.isSuccessful(response)){
        setTimeout(() => {
          
          toast.success("Company logo update was successful");
          navigate("/admin/dashboard/update_profile",{replace: true})
          setIsCompanyLoading(false)
  
        },0);
      }
  
          setIsCompanyLoading(false)
          // setLoading(false)
        } catch (error) {
          console.log(error)
        }

    }


    const handleProfileSubmit = async(e) => {
      e.preventDefault()
      try {
        setIsLoading(true)
        // setLoading(false)
        let data = new FormData(e.target);
        data.append("user_role","CUSTOMER");
        data.append("avatar",photo);
        console.log(data)
  
  
    const response = await api.service().update(`/accounts/auth/${user.data.id}/`,data,true,true);
  
    if(api.isSuccessful(response)){
      setTimeout(() => {
        
        toast.success("Admin profile updated successfully");
        navigate("/admin/dashboard/profile/update_profile",{replace: true})
        setIsLoading(false)
  
      },0);
    }
  
        setIsLoading(false)
        // setLoading(false)
      } catch (error) {
        console.log(error);
      }

  }

  return (
    <Fragment>
    <PageTitle title={`${user.data.organisation_name}`} />
    <Box className={classes.formBox}>
        <Typography variant='h5'>Update Profile</Typography>
        <form style={{ marginBottom: 30 }} onSubmit={handleProfileSubmit} >
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >First Name</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    type='text'
                    value={user.data.first_name}
                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Middle Name</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    type='text'
                    value={user.data.middle_name}
                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Last Name</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    type='text'
                    value={user.data.last_name}
                />
            </div>


            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Profile Photo</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    type='file'
                    onChange={(e)  => handlePhotoOnChange(e.target.files)}                />
            </div>
            

    
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Email</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    type='email'
                    value={user.data.email}
                />
            </div>

            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Residential Address</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    type='text'
                    value={user.data.residential_address}
                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Business Address</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    type='text'
                    value={user.data.business_address}
                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Phone Number</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    type='text'
                    value={user.data.phone}
                />
            </div>

                {
                            isLoading ? 
                              ( <div className="sweet-loading">
                                  <DotLoader color={color} loading={loading} css={override}  size={80} />
                                </div>)
                              : (
                                <Button type="submit" className={classes.btnSubmit}>Update Profile </Button>
                              )
                          }      
              </form>
    </Box>

   
</Fragment>
  )
}

export default Profile
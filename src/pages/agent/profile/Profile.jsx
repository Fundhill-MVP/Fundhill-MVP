import { Fragment, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from '../../../services';
import { css } from "@emotion/react";
import {DotLoader } from "react-spinners";
import { Context } from "../../../context/Context";
import PageTitle from "../../../components/PageTitle"
import useStyles from './styles';
import {
  Typography,
  TextField,
  Box,
  Button
} from "@material-ui/core";


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
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState("#ADD8E6");
  const navigate = useNavigate();
  const { user } = useContext(Context);





  const [avatar, setAvatar] = useState("");
  const [photo, setPhoto] = useState("");

  const handleAvatarOnChange = (file) => {
    setAvatar(file[0])
  }


  const handlePhotoOnChange = (file) => {
    setPhoto(file[0])
  }



  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      // setLoading(false)
      let data = new FormData(e.target);
      data.append("avatar", photo);
      console.log(data)


      const response = await api.service().update(`/accounts/auth/${user.data.id}/`, data, true, true);

      if (api.isSuccessful(response)) {
        setTimeout(() => {

          toast.success("Admin profile updated successfully");
          navigate("/admin/dashboard/profile/update_profile", { replace: true })
          setIsLoading(false)

        }, 0);
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
              name="first_name"
              defaultValue={user.data.first_name}
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
              name="middle_name"
             defaultValue={user.data.middle_name}
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
              name="last_name"
              defaultValue={user.data.last_name}
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
              onChange={(e) => handlePhotoOnChange(e.target.files)} />
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
              name="email"
              defaultValue={user.data.email}
            />
          </div>

         


          {
            isLoading ?
              (<div className={classes.sweet_loading}>
                <DotLoader color={color} loading={loading} css={override} size={80} />
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
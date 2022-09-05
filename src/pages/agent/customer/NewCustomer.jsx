import {Fragment,useEffect,useContext,useState} from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from '../../../services';
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import {Context} from "../../../context/Context";
import PageTitle from "../../../components/PageTitle"
import useStyles from './styles';
import {
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;





function genPassword() {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let passwordLength = 12;
  let password = "";
for (let i = 0; i <= passwordLength; i++) {
 let randomNumber = Math.floor(Math.random() * chars.length);
 password += chars.substring(randomNumber, randomNumber +1);
}
      return password;
}

function NewCustomer() {
  
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [loading,setLoading] = useState(true)
  const [color,setColor] = useState("#ADD8E6");
  const navigate = useNavigate();
  const {user} = useContext(Context);
  const [marketers,setMarketers] = useState([]);




  const [avatar, setAvatar] = useState("");
  const [id_document, setIdDocument] = useState("");
  const [utility_bill, setUtilityBill] = useState("");
 

    const gender = {
        male: "M",
        femalie: "F"
    }

    const currency = {
        dollar: "USD",
        naira: "NGN"
    }
  useEffect(() => {
    setIsLoading(true)

    const allMarketer = async() => {
      const res = await api.service().fetch("/accounts/manage/?is_staff=True&user_role=AGENT",true);
      // console.log(res.data)
      if(api.isSuccessful(res)){
        //   console.log(res)
        setMarketers(res.data.results)
      }

      setIsLoading(false);

    }

    allMarketer();
  },[])
  


  const handleAvatarOnChange = (file) => {
    setAvatar(file[0])
  }


  const handleUtilityOnChange = (file) => {
    setUtilityBill(file[0])
  }


  const handleDocOnChange = (file) => {
    setIdDocument(file[0])
  }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        // setLoading(false)
        let data = new FormData(e.target);
        // let tel = data.phone.toString();
        // tel = tel.substr(1)
        // let newPhone = "234"+tel;
        // let phone = new Number(newPhone)
        // console.log(phone)

        data.append("user_role","CUSTOMER");
        data.append("password",genPassword());
        data.append("avatar",avatar);
        data.append("id_document",id_document);
        data.append("utility_bill",utility_bill);
        data.append("country","Nigeria");
        data.append("agent_id",user.data.id);
        // data.append("phone",phone)
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

    const response = await api.service().push(`/accounts/manage/signup/?org_id=${user.data.organisation}`,data,true,true);

    if(api.isSuccessful(response)){
      setTimeout(() => {
        
        toast.success("Customer registration was successfully");
        navigate("/agent/dashboard/customer/newcustomer",{replace: true})
        setIsLoading(false)

      },0);
    }

        setIsLoading(false)
        // setLoading(false)

    }
  return (
    <Fragment>
    <PageTitle title={`${user.data.organisation_name}`} />
    <Box className={classes.formBox}>
        <Typography variant='h5'>New Customer</Typography>
        <form style={{ marginBottom: 30 }} onSubmit={handleSubmit} >
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Title</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    name='title'
                    type='text'
                    required
                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >First Name</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    name='first_name'
                    type='text'
                    required
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
                    name='middle_name'
                    type='text'
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
                    name='last_name'
                    type='text'
                    required
                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Gender</Typography>
                </div>
                <Select
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    name='gender'
                    type='text'
                >   
                    <MenuItem>Select One</MenuItem>
                    <MenuItem value={"M"} >Male</MenuItem>
                    <MenuItem value={"F"}>Female</MenuItem>
                </Select>
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Date of Birth</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    name='dob'
                    type="date"
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
                    onChange={(e)  => handleAvatarOnChange(e.target.files)}
                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >ID</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    type='file'
                    onChange={(e)  => handleDocOnChange(e.target.files)}                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Utility Bill</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    type='file'
                    onChange={(e)  => handleUtilityOnChange(e.target.files)}
                     />
            </div> 
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >BVN</Typography>
                </div>
                <TextField                                                                                                                                                                                                               
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    name='bvn'
                    type='text'
                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Currency</Typography>
                </div>
                <Select
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    name='currency'
                    type='text'
                >   
                    <MenuItem>Select One</MenuItem>
                    <MenuItem value={"NGN"} >NGN</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                </Select>
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >Email</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    name='email'
                    type='email'
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
                    name='residential_address'
                    type='text'
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
                    name='business_address'
                    type='text'
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
                    name='phone'
                    type='number'
                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >State</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    name='state'
                    type='text'
                />
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.label}>
                    <Typography >City</Typography>
                </div>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    size='small'
                    name='middle_name'
                    type='text'
                    required
                />
            </div>
            {/* <div className={classes.inputDiv}>
                        <div className={classes.label}>
                            <Typography >Marketer</Typography>
                        </div>
                    <Select
                        className={classes.input}
                        name="agent_id"  
                        variant='outlined'
                        fullWidth
                    >
                        {marketers.map((marketer) => {
                            return (
                            <MenuItem key={marketer.id} value={marketer.id}>
                                {marketer.first_name}
                            </MenuItem>
                            )
                        })}
                        </Select>
                </div> */}
                {
                            isLoading ? 
                              ( <div className={classes.sweet_loading}>
                                  <DotLoader color={color} loading={loading} css={override}  size={80} />
                                </div>)
                              : (
                                <Button type="submit" className={classes.btnSubmit}>Create Account</Button>
                              )
                          }      
              </form>
    </Box>
</Fragment>
  )
}

export default NewCustomer
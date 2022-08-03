import { Fragment, useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Formik, Form, useField,useFormikContext } from "formik";
import {object as yupObject,string as yupString,number as yupNumber} from "yup";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import { Box, Button, FormControl,Select, Typography,MenuItem } from '@material-ui/core'
import PageTitle from '../../../components/PageTitle/PageTitle'
import useStyles from './styles';
import {api} from "../../../services"
import {TextField} from "../../../components/FormsUI"



// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const NewBranch = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [bhead, setBHead] = useState("");
    const navigate = useNavigate();
    const [marketers,setMarketers] = useState([]);
  

  
  
    const initialFormState = () => ({
      name: "",
      branch_head_id: "",
      branch_address: "",
    });
  
    const validationSchema = yupObject().shape({
      name: yupString()
      .required("Branch name is required"),
      branch_address: yupString()
      .required("Branch Address is required"),
      branch_head_id: yupNumber()
    //   .required("This field is required")
    })
  
    useEffect(() => {
        try {
   
            const allMarketer = async() => {
                const res = await api.service().fetch("/accounts/manage/?is_staff=True",true);
                console.log(res.data.results)
                console.log("what is this runinnng")
                console.log(res.data)
                if(api.isSuccessful(res)){
                  setMarketers(res.data.results)
                }
          
                setIsLoading(false);
              }
              allMarketer();
        } catch (error) {
            console.log(error);
        }

                         setIsLoading(true)


    },[])


  
      const create_branch = async(values) => {
        try {
            setIsLoading(true);
            console.log(values)
  
            const response = await api
                  .service()
                  .push("dashboard/branches/create-branch/",values,true)
  
            if(api.isSuccessful(response)){
              setTimeout( () => {
                toast.success("Branch successfully created!");
                navigate("/admin/dashboard/branch/newbranch",{replace: true})
              },0);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error.message)
        }
      }

      
    return (
        <Fragment>
            <PageTitle title="FundHill" />
            <Box className={classes.formBox}>
                <Typography variant='h5'>Add New Branch</Typography>
                <Formik
                    initialValues={initialFormState()}
                    validationSchema={validationSchema}
                    onSubmit={ async(values) => {
                        await create_branch(values)
                    }}
                >
                    <Form style={{ marginBottom: 30 }} >
                    <div className={classes.inputDiv}>
                        <div className={classes.label}>
                            <Typography >Branch Name</Typography>
                        </div>
                        <TextField
                            name="name"
                            className={classes.input}
                            variant="outlined"
                            size='small'
                            type='text'
                            required
                        />
                    </div>
                    <div className={classes.inputDiv}>
                        <div className={classes.label}>
                            <Typography >Branch Head</Typography>
                        </div>
                    <TextField
                        select={true} 
                        className={classes.input}
                        name="branch_head_id"  
                        variant='outlined'
                        fullWidth={true}
                    >
                        {marketers.map((marketer) => {
                            return (
                            <MenuItem key={marketer.id} value={marketer.id}>
                                {marketer.first_name}
                            </MenuItem>
                            )
                        })}
                        </TextField>
                    </div>
                    <div className={classes.inputDiv}>
                        <div className={classes.label}>
                            <Typography >Branch Address</Typography>
                        </div>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            size='small'
                            name='branch_address'
                            type='text'
                            required
                        />
                    </div>
                    {
                            isLoading ? 
                              ( <div className="sweet-loading">
                                  <DotLoader color={color} loading={loading} css={override}  size={80} />
                                </div>)
                              : (
                                <Button type="submit" className={classes.btnSubmit}>Submit</Button>
                              )
                          }
                    </Form>
                </Formik>
                
            </Box>
        </Fragment>
    )
}

export default NewBranch
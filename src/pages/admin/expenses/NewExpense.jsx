import { Fragment,useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, useField,useFormikContext } from "formik";
import {object as yupObject,string as yupString,number as yupNumber} from "yup";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import {DotLoader} from "react-spinners";
import { Box, Button,Select, Typography,MenuItem, TextareaAutosize } from '@material-ui/core'
import PageTitle from '../../../components/PageTitle/PageTitle'
import useStyles from './styles';
import {api} from "../../../services"
import {Context} from "../../../context/Context";
import {TextField} from "../../../components/FormsUI";


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function NewExpense() {
    const classes = useStyles();

    const {user} = useContext(Context)
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [bhead, setBHead] = useState("");
    const navigate = useNavigate();
    const [marketers,setMarketers] = useState([]);
  
  
  
  
    const initialFormState = () => ({
      agent: "",
      amount: "",
      desc: "",
      // org_id: `${user.data.organisation}`,
    });
  
    const validationSchema = yupObject().shape({
      // agent: yupNumber()
      // .required("Select agent "),
      amount: yupNumber()
      .required("Branch Address is required"),
      desc: yupString()
      .required("Enter a description")
    })
  
    useEffect(() => {
        try {
                  // setIsLoading(true)
  
      const allMarketer = async() => {
        const res = await api.service().fetch("/accounts/manage/?is_staff=True",true);
        // console.log(res.data)
        if(api.isSuccessful(res)){
            console.log(res.data)
          setMarketers(res.data.results)
        }
  
        // setIsLoading(false);
  
      }
  
      allMarketer();
        } catch (error) {
            console.log(error)
        }
    },[])
  
      const add_expenses = async(values) => {
            try {
                setIsLoading(true);
                console.log(values)
      
                const response = await api
                      .service()
                      .push("dashboard/expense/add/",values,true)
      
                if(api.isSuccessful(response)){
                  setTimeout( () => {
                    toast.success("Expenses successfully saved!");
                    navigate("/admin/dashboard/expense/new_expenses",{replace: true})
                  },0);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
      }
  
  
  return (
<Fragment>
            <PageTitle title={`${user.data.organisation_name}`} />
            <Box className={classes.formBox}>
                <Typography variant='h5'>Add New Expense</Typography>
                <Formik
                    initialValues={initialFormState()}
                    validationSchema={validationSchema}
                    onSubmit={ async(values) => {
                        await add_expenses(values)
                    }}
                >
                    <Form style={{ marginBottom: 30 }} >
                    <div className={classes.inputDiv}>
                        <div className={classes.label}>
                            <Typography >Marketer</Typography>
                        </div>
                    <TextField
                        select={true} 
                        className={classes.input}
                        name="agent"  
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
                            <Typography >Amount</Typography>
                        </div>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            size='small'
                            name='amount'
                            type='number'
                        />
                    </div>

                    <div className={classes.inputDiv}>
                        <div className={classes.label}>
                            <Typography >Description</Typography>
                        </div>
                        <TextField
                            name="desc"
                            className={classes.input}
                            variant="outlined"
                            type='text'
                            fullWidth={true}
                        />
                    </div>

                    {
                            isLoading ? 
                              ( <div className={classes.sweet_loading}>
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

export default NewExpense
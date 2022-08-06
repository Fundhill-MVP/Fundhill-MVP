import {Fragment,useEffect,useContext,useState} from 'react'
import { Button } from '@mui/material';
// import "./Dashboard.css"
import { Formik, Form, Field } from "formik";
import {object as yupObject,string as yupString,number as yupNumber} from "yup";
import { toast } from "react-toastify";
import { api } from '../../../services';
import { css } from "@emotion/react";
import {BounceLoader} from "react-spinners";
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
} from "@material-ui/core";
import ActionButton from './PendingModal';

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function DeletedCustomer() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [Loading, setLoading] = useState(false)
    let [loading, setloading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const {user} = useContext(Context)
    const [data,setData] = useState([]);

    useEffect(() => {
        setIsLoading(true)

        const allCustomer = async() => {
          const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=DISABLED",true);
          console.log(res.data)
          if(api.isSuccessful(res)){
            setData(res.data.results)
          }
        setIsLoading(false);
    
        }

        allCustomer();
      },[])

      const savingsFormState = (id) => ({
        user: id,
        frequency: null,
        amount_per_cycle: null,
        duration_in_months: null,
        amount: null,
        plan_type: null
      });
    
    
      const savingsValidationSchema = yupObject().shape({
        user: yupNumber()
        .required("User is required"),
        frequency: yupString()
        .required("frequency is required"),
        amount_per_cycle: yupNumber()
        .required("Amount cycle is required"),
        duration_in_months: yupNumber()
        .required("Duration is required"),
        amount: yupNumber()
        .required("Amount is required"),
        plan_type: yupString()
        .required("Select a savings plan."),
      });


      const savings = async(values) => {
        setLoading(true);
        console.log(values)

        const response = await api
            .service()
            .push("/dashboard/savings-plan/add/",values,true)

        if(api.isSuccessful(response)){
        setTimeout( () => {
            toast.success("Savings Plan successfully added!");
            // navigate("/admin/allbranch",{replace: true})
        },0);
        }
        setLoading(false);
    }

    
    const activateCustomer = async(id) => {
        const res = await api.service().fetch(`https://fundhill-api.herokuapp.com/accounts/auth/${id}/activate/`,true);
        console.log(res.data)
        if(api.isSuccessful(res)){
            setTimeout( () => {
                toast.success("Successfully activated customer!");
            },0);
            }
  
      }
    const deactivateCustomer = async(id) => {
        const res = await api.service().fetch(`https://fundhill-api.herokuapp.com/accounts/auth/${id}/deactivate/`,true);
        console.log(res.data)
        if(api.isSuccessful(res)){
            setTimeout( () => {
                toast.success("Successfully deactivated customer!");
            },0);
            }
  
      }
      
  return (
<Fragment>
    <PageTitle title="Fundhill" />
    <Grid container spacing={4}>
      {
        isLoading ?
          (


            <div className="sweet-loading">
              <BounceLoader color={color} loading={loading} css={override} size={150} />
            </div>

          )
          :
          (
            <Grid item xs={12}>
              <Widget title="All Customers" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                <Table className="mb-0">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell >Full Name </TableCell>
                      <TableCell >Account Number </TableCell>
                      <TableCell >Telephone </TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Marketer</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((customer) => (
                      <TableRow key={customer?.id}>
                        <TableCell className="pl-3 fw-normal">{customer?.id}</TableCell>
                        <TableCell>{customer?.first_name} {customer?.last_name} </TableCell>
                        <TableCell>{customer?.bank_account_number}</TableCell>
                        <TableCell>{customer?.phone}</TableCell>
                        <TableCell>{customer?.email}</TableCell>
                        <TableCell>{customer?.agent.first_name} </TableCell>
                        <TableCell>
                          <Button
                            variant='contained'
                            style={{ textTransform: 'none', fontSize: 12, background: 'red' }}>
                            {customer?.status}
                          </Button>
                          </TableCell>
                        <TableCell>
                          <ActionButton customerId={customer?.id} />
                        </TableCell>
                      </TableRow>
                    ))
                    }
                  </TableBody>
                </Table>
              </Widget>
            </Grid>
          )
      }

    </Grid>
  </Fragment>
    )
}

export default DeletedCustomer
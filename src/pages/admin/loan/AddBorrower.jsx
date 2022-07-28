import {Fragment,useEffect,useContext,useState} from 'react'
import { useNavigate} from "react-router-dom";
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
import ActionButton from './ActionButton';


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



function AddBorrower() {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#ADD8E6");
    const {user} = useContext(Context)
    const [marketers,setMarketers] = useState([]);
    const [branches,setBranches] = useState([]);
    const [customers,setCustomers] = useState([]);
    const [products,setProducts] = useState([]);
    const navigate = useNavigate();


useEffect(() => {
    setIsLoading(true)

    const allCustomer = async() => {
        const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER",true);
        console.log(res.data)
        if(api.isSuccessful(res)){
          setCustomers(res.data.results)
        }
  
      // setIsLoading(false);
  
      }
  
      allCustomer();

    const allMarketer = async() => {
        const res = await api.service().fetch("/accounts/manage/?is_staff=True",true);
        console.log(res.data)
        if(api.isSuccessful(res)){
          //   console.log(res)
          setMarketers(res.data.results)
        }
  
        // setIsLoading(false);
  
      }

      allMarketer();

    const allBranches = async() => {
        const res = await api.service().fetch("/dashboard/branches/",true);
        console.log(res.data)
        if(api.isSuccessful(res)){
          setBranches(res.data.results)
        }
  
        setIsLoading(false);
  
      }

      allBranches();


      const newProduct = async() => {
            const res = await api
            .service()
            .fetch("/dashboard/loan-product",true);
            console.log(res.data.results)

            if((api.isSuccessful(res))){
            setProducts(res.data.results);
            setIsLoading(false)
            }
                }

        newProduct();

      setIsLoading(false);

  },[]);


            const initialFormState = (id) => ({
                borrower: id,
                loan_product: null,
                amount: null,
                branch: null,
                category: "",
                payment_frequency: "",
                loan_period_in_months: null,
                payment_schedule: "",
                loan_officer: null,
                organisation: user.data.organisation
            });

            const validationSchema = yupObject().shape({
                borrower: yupNumber()
                .required("Please select a valid customer"),
                loan_product: yupNumber()
                .required("Select a loan product"),
                amount: yupNumber()
                .required("Enter an amount to be disburse"),
                category: yupString()
                .required("Please select a category."),
                payment_frequency: yupString()
                .required("Select a payment frequency"),
                payment_schedule: yupString()
                .required("Select a payment schedule"),
                // branch: yupNumber()
                // .required("Select a branch name"),
                loan_period_in_months: yupNumber()
                .required("Enter loan period"),
                loan_officer: yupNumber()
                .required("Select a loan officer"),

            });

            const add_borrower = async(values) => {
                setLoader(true);
                console.log(values)

                const response = await api
                    .service()
                    .push("/dashboard/loan/add/",values,true)

                if(api.isSuccessful(response)){
                setTimeout( () => {
                    toast.success("Successfully assign loan!");
                    navigate("/admin/dashboard/add_borrower",{replace: true});
                },0);
                }
                setLoader(false);
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
                        <TableCell >Full Name </TableCell>
                        <TableCell >Account Number </TableCell>
                        <TableCell >Telephone </TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer?.id}>
                          <TableCell className="pl-3 fw-normal">{customer?.id}</TableCell>
                          <TableCell>{customer?.first_name} {customer?.last_name} </TableCell>
                          <TableCell>{customer?.account_number}</TableCell>
                          <TableCell>{customer?.phone}</TableCell>
                          <TableCell>{customer?.email}</TableCell>
                          <TableCell>{customer?.agent.first_name} </TableCell>
                          <TableCell>
                            <ActionButton />
                          </TableCell>
                        </TableRow>
                      ))}
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

export default AddBorrower
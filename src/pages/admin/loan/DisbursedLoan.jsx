import {Fragment,useEffect,useContext,useState} from 'react'
import { Link } from "react-router-dom";
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


function DisbursedLoan() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    let [color, setColor] = useState("#ADD8E6");
    const {user} = useContext(Context)
    const [data,setData] = useState([]);

    useEffect(() => {
        try {
            setIsLoading(true)

            const allCustomer = async() => {
              const res = await api.service().fetch("/dashboard/loan/?status=PENDING",true);
              console.log(res.data)
              if(api.isSuccessful(res)){
                setData(res.data.results)
              }
            setIsLoading(false);
        
            }
    
            allCustomer();
        } catch (error) {
            console.log(error)
        }
      },[])

      const approve_loan = async(values) => {
            try {
                setLoader(true);
                console.log(values)
        
                const response = await api
                    .service()
                    .push("/dashboard/loan/action/",values,true)
        
                if(api.isSuccessful(response)){
                setTimeout( () => {
                    toast.success("Successfully approved loan!");
                    // navigate("/admin/dashboard/add_borrower",{replace: true});
                },0);
                }
                setLoader(false);
            } catch (error) {
                console.log(error)
            }
    }

  return (
    <div>DisbursedLoan</div>
  )
}

export default DisbursedLoan
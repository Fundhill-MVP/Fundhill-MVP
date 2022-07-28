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


function MarketerAccount() {
  const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const {user} = useContext(Context);
    const [marketers,setMarketers] = useState([]);

    useEffect(() => {
        setIsLoading(true)

        const allMarketerWallet = async() => {
          const res = await api.service().fetch("/wallet/marketer/",true);
          console.log(res.data)
          if(api.isSuccessful(res)){
              console.log(res)
            setMarketers(res.data.results)
          }
    
          setIsLoading(false);
    
        }

        allMarketerWallet();
      },[])

      const edit_marketer = async(values,id) => {
        setLoading(true);
        console.log(values)

        const response = await api
            .service()
            .update(`/accounts/auth/${id}/`,values,true)

        if(api.isSuccessful(response)){
        setTimeout( () => {
            toast.success("Marketer profile successfully updated!!");
            // navigate("/admin/allbranch",{replace: true})
        },0);
        }
        setLoading(false);
    }
    const fund_marketer = async(values,id) => {
        setLoading(true);
        console.log(values)

        const response = await api
            .service()
            .push(`/wallet/marketer/${id}/fund-wallet/`,values,true)

        if(api.isSuccessful(response)){
        setTimeout( () => {
            toast.success("Transaction successful");
            // navigate("/admin/allbranch",{replace: true})
        },0);
        }
        setLoading(false);
    }



      const deleteMarketer = async(id) => {
        const res = await api.service().remove(`/accounts/auth/${id}/`,true);
        console.log(res.data)
        if(api.isSuccessful(res)){
            setTimeout( () => {
                toast.success("Successfully deleted marketer!");
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
                        <TableCell >Marketer ID </TableCell>
                        <TableCell >Full Name </TableCell>
                        <TableCell >Telephone </TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {marketers.map((marketer) => (
                        <TableRow key={marketer?.id}>
                          <TableCell className="pl-3 fw-normal">{marketer?.id}</TableCell>
                          <TableCell>{marketer?.first_name} {marketer?.last_name} </TableCell>
                          <TableCell>{marketer?.phone}</TableCell>
                          <TableCell>{marketer?.email}</TableCell>
                          <TableCell> {marketer?.balance} </TableCell>
                          <TableCell>{marketer?.user_role} </TableCell>
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

export default MarketerAccount
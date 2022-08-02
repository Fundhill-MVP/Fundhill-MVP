import { Fragment, useEffect, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
// import "./Dashboard.css"
import { Formik, Form, Field } from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { toast } from "react-toastify";
import { api } from '../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { Context } from "../../../context/Context";
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
import ActionButton from './ActionButtons/FeeActionButton';
import AddFees from './modals/AddFees';


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function Fees() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);
  const navigate = useNavigate();




  useEffect(() => {
    setIsLoading(true)

    const allFees = async () => {
      try {
        const fees = await api
          .service()
          .fetch("/dashboard/fees/", true);
        console.log(fees.data.results)

        if ((api.isSuccessful(fees))) {
          setData(fees.data.results);
          setIsLoading(false)
        } else {
          setIsLoading(true)
        }
      } catch (error) {
        console.log(error.message)
      }

    }

    allFees();
  }, [])

  const initialFormState = () => ({
    name: "",
    percentage: 0,
  });

  const validationSchema = yupObject().shape({
    name: yupString()
      .required("What type of interest rate is this"),
    percentage: yupNumber()
      .required("Enter a percentage"),
  });

  const add_fee = async (values) => {
    setIsLoading(true);

    try {
      console.log(values)

      const response = await api
        .service()
        .push("/dashboard/fees/add/", values, true)

      if (api.isSuccessful(response)) {
        setTimeout(() => {
          toast.success("Fees created successfully!");
          // navigate("/dashboard/interest-rates/",{replace: true});
        }, 0);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message)
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
                <Widget title="All Fees" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <AddFees />
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell > Fee ID </TableCell>
                        <TableCell > Name </TableCell>
                        <TableCell > Percentage (%) </TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((interest) => (
                        <TableRow key={interest?.id}>
                          <TableCell className="pl-3 fw-normal">{interest?.id}</TableCell>
                          <TableCell>{interest?.name} </TableCell>
                          <TableCell>{interest?.percentage}</TableCell>
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

export default Fees
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
import ActionButton from './ActionButtons/ActionButton';
import AddNewInterest from './modals/AddNewInterest';


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function InterestRate() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    setIsLoading(true)

    const interestRate = async () => {
      try {
        const interests = await api
          .service()
          .fetch("/dashboard/interest-rates/", true);
        console.log(interests.data.results)

        if ((api.isSuccessful(interests))) {
          setData(interests.data.results);
          setIsLoading(false)
        } else {
          setIsLoading(true)
        }
      } catch (error) {
        console.log(error.message)
      }

    }

    interestRate();
  }, [])

  const initialFormState = () => ({
    name: "",
    percentage: 0,
    minimum_time_in_months: 0,
    maximum_time_in_months: 0
  });

  const validationSchema = yupObject().shape({
    name: yupString()
      .required("What type of interest rate is this"),
    percentage: yupNumber()
      .required("Enter a percentage"),
    minimum_time_in_months: yupNumber()
      .required("minimum time in months"),
    maximum_time_in_months: yupNumber()
      .required("maximum time in months"),
  });

  const add_interest = async (values) => {
    setIsLoading(true);

    try {
      console.log(values)

      const response = await api
        .service()
        .push("/dashboard/interest-rates/add/", values, true)

      if (api.isSuccessful(response)) {
        setTimeout(() => {
          toast.success("Interest rate successfully created!");
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


              <div className={classes.sweet_loading}>
                <BounceLoader color={color} loading={loading} css={override} size={150} />
              </div>

            )
            :
            (
              <Grid item xs={12}>
                <Widget title="All Interest Rates" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <AddNewInterest />
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >ID</TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell > Percentage (%) </TableCell>
                        <TableCell> Minimum Time in Month </TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((interest) => (
                        <TableRow key={interest?.id}>
                          <TableCell className="pl-3 fw-normal">{interest?.id}</TableCell>
                          <TableCell>{interest?.name} </TableCell>
                          <TableCell>{interest?.percentage}</TableCell>
                          <TableCell>{interest?.minimum_time_in_months}</TableCell>
                          <TableCell>
                            <ActionButton setInterest={interest?.id} />
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

export default InterestRate
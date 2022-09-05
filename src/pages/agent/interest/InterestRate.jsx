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
import { on } from '../../../events';


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



  const interestRate = async () => {
    setIsLoading(true)
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

  }

  useEffect(() => {
    interestRate();
  }, [])
  on("reRenderInterestRates",interestRate)


  return (
    <Fragment>
      <PageTitle title={`${user.data.organisation_name}`} />
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
                            <ActionButton setInterestRateId={interest?.id} />
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
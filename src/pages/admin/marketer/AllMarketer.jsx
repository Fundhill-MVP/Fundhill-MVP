import { Fragment, useEffect, useContext, useState } from 'react'
import { Link } from "react-router-dom";
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
import ActionButton from './ActionButton';
import {on} from "../../../events";

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function AllMarketer() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context);
  const [marketers, setMarketers] = useState([]);

  const allMarketer = async () => {
    setIsLoading(true)
    const res = await api.service().fetch("/accounts/manage/?is_staff=True&status=VERIFIED", true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      setMarketers(res.data.results)
      setIsLoading(false);
    }

    setIsLoading(false);

  }

  useEffect(() => {

    allMarketer();
  }, [])
  on("reRenderAllMarketer",allMarketer);

 



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
                <Widget title="All Marketers" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >Marketer ID </TableCell>
                        <TableCell >Full Name </TableCell>
                        <TableCell >Telephone </TableCell>
                        <TableCell>Email</TableCell>
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
                          <TableCell>{marketer?.user_role} </TableCell>
                          <TableCell>
                            <ActionButton setCurrentId={marketer?.id} />
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

export default AllMarketer
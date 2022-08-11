import { Fragment, useState, useEffect, useContext } from 'react'
import { makeStyles } from "@material-ui/styles";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { api } from '../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import MUIDataTable from "mui-datatables";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
} from "@material-ui/core";
//   import useStyles from "./styles";
import PageTitle from "../../../components/PageTitle"
import Widget from "../../../components/Widget/Widget";
import { Context } from "../../../context/Context"
import ActionButton from './ActionButton';



const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))
function AllBranches() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const [data, setData] = useState([]);
  const { user } = useContext(Context);
  const [marketers, setMarketers] = useState([]);
  const navigate = useNavigate();
  const [currentId,setCurrentId] = useState("");

  //  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  //  keys.shift(); // delete "id" key


  useEffect(() => {
    setIsLoading(true)

    const allBranch = async () => {
      const res = await api.service().fetch("/dashboard/branches/", true);
      console.log(res.data)
      if (api.isSuccessful(res)) {
        setData(res.data.results)
      }

      setIsLoading(false);

    }

    allBranch();
  }, [])



  const allBranch = async () => {
    setIsLoading(true)
    const res = await api.service().fetch("/dashboard/branches/", true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      setData(res.data.results)
    }

    setIsLoading(false);

  }


  const deleteBranch = async (id) => {
    const res = await api.service().remove(`/dashboard/branches/${id}/`, true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      setTimeout(() => {
        toast.success("Successfully deleted branch?!");
        allBranch();
        // setIsLoading(true)

        // const allBranches = async() => {
        //   const res = await api.service().fetch("/dashboard/branches/",true);
        //   console.log(res.data)
        //   if(api.isSuccessful(res)){
        //     setData(res.data.results)
        //   }

        //   setIsLoading(false);

        // }

        // allBranches();


      }, 0);
    }

  }

  const edit_branch = async (values, id) => {
    setLoading(true);
    console.log(values)

    const response = await api
      .service()
      .update(`/dashboard/branches/${id}/`, values, true)

    if (api.isSuccessful(response)) {
      setTimeout(() => {
        toast.success("branch? successfully updated!!");
        // navigate("/admin/dashboard/branch/allbranch",{replace: true})
        allBranch();
      }, 0);
    }
    setLoading(false);
  }


  useEffect(() => {
    setIsLoading(true)

    const allMarketer = async () => {
      const res = await api.service().fetch("/accounts/manage/?is_staff=True&user_role=AGENT", true);
      // console.log(res.data)
      if (api.isSuccessful(res)) {
        //   console.log(res)
        setMarketers(res.data.results)
      }

      setIsLoading(false);

    }

    allMarketer();
  }, [])

  return (
    <Fragment>
      <PageTitle title={`${user.data.organisation_name}`} />
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
                <Widget title="All Branches" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >Branch ID </TableCell>
                        <TableCell >Branch Name </TableCell>
                        <TableCell >Branch Branch Location </TableCell>
                        <TableCell>Head of Branch</TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((branch) => (
                        <TableRow key={branch?.id}>
                          <TableCell className="pl-3 fw-normal">{branch?.id}</TableCell>
                          <TableCell>{branch?.name}</TableCell>
                          <TableCell>{branch?.branch_address}</TableCell>
                          <TableCell>{branch?.branch_head.first_name} {branch?.branch_head.last_name}</TableCell>
                          <TableCell>
                            <ActionButton setCurrentId={branch?.id}  />
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

export default AllBranches


import { Fragment, useState, useEffect, useContext } from 'react'
import { makeStyles } from "@material-ui/styles";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { api } from '../../../../services';
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
  import useStyles from "../styles";
import PageTitle from "../../../../components/PageTitle"
import Widget from "../../../../components/Widget/Widget";
import { Context } from "../../../../context/Context"
import ActionButton from './ActionButton';
import {on} from "../../../../events"


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
// const useStyles = makeStyles(theme => ({
//   tableOverflow: {
//     overflow: 'auto'
//   }
// }))
function GroupPlan() {
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




  const allGroup = async () => {
    setIsLoading(true)
    const res = await api.service().fetch("/accounts/group/", true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      setData(res.data.results)
    }

    setIsLoading(false);

  }
  useEffect(() => {
    allGroup();
  }, []);
  on("reRenderAllGroup",allGroup)









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
                <Widget title="All Groups" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >Group ID </TableCell>
                        <TableCell >Group Name </TableCell>
                        <TableCell >Group Description </TableCell>
                        {/* <TableCell>Head of group</TableCell> */}
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((group) => (
                        <TableRow key={group?.id}>
                          <TableCell className="pl-3 fw-normal">{group?.id}</TableCell>
                          <TableCell>{group?.name}</TableCell>
                          <TableCell>{group?.description}</TableCell>
                          {/* <TableCell>{group?.branch_head.first_name} {group?.branch_head.last_name}</TableCell> */}
                          <TableCell>
                            <ActionButton groupId={group?.id}  />
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

export default GroupPlan


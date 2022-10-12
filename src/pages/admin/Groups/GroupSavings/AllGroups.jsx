import { Fragment, useState, useEffect, useContext } from 'react'
import { makeStyles } from "@material-ui/styles";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { on } from "../../../../events"
import MemberButton from './MemberButton';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';



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
function AllGroups() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const [data, setData] = useState([]);
  const { user } = useContext(Context);
  const [marketers, setMarketers] = useState([]);
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState("");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  //  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  //  keys.shift(); // delete "id" key




  const allGroup = async () => {
    setIsLoading(true)
    const res = await api.service().fetch(`/accounts/group/?limit=${limit}&offset=${offset}`, true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      setData(res.data.results)
      setCount(res.data.count)
    }

    setIsLoading(false);

  }

  const nextPage = () => {
    setSearchParams({ page: currentPage + 1 })
    setCurrentPage(currentPage + 1);
    setOffset(offset + limit)
    console.clear()
    console.log(offset)
  }

  const previousPage = () => {
    setSearchParams({ page: currentPage - 1 })
    setCurrentPage(currentPage - 1);
    setOffset(offset - limit)
    console.clear()
    console.log(offset)
  }

  const handleRowPerPage = (event) => {
    setLimit(event.target.value)
  }

  const isNextBtnDisabled = () => count > offset && (offset + limit) < count
  const isPrevBtnDisabled = () => offset > 0

  useEffect(() => {
    allGroup();
  }, [])
  on("reRenderAllGroup", allGroup)


  useEffect(() => {
    if (queryPage === null) {
      setSearchParams({ page: currentPage })
    }
  }, [])

  useEffect(() => {
    allGroup();
  }, [offset, limit])

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
                        <TableCell > S/N </TableCell>
                        <TableCell >Group Name </TableCell>
                        <TableCell >Group Description </TableCell>
                        <TableCell>Group Members</TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((group, index) => (
                        <TableRow key={group?.id}>
                          <TableCell className="pl-3 fw-normal">{++index}</TableCell>
                          <TableCell>{group?.name}</TableCell>
                          <TableCell>{group?.description}</TableCell>
                          <TableCell>
                            <MemberButton groupId={group?.id} />
                          </TableCell>
                          <TableCell>
                            <ActionButton groupId={group?.id} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className={classes.paginationContain}>
                    <div className={classes.paginateRow}>
                      <FormControl sx={{ m: 1 }} size="small">
                        <InputLabel id="demo-select-small">Row Per Page</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={limit}
                          label="Row Per Page"
                          onChange={handleRowPerPage}
                        >
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className={classes.paginate}>
                      <Button
                        size='small'
                        disabled={!isPrevBtnDisabled()}
                        onClick={previousPage}>
                        previous
                      </Button>
                      <Button
                        size='small'
                        disabled={!isNextBtnDisabled()}
                        onClick={nextPage}>
                        next
                      </Button>
                    </div>
                  </div>
                </Widget>
              </Grid>
            )
        }

      </Grid>
    </Fragment>
  )
}

export default AllGroups


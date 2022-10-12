import { Fragment, useEffect, useContext, useState } from 'react'
import { Link, useSearchParams } from "react-router-dom";
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
import { on } from "../../../events";
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const allMarketer = async () => {
    setIsLoading(true)
    const res = await api.service().fetch(`/accounts/manage/?is_staff=True&status=VERIFIED?limit=${limit}&offset=${offset}`, true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      setMarketers(res.data.results)
      setCount(res.data.count)
      setIsLoading(false);
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

    allMarketer();
  }, [])
  on("reRenderAllMarketer", allMarketer);


  useEffect(() => {
    if (queryPage === null) {
      setSearchParams({ page: currentPage })
    }
  }, [])

  useEffect(() => {
    allMarketer();
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
                      {marketers.map((marketer, index) => (
                        <TableRow key={marketer?.id}>
                          <TableCell className="pl-3 fw-normal">{++index}</TableCell>
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

export default AllMarketer
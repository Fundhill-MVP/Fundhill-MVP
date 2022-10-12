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
import Reciept from '../reciept';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



function OngoingLoan() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    try {
      setIsLoading(true)

      const allCustomer = async () => {
        const res = await api.service().fetch(`/dashboard/loan/?status=PENDING?limit=${limit}&offset=${offset}`, true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
          setData(res.data.results)
          setCount(res.data.count)
        }
        setIsLoading(false);

      }

      allCustomer();
    } catch (error) {
      console.log(error)
    }
  }, [offset, limit])

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
    if (queryPage === null) {
      setSearchParams({ page: currentPage })
    }
  }, [])

  const approve_loan = async (values) => {
    try {
      setLoader(true);
      console.log(values)

      const response = await api
        .service()
        .push("/dashboard/loan/action/", values, true)

      if (api.isSuccessful(response)) {
        setTimeout(() => {
          toast.success("Successfully approved loan!");
          // navigate("/admin/dashboard/add_borrower",{replace: true});
        }, 0);
      }
      setLoader(false);
    } catch (error) {
      console.log(error)
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
                <Widget title="All Customers" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell > Names </TableCell>
                        <TableCell > Amount + Interest </TableCell>
                        <TableCell > Account Number </TableCell>
                        <TableCell> Loan Product </TableCell>
                        <TableCell> Payback Date </TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((customer, index) => (
                        <TableRow key={customer?.id}>
                          <TableCell className="pl-3 fw-normal">{++index}</TableCell>
                          <TableCell>{customer?.borrower?.first_name} {customer?.borrower?.last_name} </TableCell>
                          <TableCell>{customer?.amount_to_repay}</TableCell>
                          <TableCell>{customer?.account_number}</TableCell>
                          <TableCell>{customer?.loan_product.name}</TableCell>
                          <TableCell>{customer?.final_due_date}</TableCell>
                          <TableCell>{customer?.date_created} </TableCell>
                          <TableCell>{customer?.status}</TableCell>
                          <TableCell>
                            <ActionButton />
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
        <Reciept />
      </Grid>
    </Fragment>
  )
}

export default OngoingLoan
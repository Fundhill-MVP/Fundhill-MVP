import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "./styles";
import { Fragment, useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import { api } from '../../../services';
import { useSearchParams } from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


// const useStyles = makeStyles(theme => ({
//     tableOverflow: {
//         overflow: 'auto'
//     }
// }))

const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;

const TotalWithdrawals = () => {
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
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      const allDeposits = async () => {
        const res = await api.service().fetch(`/dashboard/transactions/?min_date=${today}&max_date=${today}&trx_type=WITHDRAWAL?limit=${limit}&offset=${offset}`, true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
          setData(res.data.results)
          setCount(res.data.count)

        }
        setIsLoading(false);

      }

      allDeposits();
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

  return (
    <Fragment>
      <PageTitle title="All Withdrawals made today" />
      <Grid container spacing={4}>

        {
          isLoading ?
            (


              <div className={classes.sweet_loading}>
                <BounceLoader color={color} loading={loading} css={override} size={150} />
              </div>

            ) :
            (
              <Grid item xs={12}>
                <Widget title="Withdraw" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >S/N </TableCell>
                        <TableCell >Date</TableCell>
                        <TableCell >Amount</TableCell>
                        <TableCell>Depositors Name</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Marketer</TableCell>
                        <TableCell>Account Number</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((tranx, index) => (
                        <TableRow key={tranx?.id} >
                          <TableCell className="pl-3 fw-normal"> {++index} </TableCell>
                          <TableCell> {tranx?.created_date} </TableCell>
                          <TableCell> {tranx?.amount} </TableCell>
                          <TableCell> {tranx?._from?.first_name} {tranx?._from?.last_name} </TableCell>
                          <TableCell> {tranx?._from?.agent?.first_name} {tranx?._from?.agent?.last_name} </TableCell>
                          <TableCell> {tranx?._from?.bank_account_number} </TableCell>
                          <TableCell> {tranx?.status} </TableCell>
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

export default TotalWithdrawals
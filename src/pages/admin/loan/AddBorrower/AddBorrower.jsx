import { Fragment, useEffect, useContext, useState } from 'react'
import { api } from '../../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { Context } from "../../../../context/Context";
import PageTitle from "../../../../components/PageTitle/PageTitle"
import Widget from "../../../../components/Widget/Widget";
import useStyles from '../styles';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
} from "@material-ui/core";
import OptionModal from './Modal';
import { on } from '../../../../events';
import { useSearchParams } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function AddBorrower() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [customers, setCustomers] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const loanCustomer = async () => {
    setIsLoading(true)
    const res = await api.service().fetch(`/accounts/manage/?user_role=CUSTOMER&status=VERIFIED?limit=${limit}&offset=${offset}`, true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      setCustomers(res.data.results)
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
    loanCustomer();

  }, [])
  on("reRenderLoanCustomer", loanCustomer)

  useEffect(() => {
    if (queryPage === null) {
      setSearchParams({ page: currentPage })
    }
  }, [])

  useEffect(() => {
    loanCustomer();
  }, [offset, limit])

  return (
    <Fragment>
      <PageTitle title={`${user.data.organisation_name}`} />
      <Grid container spacing={4}>
        {
          isLoading ?
            (
              (
                <div className={classes.sweet_loading}>
                  <BounceLoader color={color} loading={loading} css={override} size={150} />
                </div>

              )

            )
            :
            (
              <Grid item xs={12}>
                <Widget title="All Customers" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >S/N</TableCell>
                        <TableCell >Full Name</TableCell>
                        <TableCell>Account Number</TableCell>
                        <TableCell>Wallet Balance</TableCell>
                        <TableCell >Telephone </TableCell>
                        <TableCell>Email</TableCell>
                        {/* <TableCell >Group Loan</TableCell> */}
                        <TableCell>Single Loan</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers.map((customer, index) => (
                        <TableRow key={customer.id} >
                          <TableCell className="pl-3 fw-normal"> {++index} </TableCell>
                          <TableCell> {customer.first_name} {customer.last_name}	</TableCell>
                          <TableCell> {customer.bank_account_number} </TableCell>
                          <TableCell> {parseInt(customer.wallet.balance)} </TableCell>
                          <TableCell> {customer.phone} </TableCell>
                          <TableCell> {customer.email}	</TableCell>
                          {/* <TableCell><CheckBox /></TableCell> */}
                          {/* <TableCell>	{customer.agent.first_name} </TableCell> */}
                          <TableCell>
                            <OptionModal customerId={customer?.id} />
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

export default AddBorrower
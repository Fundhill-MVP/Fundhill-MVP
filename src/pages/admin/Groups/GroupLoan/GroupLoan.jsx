import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { Fragment, useState, useEffect, useContext } from 'react'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import Widget from '../../../../components/Widget/Widget'
import useStyles from './styles';
import ActionButton from './PendingButton';
import AddLoan from './Modal';

import { api } from '../../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { Context } from "../../../../context/Context";
import { on } from "../../../../events";
import { useSearchParams } from 'react-router-dom';



// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const GroupLoan = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const [loans, setLoans] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const { user } = useContext(Context);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const allGroupLoan = async () => {
    setIsLoading(true)
    const res = await api.service().fetch(`/dashboard/group-loan/?status=PENDING?limit=${limit}&offset=${offset}`, true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      // console.log(res.data.results)
      setLoans(res.data.results)
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
    allGroupLoan();

  }, []);
  on("reRenderGroupLoan", allGroupLoan)


  useEffect(() => {
    if (queryPage === null) {
      setSearchParams({ page: currentPage })
    }
  }, [])

  useEffect(() => {
    allGroupLoan();
  }, [offset, limit])
  return (
    <Fragment>
      <PageTitle title={`${user.data.organisation_name}`} />
      <Container>
        <Widget title="Group Loan" upperTitle noBodyPadding >
          <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}>
            <AddLoan />
          </div>
          {
            isLoading ?
              (
                <div className={classes.sweet_loading}>
                  <BounceLoader color={color} loading={loading} css={override} size={150} />
                </div>
              ) :
              (
                <Table className="mb-0">
                  <TableHead>
                    <TableRow>
                      <TableCell > S/N </TableCell>
                      <TableCell >Group Name</TableCell>
                      <TableCell >Amount</TableCell>
                      <TableCell>Amount to Repay</TableCell>
                      <TableCell>Loan officer</TableCell>
                      <TableCell>Loan Product</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Payment Schedule</TableCell>
                      <TableCell>Date Disburse</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Loan Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loans.map((loan, index) => (
                      <TableRow key={loan?.id}>
                        <TableCell className="pl-3 fw-normal">{++index}</TableCell>
                        <TableCell>{loan?.group?.name}  </TableCell>
                        <TableCell>{loan?.amount}</TableCell>
                        <TableCell>{loan?.amount_to_repay}</TableCell>
                        <TableCell>{loan?.loan_officer.first_name}</TableCell>
                        <TableCell>{loan?.loan_product.name}</TableCell>
                        <TableCell>{loan?.category}</TableCell>
                        <TableCell>{loan?.payment_frequency}</TableCell>
                        <TableCell>{loan?.payment_schedule}</TableCell>
                        <TableCell>{loan?.date_created} </TableCell>
                        <TableCell>{loan?.final_due_date_time}</TableCell>
                        <TableCell>
                          <Button
                            variant='contained'
                            style={{ textTransform: 'none', fontSize: 12, background: 'red' }}>
                            {loan?.status}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <ActionButton loanId={loan?.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
          }
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
      </Container>
    </Fragment>
  )
}

export default GroupLoan
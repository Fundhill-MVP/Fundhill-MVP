import { useState, Fragment, useEffect, useContext } from "react";
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import useStyles from './styles';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
} from "@material-ui/core";
import ActionButton from './ActionButtons/FeeActionButton';
import PageTitle from "../../../components/PageTitle"
import Widget from "../../../components/Widget/Widget";
import AddFees from './modals/AddFees';
import { api } from '../../../services';
import { Context } from "../../../context/Context";
import { on } from "../../../events";
import { useSearchParams } from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function Fees() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const [data, setData] = useState([]);
  const [feeId, setFeeId] = useState("");
  const { user } = useContext(Context);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const allFees = async () => {
    setIsLoading(true)
    const fees = await api
      .service()
      .fetch(`/dashboard/fees/?limit=${limit}&offset=${offset}`, true);
    console.log(fees.data.results)

    if ((api.isSuccessful(fees))) {
      setData(fees.data.results);
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
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

    allFees();
  }, []);
  on("reRenderFees", allFees)


  useEffect(() => {
    if (queryPage === null) {
      setSearchParams({ page: currentPage })
    }
  }, [])

  useEffect(() => {
    allFees();
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
                <Widget title="All Fees" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <AddFees />
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell > S/N </TableCell>
                        <TableCell > Name </TableCell>
                        <TableCell > Percentage (%) </TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((fee, index) => (
                        <TableRow key={fee?.id}>
                          <TableCell className="pl-3 fw-normal">{++index}</TableCell>
                          <TableCell>{fee?.name} </TableCell>
                          <TableCell>{fee?.percentage}</TableCell>
                          <TableCell>
                            <ActionButton setFeeId={fee?.id} />
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

export default Fees
import { Fragment, useEffect, useContext, useState } from 'react'
// import "./Dashboard.css"
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
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
import {on} from "../../../events"

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;




function AllExpenses() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context);
  const [expenses, setExpenses] = useState([]);
  // const [currentId,setCurrentId] = useState("");


  const allExpenses = async () => {
    setIsLoading(true)
    const res = await api.service().fetch("/dashboard/expense/", true);
    console.log(res.data)
    if (api.isSuccessful(res)) {
      console.log(res.data.results)
      setExpenses(res.data.results)
    }

    setIsLoading(false);

  }

  useEffect(() => {
    allExpenses()
  }, []);
  on("reRenderExpenses",allExpenses)

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
                <Widget title="All Expenses" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >Expense ID </TableCell>
                        <TableCell >Marketer Expense </TableCell>
                        <TableCell >Expense Amount </TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {expenses.map((expense) => (
                        <TableRow key={expense?.id}>
                          <TableCell className="pl-3 fw-normal">{expense?.id}</TableCell>
                          <TableCell>{expense?.agent?.first_name} {expense?.agent?.last_name} </TableCell>
                          <TableCell>{expense?.amount}</TableCell>
                          <TableCell>{expense?.description}</TableCell>
                          <TableCell>
                            <ActionButton setExpenseId={expense?.id} />
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

export default AllExpenses
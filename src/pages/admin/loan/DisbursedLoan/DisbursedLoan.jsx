import { Fragment, useEffect, useContext, useState } from 'react'
import { Link } from "react-router-dom";
// import "./Dashboard.css"
import { Formik, Form, Field } from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { toast } from "react-toastify";
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
import ActionButton from './ActionButton';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';


// CONTEXT
// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function DisbursedLoan() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  useEffect(() => {
    try {
      setIsLoading(true)

      const allCustomer = async () => {
        const res = await api.service().fetch("/dashboard/loan/?status=PENDING", true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
          setData(res.data.results)
        }
        setIsLoading(false);

      }

      allCustomer();
    } catch (error) {
      console.log(error)
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
      <PageTitle title="Disbursed Loan" />

      <Paper className={classes.paper}>
        <Typography variant='h6' gutterBottom>Search Date Transaction</Typography>

        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={classes.formDiv}>
            <div className={classes.divTypo}><Typography>From</Typography></div>
            <TextField fullWidth variant='outlined' type="date" name="" size='small' placeholder='mm/dd/yyyy' required />

          </div>
          <div className={classes.formDiv}>
            <div className={classes.divTypo}><Typography>To</Typography></div>
            <TextField fullWidth variant='outlined' type="date" name="" size='small' placeholder='mm/dd/yyyy' required />

          </div>
          <div className={classes.formDiv}>
            <div className={classes.divTypo}><Typography>Branch</Typography></div>
            <FormControl size='small' fullWidth>
              <InputLabel id="demo-multiple-name-label">Select Branch</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button style={{ marginTop: 10 }} variant='contained'>Search</Button>
        </form>
      </Paper>

      <Paper sx={{ mt: 5 }} className={classes.paper}>
        <Widget title="All Disbursed Loan" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
          <Table className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell >ID</TableCell>
                <TableCell > Loan Officer</TableCell>
                <TableCell > Client Names </TableCell>
                <TableCell> Account Number </TableCell>
                <TableCell> Client Contact </TableCell>
                <TableCell> Loan ID </TableCell>
                <TableCell> Principal </TableCell>
                <TableCell> Loan + Interest </TableCell>
                <TableCell> Product </TableCell>
                <TableCell> Category </TableCell>
                <TableCell>Action</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell className="pl-3 fw-normal">23</TableCell>
                <TableCell >Daniel Yusuf</TableCell>
                <TableCell>Yakuku John</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>08080080808</TableCell>
                <TableCell>123456</TableCell>
                <TableCell>5000000</TableCell>
                <TableCell>5400000</TableCell>
                <TableCell>Student Loan</TableCell>
                <TableCell>Fixed</TableCell>
                <TableCell>
                  <ActionButton />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Widget>
      </Paper>
    </Fragment>
  )
}

export default DisbursedLoan
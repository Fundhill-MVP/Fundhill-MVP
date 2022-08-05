import { useState, Fragment, useEffect } from "react";
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



  useEffect(() => {
    setIsLoading(true)

    const allFees = async () => {
      try {
        const fees = await api
          .service()
          .fetch("/dashboard/fees/", true);
        console.log(fees.data.results)

        if ((api.isSuccessful(fees))) {
          setData(fees.data.results);
          setIsLoading(false)
        } else {
          setIsLoading(true)
        }
      } catch (error) {
        console.log(error.message)
      }

    }

    allFees();
  }, [])



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
                <Widget title="All Fees" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <AddFees />
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell > Fee ID </TableCell>
                        <TableCell > Name </TableCell>
                        <TableCell > Percentage (%) </TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((fee) => (
                        <TableRow key={fee?.id}>
                          <TableCell className="pl-3 fw-normal">{fee?.id}</TableCell>
                          <TableCell>{fee?.name} </TableCell>
                          <TableCell>{fee?.percentage}</TableCell>
                          <TableCell>
                            <ActionButton setFeeId={fee?.id} />
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

export default Fees
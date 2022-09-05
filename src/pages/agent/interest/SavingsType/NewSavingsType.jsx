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
import ActionButton from './ActionButton';
import AddNewProduct from './AddNewProduct';
import {on} from "../../../../events";

// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



function SavingsType() {

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);

  const savingsType = async () => {
    setIsLoading(true)
    const products = await api
      .service()
      .fetch("/dashboard/savings-plan-type/", true);
    console.log(products.data.results)
    console.log(products.data.results[0].is_periodic)

    if ((api.isSuccessful(products))) {
      setData(products?.data?.results);
      setIsLoading(false)

    } else {
      setIsLoading(true)
    }
  }


    useEffect(() => {
       savingsType();
    },[])

  on("reRenderSavingsType", savingsType)




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
                <Widget title="All Savings Products" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <AddNewProduct />
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell > ID </TableCell>
                        <TableCell >Name </TableCell>
                        <TableCell > Marketer Earnings </TableCell>
                        <TableCell > Is Periodic </TableCell>
                        <TableCell> Number of Cycles to Charge </TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((product) => (
                        <TableRow key={product?.id}>
                          <TableCell className="pl-3 fw-normal">{product?.id}</TableCell>
                          <TableCell >{product?.name}</TableCell>
                          <TableCell>{product?.marketer_earnings}</TableCell>
                          <TableCell> {product.is_periodic.toString()}</TableCell>
                          <TableCell>{product?.number_of_cycles_to_charge}</TableCell>
                          <TableCell>
                            <ActionButton productId={product?.id} />
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

export default SavingsType
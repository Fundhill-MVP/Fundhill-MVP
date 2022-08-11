import { Fragment, useEffect, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
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
import AddNewProduct from './AddNewProduct';


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



function NewProduct() {

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const { user } = useContext(Context)
  const [data, setData] = useState([]);
  const navigate = useNavigate();




  useEffect(() => {
    try {
      setIsLoading(true)

      const newProduct = async () => {
        const products = await api
          .service()
          .fetch("/dashboard/loan-product", true);
        console.log(products.data.results)

        if ((api.isSuccessful(products))) {
          setData(products.data.results);
          setIsLoading(false)
        } else {
          setIsLoading(true)
        }
      }
      newProduct();
    } catch (error) {
      console.log(error)
    }

  }, [])

  const initialFormState = () => ({
    name: "",
    mgt_charges: null,
    interest: null,
  });

  const validationSchema = yupObject().shape({
    name: yupString()
      .required("Product name is required"),
    mgt_charges: yupNumber()
      .required("Managment Charges is required"),
    interest: yupNumber()
      .required("interest rate is required"),
  });

  const add_product = async (values) => {
    try {
      setIsLoading(true);
      console.log(values)

      const response = await api
        .service()
        .push("dashboard/loan-product/add/", values, true)

      if (api.isSuccessful(response)) {
        setTimeout(() => {
          toast.success("Loan Product successfully created!");
          // navigate("/dashboard/loan-product",{replace: true});
        }, 0);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
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
                <Widget title="All Loan Products" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                  <AddNewProduct />
                  <Table className="mb-0">
                    <TableHead>
                      <TableRow>
                        <TableCell >Product ID </TableCell>
                        <TableCell > Product </TableCell>
                        <TableCell > Interest (%) </TableCell>
                        <TableCell> MGT Charges (%) </TableCell>
                        <TableCell>Action</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((product) => (
                        <TableRow key={product?.id}>
                          <TableCell className="pl-3 fw-normal">{product?.id}</TableCell>
                          <TableCell >{product?.name}</TableCell>
                          <TableCell>{product?.interest}</TableCell>
                          <TableCell>{product?.mgt_charges}</TableCell>
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

export default NewProduct
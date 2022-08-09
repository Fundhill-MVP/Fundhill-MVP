import { Box, Divider, Fab, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { Fragment, useEffect, useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import useStyles from './styles';
import PrintIcon from '@mui/icons-material/Print';
import { api } from '../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
// import { Context } from "../../../context/Context";

import { Button } from '@mui/material';


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Invoice = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  let [color, setColor] = useState("#ADD8E6");
  const [data, setData] = useState([]);

  const Print = () => {
    //console.log('print');  
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }



  useEffect(() => {
    try {
      setIsLoading(true)

      const allCustomer = async () => {
        //  const res = await api.service().fetch(`/dashboard/loan/?is_disbursed=true&borrower=${id}`, true);
        const res = await api.service().fetch(`/dashboard/loan/?is_disbursed=true`, true);
        console.log(res.data);
        if (api.isSuccessful(res)) {
          setData(res.data.results[0])

        }
        setIsLoading(false);
      }

      allCustomer();
    } catch (error) {
      console.log(error)
    }
  }, []);

  // const getCustomer = (id) => {
  //     const customer = data.filter(data => data.id === id);
  //     console.log(customer)
  //     setItem(customer[0])
  //     console.log(data);
  // }


  return (
    <Fragment>

      {
        isLoading ?
          (

            <div className={classes.sweet_loading}>
              <BounceLoader color={color} loading={loading} css={override} size={150} />
            </div>

          )
          :
          (
            data && (
              <>
                <PageTitle title="Fundhill" />

              </>
            )
          )
      }

    </Fragment>
  )
}

export default Invoice
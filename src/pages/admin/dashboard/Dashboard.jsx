import React, { Fragment, useEffect, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../components/Widget";
import PageTitle from "../../../components/PageTitle";
import { Typography } from "../../../components/Wrappers";
import { Link } from "react-router-dom";
import { api } from '../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { Context } from "../../../context/Context";



// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


export default function Dashboard(props) {
  const navigate = useNavigate();
  var classes = useStyles();
  var theme = useTheme();

  // local
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const [data, setData] = useState({});
  const [org, setOrg] = useState(false);
  const { user } = useContext(Context)

  if (user.created_by === "FUNDHILL") {
    setOrg(true)
  }

  useEffect(() => {
    const dashboard = async () => {
      try {
        setIsLoading(true)

        const orgs = await api
          .service()
          .fetch("/dashboard/index/data/", true);
        console.log(orgs.data.data)
        setIsLoading(false)
        if (orgs) {
          setData(orgs.data.data);
          setIsLoading(false)
        } else {
          console.log("No Data found")
          setIsLoading(true)
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    }
    dashboard()
  }, [])

  return (
    <>
      <PageTitle title="Dashboard" />

      {
        isLoading ?
          (

            <div className={classes.sweet_loading}>
              <BounceLoader color={color} loading={loading} css={override} size={150} />
            </div>

          ) :
          (
            <>
              <Grid container spacing={4}>


                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Widget
                    title="All Marketers"
                    upperTitle
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                  >
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item alignItems={"center"}>
                        <Grid item xs={6}>
                          <Typography size="xl" weight="bold" noWrap>
                            {data.marketers_count}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >

                      <Grid item xs={12} className={classes.rateGrid}>
                        <Typography className={classes.percent} color="text" colorBrightness="secondary">
                          +89%
                        </Typography>
                        <Button className={classes.btnSeeMore} onClick={() => { navigate("/admin/dashboard/marketer/all_marketer") }}>See more</Button>
                      </Grid>
                    </Grid>
                    <div className={classes.progressSection}>
                      <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                      >
                        All Marketers
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={data.marketers_count}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>
                  </Widget>
                </Grid>

                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Widget
                    title="ALL CUSTOMER"
                    upperTitle
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                  >
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item alignItems={"center"}>
                        <Grid item xs={6}>
                          <Typography size="xl" weight="bold" >
                            {data.customers_count}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >

                      <Grid item xs={12} className={classes.rateGrid}>
                        <Typography className={classes.percent} color="text" colorBrightness="secondary">
                          +11%
                        </Typography>
                        <Button className={classes.btnSeeMore} onClick={() => { navigate('/admin/dashboard/customer/allcustomer') }}>See more</Button>
                      </Grid>
                    </Grid>
                    <div className={classes.progressSection}>
                      <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                      >
                        All Customer
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={data.customers_count}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>
                  </Widget>
                </Grid>

                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Widget
                    title="Total Deposits"
                    upperTitle
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                  >
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item alignItems={"center"}>
                        <Grid item xs={6}>
                          <Typography className={classes.amount} size="xl" weight="bold" >
                            <span>#{data.deposits}</span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >

                      <Grid item xs={12} className={classes.rateGrid}>
                        <Typography className={classes.percent} color="text" colorBrightness="secondary">
                          +11%
                        </Typography>
                        <Button className={classes.btnSeeMore} onClick={() => {
                          navigate('/admin/dashboard/tranxs/total_deposits')
                        }}>See more</Button>
                      </Grid>
                    </Grid>
                    <div className={classes.progressSection}>
                      <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                      >
                        Total deposites
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={data.deposits}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>
                  </Widget>
                </Grid>

                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Widget
                    title="Total Withdrawals"
                    upperTitle
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                  >
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item alignItems={"center"}>
                        <Grid item xs={6}>
                          <Typography size="xl" weight="bold" >
                            <span>#{data.withdrawals}</span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >

                      <Grid item xs={12} className={classes.rateGrid}>
                        <Typography className={classes.percent} color="text" colorBrightness="secondary">
                          +11%
                        </Typography>
                        <Button className={classes.btnSeeMore} onClick={
                          () => navigate('/admin/dashboard/tranxs/total_withdrawals')
                        }>See more</Button>
                      </Grid>
                    </Grid>
                    <div className={classes.progressSection}>
                      <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                      >
                        Totall Withdrawals
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={data.withdrawals}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>
                  </Widget>
                </Grid>

                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Widget
                    title="Total Ongoing Loans"
                    upperTitle
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                  >
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item alignItems={"center"}>
                        <Grid item xs={6}>
                          <Typography size="xl" weight="bold" noWrap>
                            <span>#{data.loans}</span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >

                      <Grid item xs={12} className={classes.rateGrid}>
                        <Typography className={classes.percent} color="text" colorBrightness="secondary">
                          0%
                        </Typography>
                        <Button className={classes.btnSeeMore} onClick={() => {
                          navigate('/admin/dashboard/loan/ongoing_loan')
                        }}>See more</Button>
                      </Grid>
                    </Grid>
                    <div className={classes.progressSection}>
                      <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                      >
                        Totall Ongoing Loans
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={data.loans}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>
                  </Widget>
                </Grid>

                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Widget
                    title="TOTAL EXPENDITURE"
                    upperTitle
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                  >
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item alignItems={"center"}>
                        <Grid item xs={6}>
                          <Typography size="xl" weight="bold" >
                            {data.expenses}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >

                      <Grid item xs={12} className={classes.rateGrid}>
                        <Typography className={classes.percent} color="text" colorBrightness="secondary">
                          +89%
                        </Typography>
                        <Button className={classes.btnSeeMore} onClick={() => {
                          navigate('/admin/dashboard/expense/all_expenses')
                        }}>See more</Button>
                      </Grid>
                    </Grid>
                    <div className={classes.progressSection}>
                      <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                      >
                        Totall Expenditures
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={data.expenses}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>
                  </Widget>
                </Grid>

                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Widget
                    title="All Groups"
                    upperTitle
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                  >
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item alignItems={"center"}>
                        <Grid item xs={6}>
                          <Typography size="xl" weight="bold" noWrap>
                            {data.groups_count}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >

                      <Grid item xs={12} className={classes.rateGrid}>
                        <Typography className={classes.percent} color="text" colorBrightness="secondary">
                          +89%
                        </Typography>
                        <Button className={classes.btnSeeMore} onClick={() => { navigate('/admin/dashboard/group/all_group') }}>See more</Button>
                      </Grid>
                    </Grid>
                    <div className={classes.progressSection}>
                      <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                      >
                        All Groups
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={data.groups_count}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>
                  </Widget>
                </Grid>

                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Widget
                    title="ALL BRANCHES"
                    upperTitle
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                  >
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item alignItems={"center"}>
                        <Grid item xs={6}>
                          <Typography size="xl" weight="bold" >
                            {data.branches_count}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >

                      <Grid item xs={12} className={classes.rateGrid}>
                        <Typography className={classes.percent} color="text" colorBrightness="secondary">
                          +89%
                        </Typography>
                        <Button className={classes.btnSeeMore} onClick={() => { navigate('/admin/dashboard/branch/allbranch') }}>See more</Button>
                      </Grid>
                    </Grid>
                    <div className={classes.progressSection}>
                      <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                      >
                        All Branches
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={data.branches_count}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>
                  </Widget>
                </Grid>

              </Grid>
            </>
          )
      }
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}

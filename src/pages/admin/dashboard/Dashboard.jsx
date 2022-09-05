import React, { Fragment, useEffect, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  LinearProgress,
  Select,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";

import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
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
import Dot from "../../../components/Sidebar/components/Dot";


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

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

  // if (user.created_by === "FUNDHILL") {
  //   setOrg(true)
  // }

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

  // local
  let [mainChartState, setMainChartState] = useState("monthly");

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

                    <div className={classes.progressSection}>
                      <LinearProgress
                        variant="determinate"
                        value={data.marketers_count}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>

                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item className={classes.rateGrid}>
                        <Button variant='outlined' className={classes.btnSeeMore} onClick={() => { navigate("/admin/dashboard/marketer/all_marketer") }}>See more</Button>
                      </Grid>
                    </Grid>
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

                    <div className={classes.progressSection}>
                      <LinearProgress
                        variant="determinate"
                        value={data.customers_count}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>

                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} className={classes.rateGrid}>
                        <Button variant='outlined' className={classes.btnSeeMore} onClick={() => { navigate('/admin/dashboard/customer/allcustomer') }}>See more</Button>
                      </Grid>
                    </Grid>
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

                    <div className={classes.progressSection}>
                      <LinearProgress
                        variant="determinate"
                        value={data.deposits}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>

                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} className={classes.rateGrid}>
                        <Button variant='outlined' className={classes.btnSeeMore} onClick={() => {
                          navigate('/admin/dashboard/tranxs/total_deposits')
                        }}>See more</Button>
                      </Grid>
                    </Grid>
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

                    <div className={classes.progressSection}>
                      <LinearProgress
                        variant="determinate"
                        value={data.withdrawals}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>

                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} className={classes.rateGrid}>
                        <Button variant='outlined' className={classes.btnSeeMore} onClick={
                          () => navigate('/admin/dashboard/tranxs/total_withdrawals')
                        }>See more</Button>
                      </Grid>
                    </Grid>
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

                    <div className={classes.progressSection}>
                      <LinearProgress
                        variant="determinate"
                        value={data.loans}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>

                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} className={classes.rateGrid}>
                        <Button variant='outlined' className={classes.btnSeeMore} onClick={() => {
                          navigate('/admin/dashboard/loan/ongoing_loan')
                        }}>See more</Button>
                      </Grid>
                    </Grid>
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

                    <div className={classes.progressSection}>
                      <LinearProgress
                        variant="determinate"
                        value={data.expenses}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>

                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} className={classes.rateGrid}>
                        <Button variant='outlined' className={classes.btnSeeMore} onClick={() => {
                          navigate('/admin/dashboard/expense/all_expenses')
                        }}>See more</Button>
                      </Grid>
                    </Grid>
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

                    <div className={classes.progressSection}>
                      <LinearProgress
                        variant="determinate"
                        value={data.groups_count}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>

                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >

                      <Grid item xs={12} className={classes.rateGrid}>
                        <Button variant='outlined' className={classes.btnSeeMore} onClick={() => { navigate('/admin/dashboard/group/all_group') }}>See more</Button>
                      </Grid>
                    </Grid>
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

                    <div className={classes.progressSection}>
                      <LinearProgress
                        variant="determinate"
                        value={data.branches_count}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>

                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={12} className={classes.rateGrid}>
                        <Button variant='outlined' className={classes.btnSeeMore} onClick={() => { navigate('/admin/dashboard/branch/allbranch') }}>See more</Button>
                      </Grid>
                    </Grid>
                  </Widget>
                </Grid>

                {/* DECOR STARTS HERE */}

                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Widget
                    title="Today"
                    upperTitle
                    bodyClass={classes.fullHeightBody}
                    className={classes.card}
                  >
                    <div className={classes.visitsNumberContainer}>
                      <Grid container item alignItems={"center"}>
                        <Grid item xs={6}>
                          <Typography size="xl" weight="medium" noWrap>
                            12, 678
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <LineChart
                            width={100}
                            height={30}
                            data={[
                              { value: 10 },
                              { value: 15 },
                              { value: 10 },
                              { value: 17 },
                              { value: 18 },
                            ]}
                          >
                            <Line
                              type="natural"
                              dataKey="value"
                              stroke={theme.palette.success.main}
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </Grid>
                      </Grid>
                    </div>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={4}>
                        <Typography color="text" colorBrightness="secondary" noWrap>
                          Registrations
                        </Typography>
                        <Typography size="md">860</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography color="text" colorBrightness="secondary" noWrap>
                          Sign Out
                        </Typography>
                        <Typography size="md">32</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography color="text" colorBrightness="secondary" noWrap>
                          Rate
                        </Typography>
                        <Typography size="md">3.25%</Typography>
                      </Grid>
                    </Grid>
                  </Widget>
                </Grid>
                <Grid item lg={3} md={8} sm={6} xs={12}>
                  <Widget
                    title="App Performance"
                    upperTitle
                    className={classes.card}
                    bodyClass={classes.fullHeightBody}
                  >
                    <div className={classes.performanceLegendWrapper}>
                      <div className={classes.legendElement}>
                        <Dot color="warning" />
                        <Typography
                          color="text"
                          colorBrightness="secondary"
                          className={classes.legendElementText}
                        >
                          Integration
                        </Typography>
                      </div>
                      <div className={classes.legendElement}>
                        <Dot color="primary" />
                        <Typography
                          color="text"
                          colorBrightness="secondary"
                          className={classes.legendElementText}
                        >
                          MFB
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.progressSection}>
                      <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                      >
                        Integration
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={77}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                      />
                    </div>
                    <div>
                      <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                      >
                        MFB
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={73}
                        classes={{ barColorPrimary: classes.progressBarWarning }}
                        className={classes.progress}
                      />
                    </div>
                  </Widget>
                </Grid>
                <Grid item lg={3} md={8} sm={6} xs={12}>
                  <Widget
                    title="Server Overview"
                    upperTitle
                    className={classes.card}
                    bodyClass={classes.fullHeightBody}
                  >
                    <div className={classes.serverOverviewElement}>
                      <Typography
                        color="text"
                        colorBrightness="secondary"
                        className={classes.serverOverviewElementText}
                        noWrap
                      >
                        60% / 37°С / 3.3 Ghz
                      </Typography>
                      <div className={classes.serverOverviewElementChartWrapper}>
                        <ResponsiveContainer height={50} width="99%">
                          <AreaChart data={getRandomData(10)}>
                            <Area
                              type="natural"
                              dataKey="value"
                              stroke={theme.palette.secondary.main}
                              fill={theme.palette.secondary.light}
                              strokeWidth={2}
                              fillOpacity="0.25"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className={classes.serverOverviewElement}>
                      <Typography
                        color="text"
                        colorBrightness="secondary"
                        className={classes.serverOverviewElementText}
                        noWrap
                      >
                        54% / 31°С / 3.3 Ghz
                      </Typography>
                      <div className={classes.serverOverviewElementChartWrapper}>
                        <ResponsiveContainer height={50} width="99%">
                          <AreaChart data={getRandomData(10)}>
                            <Area
                              type="natural"
                              dataKey="value"
                              stroke={theme.palette.primary.main}
                              fill={theme.palette.primary.light}
                              strokeWidth={2}
                              fillOpacity="0.25"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className={classes.serverOverviewElement}>
                      <Typography
                        color="text"
                        colorBrightness="secondary"
                        className={classes.serverOverviewElementText}
                        noWrap
                      >
                        57% / 21°С / 3.3 Ghz
                      </Typography>
                      <div className={classes.serverOverviewElementChartWrapper}>
                        <ResponsiveContainer height={50} width="99%">
                          <AreaChart data={getRandomData(10)}>
                            <Area
                              type="natural"
                              dataKey="value"
                              stroke={theme.palette.warning.main}
                              fill={theme.palette.warning.light}
                              strokeWidth={2}
                              fillOpacity="0.25"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Widget>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Widget title="Revenue Breakdown" upperTitle className={classes.card}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <ResponsiveContainer width="100%" height={144}>
                          <PieChart>
                            <Pie
                              data={PieChartData}
                              innerRadius={30}
                              outerRadius={40}
                              dataKey="value"
                            >
                              {PieChartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={theme.palette[entry.color].main}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </Grid>
                      <Grid item xs={6}>
                        <div className={classes.pieChartLegendWrapper}>
                          {PieChartData.map(({ name, value, color }, index) => (
                            <div key={color} className={classes.legendItemContainer}>
                              <Dot color={color} />
                              <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                                &nbsp;{name}&nbsp;
                              </Typography>
                              <Typography color="text" colorBrightness="secondary">
                                &nbsp;{value}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </Grid>
                    </Grid>
                  </Widget>
                </Grid>
                <Grid item xs={12}>
                  <Widget
                    bodyClass={classes.mainChartBody}
                    header={
                      <div className={classes.mainChartHeader}>
                        <Typography
                          variant="h5"
                          color="text"
                          colorBrightness="secondary"
                        >
                          Daily Line Chart
                        </Typography>
                        <div className={classes.mainChartHeaderLabels}>
                          <div className={classes.mainChartHeaderLabel}>
                            <Dot color="warning" />
                            <Typography className={classes.mainChartLegentElement}>
                              Tablet
                            </Typography>
                          </div>
                          <div className={classes.mainChartHeaderLabel}>
                            <Dot color="primary" />
                            <Typography className={classes.mainChartLegentElement}>
                              Mobile
                            </Typography>
                          </div>
                          <div className={classes.mainChartHeaderLabel}>
                            <Dot color="secondary" />
                            <Typography className={classes.mainChartLegentElement}>
                              Desktop
                            </Typography>
                          </div>
                        </div>
                        <Select
                          value={mainChartState}
                          onChange={e => setMainChartState(e.target.value)}
                          input={
                            <OutlinedInput
                              labelWidth={0}
                              classes={{
                                notchedOutline: classes.mainChartSelectRoot,
                                input: classes.mainChartSelect,
                              }}
                            />
                          }
                          autoWidth
                        >
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                          <MenuItem value="monthly">Monthly</MenuItem>
                        </Select>
                      </div>
                    }
                  >
                    <ResponsiveContainer width="100%" minWidth={500} height={350}>
                      <ComposedChart
                        margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                        data={mainChartData}
                      >
                        <YAxis
                          ticks={[0, 2500, 5000, 7500]}
                          tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                          stroke={theme.palette.text.hint + "80"}
                          tickLine={false}
                        />
                        <XAxis
                          tickFormatter={i => i + 1}
                          tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                          stroke={theme.palette.text.hint + "80"}
                          tickLine={false}
                        />
                        <Area
                          type="natural"
                          dataKey="desktop"
                          fill={theme.palette.background.light}
                          strokeWidth={0}
                          activeDot={false}
                        />
                        <Line
                          type="natural"
                          dataKey="mobile"
                          stroke={theme.palette.primary.main}
                          strokeWidth={2}
                          dot={false}
                          activeDot={false}
                        />
                        <Line
                          type="linear"
                          dataKey="tablet"
                          stroke={theme.palette.warning.main}
                          strokeWidth={2}
                          dot={{
                            stroke: theme.palette.warning.dark,
                            strokeWidth: 2,
                            fill: theme.palette.warning.main,
                          }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
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

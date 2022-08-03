import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";


export default function Dashboard(props) {
  const navigate = useNavigate();
  var classes = useStyles();
  var theme = useTheme();

  // local

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Total Deposite"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography className={classes.amount} size="xl" weight="bold" >
                    <span>&#8358;</span>0
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
                  navigate('total_deposite')
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
                    <span>&#8358;</span>0
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
                  () => navigate('total_withdrawals')
                }>See more</Button>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Total Loans"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="bold" noWrap>
                    <span>&#8358;</span>0
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
                  navigate('ongoin_loan')
                }}>See more</Button>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

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
                    7
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
                <Button className={classes.btnSeeMore} onClick={() => { navigate('all_marketers') }}>See more</Button>
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
                    5
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
                <Button onClick={() => navigate("all_customers")} className={classes.btnSeeMore}>See more</Button>
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
                    1001001000
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
                {/* <Button className={classes.btnSeeMore}>See more</Button> */}
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="UNPAID LOAN"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="bold" noWrap>
                    0
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
                <Button className={classes.btnSeeMore} disabled>Last year</Button>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="LOAN PRODUCT"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="bold" noWrap>
                    0
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
                <Button className={classes.btnSeeMore} onClick={() => { navigate('new_product') }}>See more</Button>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="TOTAL FIXED SAVINGS"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="bold" noWrap>
                    3577
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
                <Button className={classes.btnSeeMore} onClick={() => { navigate('fixed_savings_rep') }}>See more</Button>
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
                    2
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
                <Button className={classes.btnSeeMore} onClick={() => { navigate('allbranchs') }}>See more</Button>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="LOAN INTEREST"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="bold" >
                    0
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
                <Button className={classes.btnSeeMore} disabled>Last year</Button>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        {/* <Grid item lg={3} md={8} sm={6} xs={12}>
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
                  SDK
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
                SDK
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
        </Grid> */}
        {/* <Grid item xs={12}>
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
        </Grid> */}
        {/* {mock.bigStat.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))} */}
        {/* <Grid item xs={12}>
          <Widget
            title="Support Requests"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={mock.table} />
          </Widget>
        </Grid> */}
      </Grid>
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

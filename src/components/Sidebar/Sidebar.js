import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import BookIcon from '@material-ui/icons/Book';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  {
    id: 0, label: "Dashboard", links: "/admin/dashboard", icon: <HomeIcon />,
  },
  {
    id: 1,
    label: "Accounting",
    links: "/app/accounting",
    icon: <BookIcon />,
    children: [
      { label: "Deposit", links: "#" },
      { label: "Withdrawal", links: "#" },
      { label: "Regular Savings", links: "#" },
      { label: "Targeted Savings", links: "#" },
      { label: "Fixed Savings", links: "#" },
      { label: "Customers", links: "#" },
    ],
  },
  {
    id: 2, label: "Branch", links: "/app/branch", icon: <AccountTreeIcon />,
    children: [
      { label: "All Branch", links: "dashboard/allbranch" },
      { label: "New Branch", links: "dashboard/newbranch" },
    ],
  },
  {
    id: 3,
    label: "Traction",
    links: "/app/notifications",
    icon: <PaymentOutlinedIcon />,
    children: [
      {
        label: "Deposite/Withdrawal", links: "#"
      },
      { label: "Fixed Deposite", links: "#" },
      { label: "Targeted Savings", links: "#" },
      { label: "Regular Savings", links: "#" },
      { label: "Statement of Account", links: "#" },
      { label: "My Transaction History", links: "#" },
    ],
  },
  {
    id: 4,
    label: "Report",
    links: "/app/ui",
    icon: <ReportOutlinedIcon />,
    children: [
      { label: "General Report", links: "#" },
    ],
  },
  {
    id: 5,
    label: "Esusu Management",
    links: "/app/ui",
    icon: <AccountBalanceOutlinedIcon />,
    children: [
      { label: "Esusu Transaction", links: "#" },
      { label: "Esusu Management", links: "#" },
    ],
  },
  {
    id: 6,
    label: "Expences",
    links: "/app/ui",
    icon: <AccountBalanceWalletOutlinedIcon />,
    children: [
      { label: "New Expences", links: "#" },
      { label: "All Expences", links: "#" },
    ],
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default Sidebar;

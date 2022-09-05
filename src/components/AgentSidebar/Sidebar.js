import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import BookIcon from '@material-ui/icons/Book';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

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
    id: 0, label: "Dashboard", links: "/agent/dashboard", icon: <HomeIcon />,
  },
  {
    id: 1,
    label: "Accounting",
    links: "#",
    icon: <BookIcon />,
    children: [
      { label: "Deposit", links: "/agent/dashboard/account/all_deposits" },
      { label: "Withdrawal", links: "/agent/dashboard/account/all_withdrawals" }
    ],
  },
  {
    id: 2, label: "Customer", links: "#", icon: <PeopleOutlinedIcon />,
    children: [
      { label: "New Customer", links: "/agent/dashboard/customer/newcustomer" },
      { label: "Pending Customer", links: "/agent/dashboard/customer/pendingCustomer" },
      { label: "Active Customer", links: "/agent/dashboard/customer/allcustomer" },
    ],
  },
  {
    id: 3, label: "Savings Plan", links: "#", icon: <SavingsOutlinedIcon />,
    children: [
      { label: "Customer Plan", links: "/agent/dashboard/customer/savings_plan" },

    ],
  },

  {
    id: 4, label: "Transaction", links: "#", icon: <ReceiptLongOutlinedIcon />,
    children: [
      { label: "Customer Transaction", links: "/agent/dashboard/customer/tranx" },
    ],
  },
  {
    id: 5, label: "Loan Management", links: "#", icon: <CreditScoreOutlinedIcon />,
    children: [
      { label: "Add Borrower", links: "/agent/dashboard/loan/add_borrower" },
      { label: "Ongoing Loan", links: "/agent/dashboard/loan/ongoing_loan" },

    ],
  },
  {
    id: 6, label: "Expenses", links: "#", icon: <PaymentsOutlinedIcon />,
    children: [
      { label: "New Expenses", links: "/agent/dashboard/expense/new_expenses" },
      { label: "All Expenses", links: "/agent/dashboard/expense/all_expenses" },

    ],
  }

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

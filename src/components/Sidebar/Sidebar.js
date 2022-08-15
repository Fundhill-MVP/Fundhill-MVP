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
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
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
    id: 11, label: "Funhill Admin", links: "#", icon: <AdminPanelSettingsIcon />,
    children: [
      { label: "Organisations", links: "/admin/fundhill/organisation" },
      { label: "Users", links: "/admin/fundhill/users" },
    ],
  },
  {
    id: 1,
    label: "Accounting",
    links: "#",
    icon: <BookIcon />,
    children: [
      { label: "Deposit", links: "/admin/dashboard/account/all_deposits" },
      { label: "Withdrawal", links: "/admin/dashboard/account/all_withdrawals" },
      // { label: "Regular Savings", links: "/admin/dashboard/account/all_regsavings" },
      // { label: "Targeted Savings", links: "/admin/dashboard/account/all_targsavings" },
      // { label: "Fixed Savings", links: "/admin/dashboard/account/all_deposit" },
    ],
  },
  {
    id: 2, label: "Branch", links: "#", icon: <AccountTreeIcon />,
    children: [
      { label: "All Branch", links: "/admin/dashboard/branch/allbranch" },
      { label: "New Branch", links: "/admin/dashboard/branch/newbranch" },
    ],
  },

  {
    id: 3, label: "Customer", links: "#", icon: <PeopleOutlinedIcon />,
    children: [
      { label: "New Customer", links: "/admin/dashboard/customer/newcustomer" },
      { label: "Pending Customer", links: "/admin/dashboard/customer/pendingcustomer" },
      { label: "Active Customer", links: "/admin/dashboard/customer/allcustomer" },
      { label: "Deactivated Customers", links: "/admin/dashboard/customer/deletedcustomer" },

    ],
  },
  {
    id: 4, label: "Savings Plan", links: "#", icon: <SavingsOutlinedIcon />,
    children: [
      { label: "Interest Rate", links: "/admin/dashboard/customer/interest_rate" },
      { label: "Add Plan", links: "/admin/dashboard/customer/savings_plan" },
      { label: "Fees", links: "/admin/dashboard/customer/fees" },

    ],
  },
  {
    id: 5, label: "Marketer", links: "#", icon: <PersonOutlineOutlinedIcon />,
    children: [
      { label: "New Marketer", links: "/admin/dashboard/marketer/new_marketer" },
      { label: "All Marketers", links: "/admin/dashboard/marketer/all_marketer" },
      // { label: "Marketer Account", links: "/admin/dashboard/marketer/marketer-account" },
    ],
  },
  {
    id: 6, label: "Transaction", links: "#", icon: <ReceiptLongOutlinedIcon />,
    children: [
      { label: "Customer Transaction", links: "/admin/dashboard/customer/tranx" },
      { label: "Group Transaction", links: "/admin/dashboard/group/group_trans" },

    ],
  },
  // {
  //   id: 7, label: "Esusu Management", links: "#", icon: <PointOfSaleOutlinedIcon />,
  //   children: [
  //     { label: "Esusu Transaction", links: "/admin/dashboard/esusu/esusu_transaction" },
  //     { label: "Esusu Performance", links: "/admin/dashboard/esusu/esusu_perform" },

  //   ],
  // },
  {
    id: 8, label: "Loan Management", links: "#", icon: <CreditScoreOutlinedIcon />,
    children: [
      { label: "New Loan Product", links: "/admin/dashboard/loan/new_product" },
      { label: "Add Borrower", links: "/admin/dashboard/loan/add_borrower" },
      { label: "Pending Loan", links: "/admin/dashboard/loan/pending_loan" },
      { label: "Approved Loan", links: "/admin/dashboard/loan/approved_loan" },
      { label: "Disbursed Loan", links: "/admin/dashboard/loan/disburse_loan" },
      { label: "Ongoing Loan", links: "/admin/dashboard/loan/ongoing_loan" },
      { label: "Denied Loan", links: "/admin/dashboard/loan/denied_loan" },

    ],
  },
  {
    id: 9, label: "Expenses", links: "#", icon: <PaymentsOutlinedIcon />,
    children: [
      { label: "New Expenses", links: "/admin/dashboard/expense/new_expenses" },
      { label: "All Expenses", links: "/admin/dashboard/expense/all_expenses" },

    ],
  },
  {
    id: 10, label: "Group Managment", links: "#", icon: <PaymentsOutlinedIcon />,
    children: [
      { label: "New Groups", links: "/admin/dashboard/group/new_group" },
      { label: "All Groups", links: "/admin/dashboard/group/all_group" },
      { label: "Group Plan", links: "/admin/dashboard/group/group_plan" },
      { label: "Group Loan", links: "/admin/dashboard/group/group_loan" },
      { label: "Approve Loan", links: "/admin/dashboard/group/approved_loan" },
      { label: "Denied Loan", links: "/admin/dashboard/group/denied_loan" },
      { label: "Ongoing Loan", links: "/admin/dashboard/group/ongoing_loan" },
      { label: "Disbursed Loan", links: "/admin/dashboard/group/disbursed_loan" },
      { label: "Group Savings", links: "/admin/dashboard/group/add_groupsavings" },
     
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

import { Route } from "react-router-dom"

// element s
import Layout from "../../components/Layout/Layout"

// pages
// import Error from "../../pages/error";
// import Login from "../../pages/login/Login";

// pages
// import Dashboard from "../../pages/dashboard";
import {
  NewBranch,
  AllBranches,
  NewCustomer,
  AllCustomer,
  // EditCustomer,
  // Transactions,
  // DepositRecipt,
  // WithdrawRecipt,
  // History,
  // AccountStatement,
  // DailyReport,
  // DepositReport,
  // FixedReport,
  // RegularReport,
  // TargetedReport,
  // WithdrawalReport,
  // LoanReport,
  // AllDeposit,
  // AllFixedSaving,
  // AllLoan,
  // AllRegularSaving,
  // AllTargetedSaving,
  // AllWithdrawalSaving,
  // TotalCustomer,
  NewMarketer,
  AllMarketer,

  NewProduct,
  AddBorrower,
  DisbursedLoan,
  PendingLoan,
  Invoice,
  OngoingLoan,
  ApprovedLoan,
  DeniedLoan,
  Dashboard,
  AllExpenses,
  NewExpense,
  Profile,
  Settings,
  PendingCustomer,
  DeletedCustomer,
  SavingsPlan,
  InterestRate,
  Fees,
  Transaction,
  GroupLoan,
  NewGroup,
  TotalDeposits,
  TotalWithdrawals,
  AllDeposits,
  AllWithdrawals,
  AllGroup,
  ApprovedGroupLoan,
  DeniedGroupLoan,
  DisburseGroupLoan,
  OngoingGroupLoan,
  GroupPlan,
  GroupTrans
} from "../../pages/admin"

import AdminRole from "../../middleware/admin_role"

function AdminRoute() {
  return (

        <Route
          path="admin"
          element={
            // <Layout />
            <AdminRole>
              <Layout />
            </AdminRole>
          }>

        {/* Dashboard */}
        <Route path="dashboard" element={ <Dashboard />} />

        {/* Branches */}
        <Route path="dashboard/branch/allbranch" element={<AllBranches />} />
        <Route path="dashboard/branch/newbranch" element={<NewBranch />} />


        {/* Customers */}
        <Route path="dashboard/customer/newcustomer" element={<NewCustomer />} />
        <Route path="dashboard/customer/pendingcustomer" element={<PendingCustomer />} />
        <Route path="dashboard/customer/deletedcustomer" element={<DeletedCustomer />} />
        <Route path="dashboard/customer/allcustomer" element={<AllCustomer />} />
       

        {/* Savings Plan */}
        <Route path="dashboard/customer/interest_rate" element={<InterestRate />} />
        <Route path="dashboard/customer/savings_plan" element={<SavingsPlan />} />
        <Route path="dashboard/customer/fees" element={<Fees />} />
        <Route path="dashboard/customer/tranx" element={<Transaction />} />




        {/* Accounting         */}
        <Route path="dashboard/account/all_deposits" element={<AllDeposits />} />
        <Route path="dashboard/account/all_withdrawals" element={<AllWithdrawals />} />



        {/* Marketer */}
        <Route path="dashboard/marketer/new_marketer" element={<NewMarketer />} />
        <Route path="dashboard/marketer/all_marketer" element={<AllMarketer />} />
        {/* <Route path="dashboard/marketer/marketer_account" element={<MarketerAccount />} /> */}




        {/* Loan Management */}
        <Route path="dashboard/loan/new_product" element={<NewProduct />} />
        <Route path="dashboard/loan/add_borrower" element={<AddBorrower />} />
        <Route path="dashboard/loan/pending_loan" element={<PendingLoan />} />
        <Route path="dashboard/loan/disburse_loan" element={<DisbursedLoan />} />
        <Route path="dashboard/loan/invoice/:id" element={<Invoice />} />
        <Route path="dashboard/loan/ongoing_loan" element={<OngoingLoan />} />
        <Route path="dashboard/loan/approved_loan" element={<ApprovedLoan />} />
        <Route path="dashboard/loan/denied_loan" element={<DeniedLoan />} />

        {/* Expenses Management */}
        <Route path="dashboard/expense/new_expenses" element={<NewExpense />} />
        <Route path="dashboard/expense/all_expenses" element={<AllExpenses />} />

        {/* Profile Management */}
        <Route path="dashboard/profile/update_profile" element={<Profile />} />
        <Route path="dashboard/profile/settings" element={<Settings />} />

          {/* Group Management */}
        <Route path="dashboard/group/new_group" element={<NewGroup />} />
        <Route path="dashboard/group/group_loan" element={<GroupLoan />} />
        <Route path="dashboard/group/all_group" element={<AllGroup />} />
        <Route path="dashboard/group/approved_loan" element={<ApprovedGroupLoan />} />
        <Route path="dashboard/group/denied_loan" element={<DeniedGroupLoan />} />
        <Route path="dashboard/group/ongoing_loan" element={<OngoingGroupLoan />} />
        <Route path="dashboard/group/disbursed_loan" element={<DisburseGroupLoan />} />
        <Route path="dashboard/group/group_plan" element={<GroupPlan />} />
        <Route path="dashboard/group/group_trans" element={<GroupTrans />} />


        {/* Reports */}
        <Route path="dashboard/tranxs/total_deposits" element={<TotalDeposits />} />
        <Route path="dashboard/tranxs/total_withdrawals" element={<TotalWithdrawals />} />


        </Route>
  )
}

export default AdminRoute
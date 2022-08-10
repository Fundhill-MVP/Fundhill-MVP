import { Route } from "react-router-dom"

// element s
import Layout from "../../components/Layout/Layout"

// pages
// import Error from "../../pages/error";
// import Login from "../../pages/login/Login";

// pages
import Dashboard from "../../pages/dashboard";
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
  // ViewCustomer,
  MarketerAccount,
  // EsusPerform,
  // EsusuTransaction,
  // QuickCustomer,
  // EsusuDReciept,
  // EsusuWReciept,
  NewProduct,
  AddBorrower,
  DisbursedLoan,
  PendingLoan,
  Invoice,
  OngoingLoan,
  ApprovedLoan,
  DeniedLoan,
  // Dashboard,
  AllExpenses,
  NewExpense,
  // Profile,
  PendingCustomer,
  DeletedCustomer,
  SavingsPlan,
  InterestRate,
  Fees,
  Transaction,
  GroupLoan,
  NewGroup
} from "../../pages/admin"

// context
// import { useUserState } from "../../context/UserContext";

function AdminRoute() {
  return (
    <Route path="admin" element={<Layout />} >


      {/* Dashboard */}
      <Route path="dashboard" element={<Dashboard />} />

      {/* Branches */}
      <Route path="dashboard/branch/allbranch" element={<AllBranches />} />
      <Route path="dashboard/branch/newbranch" element={<NewBranch />} />


      {/* Customers */}
      <Route path="dashboard/customer/newcustomer" element={<NewCustomer />} />
      <Route path="dashboard/customer/pendingcustomer" element={<PendingCustomer />} />
      <Route path="dashboard/customer/deletedcustomer" element={<DeletedCustomer />} />
      <Route path="dashboard/customer/allcustomer" element={<AllCustomer />} />
      {/* <Route path="dashboard/updatecustomer" element={<EditCustomer />} /> */}
      {/* <Route path="dashboard/quick_customer" element={<QuickCustomer />} /> */}

      {/* Savings Plan */}
      <Route path="dashboard/customer/interest_rate" element={<InterestRate />} />
      <Route path="dashboard/customer/savings_plan" element={<SavingsPlan />} />
      <Route path="dashboard/customer/fees" element={<Fees />} />
      <Route path="dashboard/customer/tranx" element={<Transaction />} />




      {/* Savings */}
      {/* <Route path="dashboard/savings" element={<Transactions />} /> */}
      {/* <Route path="dashboard/allcustomer" element={<AllCustomer />} /> */}
      {/* <Route path="dashboard/statement_of_account" element={<AccountStatement />} /> */}
      {/* <Route path="dashboard/updatecustomer" element={<EditCustomer />} />
        <Route path="dashboard/deposit_receipt" element={<DepositRecipt />} />
        <Route path="dashboard/withdrawal_receipt" element={<WithdrawRecipt />} />
        <Route path="dashboard/statement_of_account" element={<AccountStatement />} />
        <Route path="dashboard/account_history" element={<History />} /> */}

      {/* Reports */}
      {/* <Route path="dashboard/daily_report" element={<DailyReport />} />
        <Route path="dashboard/regular_savings_report" element={<RegularReport />} />
        <Route path="dashboard/targeted_savings_report" element={<TargetedReport />} />
        <Route path="dashboard/fixed_savings_report" element={<FixedReport />} />
        <Route path="dashboard/withdrawal_report" element={<WithdrawalReport />} />
        <Route path="dashboard/deposit_report" element={<DepositReport />} />
        <Route path="dashboard/loan_report" element={<LoanReport />} /> */}


      {/* Accounting         */}
      {/* <Route path="dashboard/all_deposit" element={<AllDeposit />} />
        <Route path="dashboard/all_fixedsavings" element={<AllFixedSaving />} />
        <Route path="dashboard/all_Loan" element={<AllLoan />} />
        <Route path="dashboard/all_regsavings" element={<AllRegularSaving />} />
        <Route path="dashboard/all_targsavings" element={<AllTargetedSaving />} />
        <Route path="dashboard/all_withdrawsavings" element={<AllWithdrawalSaving />} />
        <Route path="dashboard/total_customers" element={<TotalCustomer />} /> */}


      {/* Marketer */}
      <Route path="dashboard/marketer/new_marketer" element={<NewMarketer />} />
      <Route path="dashboard/marketer/all_marketer" element={<AllMarketer />} />
      <Route path="dashboard/marketer/marketer_account" element={<MarketerAccount />} />


      {/* Esusu Management */}
      {/* <Route path="dashboard/esusu_perform" element={<EsusPerform />} />
        <Route path="dashboard/esusu_withdraw_receipt" element={<EsusuWReciept />} />
        <Route path="dashboard/esusu_deposit_receipt" element={<EsusuDReciept />} />
        <Route path="dashboard/esusu_transaction" element={<EsusuTransaction />} /> */}

      {/* Loan Management */}
      <Route path="dashboard/loan/new_product" element={<NewProduct />} />
      <Route path="dashboard/loan/add_borrower" element={<AddBorrower />} />
      <Route path="dashboard/loan/pending_loan" element={<PendingLoan />} />
      <Route path="dashboard/loan/disburse_loan" element={<DisbursedLoan />} />
      <Route path="dashboard/loan/invoice/:id" element={<Invoice />} />
      <Route path="dashboard/loan/ongoing_loan" element={<OngoingLoan />} />

      <Route path="dashboard/loan/group_loan" element={<GroupLoan />} />

      <Route path="dashboard/loan/approved_loan" element={<ApprovedLoan />} />
      <Route path="dashboard/loan/denied_loan" element={<DeniedLoan />} />

      {/* Expenses Management */}
      <Route path="dashboard/expense/new_expenses" element={<NewExpense />} />
      <Route path="dashboard/expense/all_expenses" element={<AllExpenses />} />

      {/* Profile Management */}
      {/* <Route path="dashboard/update_profile" element={<Profile />} /> */}


      {/* Group Management */}
      <Route path="dashboard/group/new_group" element={<NewGroup />} />
      {/* <Route path="dashboard/expense/all_expenses" element={<AllExpenses />} /> */}






    </Route>
  )
}

export default AdminRoute
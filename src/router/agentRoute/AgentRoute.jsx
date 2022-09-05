import { Route } from "react-router-dom"

// element s
import Layout from "../../components/AgentLayout/Layout"

import {
  NewCustomer,
  PendingCustomer,
  AllCustomer,
  AddBorrower,
  // PendingLoan,
  Invoice,
  OngoingLoan,
  Dashboard,
  AllExpenses,
  NewExpense,
  Profile,
  SavingsPlan,
  Transaction,
  TotalDeposits,
  TotalWithdrawals,
  AllDeposits,
  AllWithdrawals,
} from "../../pages/agent"

import AgentRole from "../../middleware/staff_role"

function AgentRoute() {
  return (

        <Route
          path="agent"
          element={
            <AgentRole>
              <Layout />
            </AgentRole>
          }>

        {/* Dashboard */}
        <Route path="dashboard" element={ <Dashboard />} />



        {/* Customers */}
        <Route path="dashboard/customer/newcustomer" element={<NewCustomer />} />
        <Route path="dashboard/customer/pendingcustomer" element={<PendingCustomer />} />
        {/* <Route path="dashboard/customer/deletedcustomer" element={<DeletedCustomer />} /> */}
        <Route path="dashboard/customer/allcustomer" element={<AllCustomer />} />
       

        {/* Savings Plan */}
        {/* <Route path="dashboard/customer/interest_rate" element={<InterestRate />} /> */}
        <Route path="dashboard/customer/savings_plan" element={<SavingsPlan />} />
        {/* <Route path="dashboard/customer/fees" element={<Fees />} /> */}
        <Route path="dashboard/customer/tranx" element={<Transaction />} />
        {/* <Route path="dashboard/customer/savingsproduct" element={<AddSavingsProduct />} /> */}





        {/* Accounting         */}
        <Route path="dashboard/account/all_deposits" element={<AllDeposits />} />
        <Route path="dashboard/account/all_withdrawals" element={<AllWithdrawals />} />



        {/* Marketer */}
        {/* <Route path="dashboard/marketer/new_marketer" element={<NewMarketer />} />
        <Route path="dashboard/marketer/all_marketer" element={<AllMarketer />} />
        <Route path="dashboard/marketer/disabled_marketer" element={<DeletedMarketers />} /> */}




        {/* Loan Management */}
        <Route path="dashboard/loan/add_borrower" element={<AddBorrower />} />
        <Route path="dashboard/loan/invoice/:id" element={<Invoice />} />
        <Route path="dashboard/loan/ongoing_loan" element={<OngoingLoan />} />

        {/* Expenses Management */}
        <Route path="dashboard/expense/new_expenses" element={<NewExpense />} />
        <Route path="dashboard/expense/all_expenses" element={<AllExpenses />} />

        {/* Profile Management */}
        <Route path="dashboard/profile/update_profile" element={<Profile />} />



        {/* Reports */}
        <Route path="dashboard/tranxs/total_deposits" element={<TotalDeposits />} />
        <Route path="dashboard/tranxs/total_withdrawals" element={<TotalWithdrawals />} />


        </Route>
  )
}

export default AgentRoute
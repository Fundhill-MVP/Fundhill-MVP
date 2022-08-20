import Login from "./auth/login/Login";
import ConfirmEmail from "./auth/login/ConfirmEmail";
import NewBranch from "./branch/NewBranch"
import AllBranches from "./branch/AllBranches"
import NewCustomer from "./customer/NewCustomer"
import AllCustomer from "./customer/AllCustomer";
// import EditCustomer from "./customer/EditCustomer";
// import Transactions from "./savings/Transactions"
// import DepositRecipt from "./savings/DepositRecipt"
// import WithdrawRecipt from "./savings/WithdrawRecipt";
// import History from "./savings/History";
// import AccountStatement from "./savings/AccountStatement"
// import DailyReport from "./report/DailyReport";
// import DepositReport from "./report/DepositReport"
// import FixedReport from "./report/FixedReport"
// import RegularReport from "./report/RegularReport"
// import TargetedReport from "./report/TargetedReport"
// import WithdrawalReport from "./report/WithdrawalReport"
// import LoanReport from "./report/LoanReport";
// import AllDeposit from "./accounting/AllDeposit"
// import AllFixedSaving from "./accounting/AllFixedSaving"
// import AllLoan from "./accounting/AllLoan"
// import AllRegularSaving from "./accounting/AllRegularSaving"
// import AllTargetedSaving from "./accounting/AllTargetedSaving";
// import AllWithdrawalSaving from "./accounting/AllWithdrawal"
// import TotalCustomer from "./accounting/TotalCustomer";
import NewMarketer from "./marketer/NewMarketer";
import AllMarketer from "./marketer/AllMarketer";
// import ViewCustomer from "./marketer/ViewCustomer";
import MarketerAccount from "./marketer/MarketerAccount";
// import EsusPerform from "./esus/EsusPerform";
// import EsusuTransaction from "./esus/EsusuTransaction";
// import QuickCustomer from "./customer/QuickCustomer";
// import EsusuDReciept from "./esus/EsusuDReciept"
// import EsusuWReciept from "./esus/EsusuWReciept"
import NewProduct from "./loan/NewProduct/NewProduct";
import AddBorrower from "./loan/AddBorrower/AddBorrower";
import DisbursedLoan from "./loan/DisburseLoan/DisbursedLoan";
import PendingLoan from "./loan/PendingLoan/PendingLoan";
import ApprovedLoan from "./loan/ApprovedLoan/ApprovedLoan";
import DeniedLoan from "./loan/DeniedLoan/DeniedLoan";
import OngoingLoan from "./loan/OngoingLoan/OngoingLoan";
// import InvoiceLoan from "./loan/InvoiceLoan";
// import OngoingLoan from "../dashboard/OngoingLoans/OngoingLoans";
import Dashboard from "./dashboard/Dashboard";
import NewExpense from "./expenses/NewExpense"
import AllExpenses from "./expenses/AllExpenses"
import Profile from "./profile/Profile";
import PendingCustomer from "./customer/PendingCustomer";
import DeletedCustomer from "./customer/DeletedCustomer";
import SavingsPlan from "./interest/SavingsPlan";
import InterestRate from "./interest/InterestRate";
import Fees from "./interest/Fees";
import Invoice from "./loan/Invoice";
import Transaction from "./transaction/Transaction";
import TotalDeposits from "./transaction/TotalDeposits";
import TotalWithdrawals from "./transaction/TotalWithdrawals";
import AllDeposits from "./report/AllDeposits/AllDeposits";
import AllWithdrawals from "./report/AllWithdrawals/AllWithdrawals"
import Settings from "./profile/Settings";
import NewGroup from "./Groups/GroupSavings/NewGroup";
import GroupLoan from "./Groups/GroupLoan/GroupLoan";
import AllGroup from "./Groups/GroupSavings/AllGroups";
import ApprovedGroupLoan from "./Groups/ApprovedGroupLoan/ApprovedLoan";
import DeniedGroupLoan from "./Groups/DeniedGroupLoan/DeniedLoan";
import DisburseGroupLoan from "./loan/DisburseLoan/DisbursedLoan";
import OngoingGroupLoan from "./Groups/OngoingGroupLoan/OngoingLoan";
import GroupPlan from "./Groups/Savings/AddPlan";
import GroupTrans from "./transaction/Group/GroupTranxs";

export {
    Login,
    ConfirmEmail,

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
    ApprovedLoan,
    DeniedLoan,
    Invoice,
    OngoingLoan,
    Dashboard,
    AllExpenses,
    NewExpense,
    Profile,
    PendingCustomer,
    DeletedCustomer,
    SavingsPlan,
    InterestRate,
    Fees,
    Transaction,
    TotalDeposits,
    TotalWithdrawals,
    AllDeposits,
    AllWithdrawals,
    Settings,
    AllGroup,
    GroupLoan,
    NewGroup,
    ApprovedGroupLoan,
    DeniedGroupLoan,
    DisburseGroupLoan,
    OngoingGroupLoan,
    GroupPlan,
    GroupTrans,
}
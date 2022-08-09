import { Route } from "react-router-dom"
// pages
import TotalDeposite from "../../pages/dashboard/TotalDeposite";
import Layout from "../../components/Layout/Layout"
import TotalWithdrawal from "../../pages/dashboard/TotalWithdrawal";
import NewProduct from "../../pages/dashboard/NewProduct";
import FixedSavingsRep from "../../pages/dashboard/FixedSavingsRep";
import AllBranch from "../../pages/dashboard/AllBranch/AllBranch";
import Allmarketers from "../../pages/dashboard/Allmarketers/Allmarketers";
import Allcustomers from "../../pages/dashboard/Allcustomers/Allcustomers";


function DashboardRoute() {
    return (
        <Route path="admin" element={<Layout />} >

            {/* Dashboard */}
            <Route path="dashboard/total_deposite" element={<TotalDeposite />} />
            <Route path="dashboard/total_withdrawals" element={<TotalWithdrawal />} />
            <Route path="dashboard/all_marketers" element={<Allmarketers />} />
            <Route path="dashboard/all_customers" element={<Allcustomers />} />
            <Route path="dashboard/new_product" element={<NewProduct />} />
            <Route path="dashboard/fixed_savings_rep" element={<FixedSavingsRep />} />
            <Route path="dashboard/allbranchs" element={<AllBranch />} />
        </Route>
    )
}

export default DashboardRoute;
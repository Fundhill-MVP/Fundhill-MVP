import { Route } from "react-router-dom"

// element s
import Layout from "../../components/Layout/Layout"

// pages
// import Error from "../../pages/error";
// import Login from "../../pages/login/Login";

// pages
import Dashboard from "../../pages/dashboard";
import { AllBranches } from "../../pages/admin"

// context
// import { useUserState } from "../../context/UserContext";
import NewBranch from "../../pages/admin/branch/NewBranch";

function AdminRoute() {
  return (
    <Route path="admin" element={<Layout />} >


      {/* Dashboard */}
      <Route path="dashboard" element={<Dashboard />} />

      {/* Branches */}
      <Route path="dashboard/allbranch" element={<AllBranches />} />
      <Route path="dashboard/newbranch" element={<NewBranch />} />








    </Route>
  )
}

export default AdminRoute
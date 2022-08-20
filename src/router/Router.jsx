import {
  BrowserRouter,
  Routes,
} from "react-router-dom";
import AdminRoute from "./adminRoute/AdminRoute";
import AuthRoute from "./adminRoute/AuthRoute";
import HomeRoute from "./adminRoute/HomeRoute";
import DashboardRoute from "./adminRoute/DashboardRoute";
import { ContextProvider } from "../context/Context"
import FundhillAdminRoute from "./adminRoute/FundhillAdminRoute";

import AdminRole from "../middleware/admin_role";
const Router = () => {
  return (
    <BrowserRouter  >
      <ContextProvider>
        <Routes >
            {AdminRoute()}
          {AuthRoute()}
          {HomeRoute()}
          {DashboardRoute()}
          {FundhillAdminRoute()}
        </Routes>
      </ContextProvider>

    </BrowserRouter>
  );
};

export default Router;
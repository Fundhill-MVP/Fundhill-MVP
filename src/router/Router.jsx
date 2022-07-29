import {
  BrowserRouter,
  Routes,
} from "react-router-dom";
import AdminRoute from "./adminRoute/AdminRoute";
import AuthRoute from "./adminRoute/AuthRoute";
import HomeRoute from "./adminRoute/HomeRoute";
import DashboardRoute from "./adminRoute/DashboardRoute";
import { ContextProvider } from "../context/Context"

const Router = () => {
  return (
    <BrowserRouter  >
      <ContextProvider>
        <Routes >
          {AdminRoute()}
          {AuthRoute()}
          {HomeRoute()}
          {DashboardRoute()}
        </Routes>
      </ContextProvider>

    </BrowserRouter>
  );
};

export default Router;
import {
    BrowserRouter,
    Routes,
  } from "react-router-dom";
  import AdminRoute from "./adminRoute/AdminRoute";
  import AuthRoute from "./adminRoute/AuthRoute";

  import { ContextProvider } from "../context/Context"
  
  const Router = () => {
    return (
      <BrowserRouter  >
      <ContextProvider>
      <Routes >
        {AdminRoute()}
        {AuthRoute()}

        </Routes>    
      </ContextProvider>
       
      </BrowserRouter>
    );
  };
  
  export default Router;
import {
    BrowserRouter,
    Routes,
  } from "react-router-dom";
  import AdminRoute from "./adminRoute/AdminRoute";
  import AuthRoute from "./adminRoute/AuthRoute"; 
  import HomeRoute from "./adminRoute/HomeRoute"
  import { ContextProvider } from "../context/Context"
  
  const Router = () => {
    return (
      <BrowserRouter  >
      <ContextProvider>
      <Routes >
        {AdminRoute()}
        {AuthRoute()}
        {HomeRoute()}
        </Routes>    
      </ContextProvider>
       
      </BrowserRouter>
    );
  };
  
  export default Router;
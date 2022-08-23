import {useContext,Fragment} from "react";
import {Navigate} from "react-router";
import {Context} from "../context/Context";
import {toast} from "react-toastify";


const AdminRole = ({children}) => {
    const toastOptions = {
        autoClose: false,
    };
    
    const {user} = useContext(Context);

    const isAdmin = user?.data?.user_role === "ADMIN";

    // if(!isAdmin){<Navigate to="/auth/login" replace={true} state={{path: "/auth/login"}} />}

    return isAdmin ? (
        children
    ): (
        <Fragment>
        {toast.error("Unauthorized access!",toastOptions)}
        <Navigate to="/auth/login" replace={true} state={{path: "/auth/login"}} />
        </Fragment>
    )
}


export default AdminRole;
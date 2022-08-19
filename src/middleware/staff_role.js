import {ReactElement,useContext,Fragment} from "react";
import { Navigate } from "react-router";
import { Context } from "../context/Context";
import { toast } from "react-toastify";


const StaffRole = ({children: ReactElement}) => {
    const toastOptions = {
        autoClose: false
    };
    const {user} = useContext(Context);
    const isStaff = user?.user_role ==='AGENT';
    
    // if(!isStaff) { <Navigate to={"/auth/login"} replace={true}  />}

    return isStaff ? (
        children
    ): (
        <Fragment >
            {toast.error("Unauthorize Access!",toastOptions)}
            <Navigate to={"/auth/login"} replace={true} />
        </Fragment>
    )
}


export default StaffRole;
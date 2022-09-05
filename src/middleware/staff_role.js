import {useContext,Fragment} from "react";
import {Navigate} from "react-router";
import {Context} from "../context/Context";
import {toast} from "react-toastify";


const AgentRole = ({children}) => {
    const toastOptions = {
        autoClose: false,
    };
    
    const {user} = useContext(Context);

    const isAdmin = user?.data?.user_role === "AGENT" || "TELLER";


    return isAdmin ? (
        children
    ): (
        <Fragment>
        {toast.error("Unauthorized access!",toastOptions)}
        <Navigate to="/auth/login" replace={true} state={{path: "/auth/login"}} />
        </Fragment>
    )
}


export default AgentRole;
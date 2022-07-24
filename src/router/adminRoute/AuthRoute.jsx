import {Route} from "react-router-dom"



// pages
import {Login,ConfirmEmail} from "../../pages/admin"


function AuthRoute() {
  return (
    <Route path ="auth">
                {/* Auth */}
        <Route path="login" element={<Login />} />
        <Route path="confirm_email" element={<ConfirmEmail />} />
    </Route>
  )
}

export default AuthRoute
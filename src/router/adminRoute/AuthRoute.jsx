import { Route } from "react-router-dom";
// pages
import { Login, ConfirmEmail, } from "../../pages/admin";
import { EmailInstructions, ForgotPassword, ResetPassword, Token } from "../../pages/admin/auth";


function AuthRoute() {
  return (
    <Route path="auth">
      {/* Auth */}
      <Route path="login" element={<Login />} />
      <Route path="confirm_email" element={<ConfirmEmail />} />
      <Route path="forgot_password" element={<ForgotPassword />} />
      <Route path="email_instruction" element={<EmailInstructions />} />
      <Route path="token" element={<Token />} />
      <Route path="reset_password" element={<ResetPassword />} />
    </Route>
  )
}

export default AuthRoute
import {Route} from "react-router-dom"
import {Login} from "../../pages/admin/auth"

function HomeRoute() {
  return (
    <Route path ="/" element={<Login />} />


  )

}

export default HomeRoute
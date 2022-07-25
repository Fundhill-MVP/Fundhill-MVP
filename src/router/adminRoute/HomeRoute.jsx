import {Route} from "react-router-dom"
import {Login} from "../../pages/admin"

function HomeRoute() {
  return (
    <Route path ="/" element={<Login />} />


  )

}

export default HomeRoute
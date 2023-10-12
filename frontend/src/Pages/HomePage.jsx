import {useSelector} from "react-redux"
import AdminRequests from "../Components/AdminRequests"
import Visitor from "../Components/Visitor"
import state from "../state"
const HomePage = () =>{

const user = useSelector(state=>state.user)
return<>
{user!==null && user.role === "ROLE_ADMIN"?<AdminRequests/>:<Visitor/>}
</>
}

export default HomePage
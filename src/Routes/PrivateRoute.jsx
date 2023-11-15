import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const PrivateRoute = ({children}) => {
    const {user,loading}=UseAuth()
    const location = useLocation()
    if(loading){
        return <div className="flex justify-center items-center">
            <progress className="progress w-56"></progress>
        </div>
    }
    if(user){
        return children
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
            
       
 
};

export default PrivateRoute;
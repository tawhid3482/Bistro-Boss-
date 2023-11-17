import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import UseAuth from "../Hooks/UseAuth";

const AdminRoute = ({ children }) => {
  const {user, loading} = UseAuth()

  const [isAdmin, isAdminPanding] = UseAdmin();
  const location = useLocation();

  if (loading || isAdminPanding) {
    return (
      <div className="flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;

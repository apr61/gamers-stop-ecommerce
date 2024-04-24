import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Loader from "../components/loader/Loader";

function RequireAuth() {
  const location = useLocation();
  const { currentUser, isLoading } = useAuthContext();
  if(isLoading) {
    return <Loader />
  }
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}

export default RequireAuth;

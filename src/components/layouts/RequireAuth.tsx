import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../loader/Loader";
import { useAppSelector } from "../../store/hooks";
import { selectAuthStatus, selectCurrentUser } from "../../features/auth/authSlice";

function RequireAuth() {
  const location = useLocation();
  const currentUser = useAppSelector(selectCurrentUser)
  const isLoading = useAppSelector(selectAuthStatus)
  if(isLoading === "loading") {
    return <Loader />
  }
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}

export default RequireAuth;

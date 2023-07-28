import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../HOOKS/useAuth";

const ProtectedRoutes = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const isAuth = auth?.accessToken;
    
  return (
        allowedRoles?.includes(auth?.role) ? <Outlet /> : 
        isAuth ? <Navigate to='/unauthorized' state={{ from: location}} replace /> : <Navigate to='/login' state={{ from: location}} replace />
  )
}

export default ProtectedRoutes

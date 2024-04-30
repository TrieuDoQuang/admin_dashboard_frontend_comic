import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";
import { jwtDecode } from "jwt-decode";

const RequireAuth = () => {
  const isTokenExpired = () => {
    try {
      const decoded = jwtDecode(auth?.accessToken);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  };
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.accessToken && isTokenExpired ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

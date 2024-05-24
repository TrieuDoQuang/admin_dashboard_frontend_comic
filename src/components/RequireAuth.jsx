import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";
import { jwtDecode } from "jwt-decode";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // const isTokenExpired = () => {
  //   try {
  //     const decoded = jwtDecode(auth?.accessToken);
  //     return decoded.exp < Date.now() / 1000;
  //   } catch (err) {
  //     return true;
  //   }
  // };
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

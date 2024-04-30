import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks";
import { jwtDecode } from "jwt-decode";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth, setIsLoggedIn, persist } = useAuth();

  useEffect(() => {
    const setDataCookie = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userCookie = {
            username: decodedToken?.sub,
          };
          setAuth({ ...userCookie, accessToken: token });
          setIsLoggedIn(true);
          // Store auth state in localStorage
          localStorage.setItem(
            "auth",
            JSON.stringify({ ...userCookie, accessToken: token })
          );
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
      setIsLoading(false);
    };

    // Check localStorage for auth state
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      setAuth(parsedAuth);
      setIsLoggedIn(true);
    } else {
      setDataCookie();
    }
  }, []);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;

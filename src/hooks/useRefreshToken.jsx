import axios from "../api/axios";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || auth?.accessToken;
    const token = typeof storedToken === "string" ? storedToken : "";

    if (token) {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      const timeRemaining = decoded.exp - now;

      if (timeRemaining < 3600) {
        setIsTokenExpired(true);
      }
    }
  }, [auth]);

  useEffect(() => {
    if (isTokenExpired) {
      const refreshToken = async () => {
        try {
          const response = await axios.post("api/auth/refresh", {
            token: auth?.accessToken,
          });
          setAuth((prev) => ({
            ...prev,
            accessToken: response.data.result.token,
          }));
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
        return auth?.accessToken;
      };
      refreshToken();
    }
  }, [isTokenExpired, auth, setAuth]);

  return null;
};

export default useRefreshToken;

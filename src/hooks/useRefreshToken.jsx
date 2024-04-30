import axios from "../api/axios";
import useAuth from "./useAuth";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {
  const { auth, setAuth, setIsLoggedIn, persist, isLoggedIn, accessToken } =
    useAuth();
  const storedToken = localStorage.getItem("token") || auth?.accessToken;

  // Ensure that a valid token is available before attempting to decode it
  const token = typeof storedToken === "string" ? storedToken : "";

  if (token) {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    const timeRemaining = decoded.exp - now;
    const isTokenExpired = timeRemaining < 3600;

    if (isTokenExpired) {
      try {
        const refreshToken = async () => {
          const response = await axios.post(
            "api/auth/refresh",
            {
              token: token,
            }
            // { withCredentials: true }
          );
          setAuth((prev) => {
            console.log("Refreshed token:", response.data.result.token);
            return { ...prev, accessToken: response.data.result.token };
          });
        };
        return refreshToken;
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }
  }
};

export default useRefreshToken;

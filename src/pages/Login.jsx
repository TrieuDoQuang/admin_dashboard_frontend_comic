import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { setAuth, setIsLoggedIn, persist, setPersist } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://comic.pantech.vn/api/auth/login",
        {
          username: userName,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );

      // Set token cookie
      localStorage.setItem("token", response?.data?.result?.token);

      // Decode token
      const accessToken = response?.data?.result?.token;
      const decodedToken = jwtDecode(accessToken); // Correct usage of jwtDecode
      console.log(decodedToken);
      console.log(accessToken);
      // Set authentication state
      const authData = { username: userName, accessToken };
      setAuth(authData);
      setPassword("");
      setUserName("");
      setIsLoggedIn(true);
      navigate(from, { replace: true }); // Redirect after successful login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setIsLoggedIn(false); // Ensure user is not logged in on login failure
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center py-20 shadow-lg border-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Login</button>
          <div className="">
            <input type="checkbox" id="persist" onChange={togglePersist} />
            <label htmlFor="persist">Remember me</label>
          </div>
          <div className="flex flex-row gap-2"></div>
        </div>
      </form>
    </div>
  );
};

export default Login;

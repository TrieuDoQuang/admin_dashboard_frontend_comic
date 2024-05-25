import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import images from "../assets/images";
import { Notification } from "../components";

const Login = () => {
  const { setAuth, setIsLoggedIn, persist, setPersist } = useAuth();

  const [isError, setIsError] = useState(false);

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
        "http://comic.pantech.vn:8080/api/auth/login",
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
      // Set authentication state
      const authData = { accessToken };
      setAuth(authData);
      setPassword("");
      setUserName("");
      setIsLoggedIn(true);
      navigate(from, { replace: true }); // Redirect after successful login
      decodedToken?.sub === "admin"
        ? navigate("/dashboard")
        : navigate("/unauthorized");
    } catch (err) {
      console.error("Login error:", err);
      setIsLoggedIn(false); // Ensure user is not logged in on login failure
      setIsError(true);
    }
  };

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8">
            <h1 className="text-3xl font-bold text-center">
              {" "}
              WELCOME BACK, Please Login
            </h1>
            <label htmlFor="username" className="mb-2 text-md">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <label htmlFor="password" className="mb-2 text-md">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input
                  type="checkbox"
                  id="persist"
                  onChange={togglePersist}
                  className="mr-2"
                />
                <label htmlFor="persist" className="text-md">
                  Remember me
                </label>
              </div>
            </div>{" "}
            <div className="w-full bg-black text-white text-center mb-6  p-3 rounded-md hover:text-black hover:bg-white hover:border hover:border-gray-300">
              <button type="submit" className="w-full">
                Login
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              className="w-[400px] h-full hidden rounded-r-2xl md:block bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${images.batman})` }}
            ></div>
            <div className="absolute hidden bottom-10 m-3 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
              <span className="text-black text-xl">
                {" "}
                Comics as a way to relieve stress, and now it’s become my
                biggest passion
              </span>
            </div>
          </div>
        </div>
      </form>
      {isError && <Notification errorMessage={"Wrong username or password"} />}
    </div>
  );
};

export default Login;

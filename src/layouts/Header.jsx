import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import axios from "../api/axios";

const Header = () => {
  const { auth, accessToken } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["userCookie"]);
  const [activeLink, setActiveLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://comic.pantech.vn/api/auth/logout",
        {
          token: `${auth.accessToken}`,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      removeCookie("userCookie");
      // history.push("/");
      window.location.reload();
    } catch (err) {
      console.error("Log out error:", err);
    }
  };
  return (
    <div>
      <ul>
        <li>
          <form onSubmit={handleSubmit}>
            <button
              className="focus:ring transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer w-full text-left"
              type="submit"
            >
              <i className="fa-solid fa-arrow-right-from-bracket mr-3 text-red-800"></i>
              Log out
            </button>
          </form>
        </li>
        <li>
          <Link to={`/user`}>
            <button
              className="mt-4 focus:ring transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer w-full text-left focus:bg-blue-500"
              type="submit"
              onClick={() => setActiveLink("/user")}
            >
              <i className="fa-solid fa-arrow-right-from-bracket mr-3 text-red-800"></i>
              user
            </button>
          </Link>
        </li>
        <li>
          <Link to={`/comment`}>
            <button
              className="mt-4 focus:ring transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer w-full text-left focus:bg-blue-500"
              type="submit"
            >
              <i className="fa-solid fa-arrow-right-from-bracket mr-3 text-red-800"></i>
              comment
            </button>
          </Link>
        </li>
        <li>
          <Link to={`/comic`}>
            <button
              className="mt-4 focus:ring transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer w-full text-left focus:bg-blue-500"
              type="submit"
            >
              <i className="fa-solid fa-arrow-right-from-bracket mr-3 text-red-800"></i>
              comic
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

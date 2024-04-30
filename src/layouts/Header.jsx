import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useAuth, useRefreshToken } from "../hooks";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../api/axios";
import images from "../assets/images";

const Header = () => {
  const { auth, accessToken } = useAuth();
  const [activeLink, setActiveLink] = useState("");
  const refresh = useRefreshToken();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://comic.pantech.vn/api/auth/logout",
        {
          token: `${auth?.accessToken}`,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.clear();
      window.location.reload();
    } catch (err) {
      console.error("Log out error:", err);
    }
  };
  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center">
      <div>
        <FontAwesomeIcon icon={faSearch} />{" "}
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border-none bg-gray-100 rounded-md p-3 w-96"
        />
      </div>
      <div>SideButton</div>
    </div>
  );
};

export default Header;

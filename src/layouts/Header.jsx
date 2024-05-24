import { useEffect, useState, useContext } from "react";
import { useAuth, useRefreshToken, useDebounce } from "../hooks";
import {
  faSearch,
  faSignOutAlt,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@headlessui/react";
import axios from "../api/axios";
import images from "../assets/images";
import { SearchContext } from "../contexts";

const Header = () => {
  const { auth } = useAuth();
  const [activeLink, setActiveLink] = useState("");
  const refresh = useRefreshToken();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 500);
  const { setSearchValue } = useContext(SearchContext);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setSearchValue([]); // Clear search results when input is cleared
    } else {
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      const fetchSearch = async () => {
        try {
          const response = await axios.get(
            `http://comic.pantech.vn:8080/api/comic/searchComics/${debouncedValue}`
          );
          console.log("search", response.data.result);
          setSearchValue(response.data.result);
        } catch (error) {
          console.error("Error fetching search:", error);
        }
      };

      fetchSearch();
    }

    if (!debouncedValue) {
      setSearchValue([]);
    }
  }, [debouncedValue]);

  const handleSubmitLogOut = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://comic.pantech.vn:8080/api/auth/logout",
        { token: `${auth?.accessToken}` },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.clear();
      window.location.reload();
    } catch (err) {
      console.error("Log out error:", err);
    }
  };

  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center">
      <div className="relative border-b border-gray-200">
        <FontAwesomeIcon
          icon={faSearch}
          className="text-gray absolute -translate-y-1/2 top-1/2 p-2"
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="text-sm focus:outline-none active:outline-none pl-11 border-none bg-gray-100 rounded-md p-3 w-96"
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-3">
        <Popover className="relative">
          <Popover.Button>
            <FontAwesomeIcon icon={faBell} className="mr-4" />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 right-0 mt-2 w-80">
            <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
              <strong className="text-gray font-medium">Notification</strong>
              <div className="py-1 text-sm">This is a message for fun!</div>
            </div>
          </Popover.Panel>
        </Popover>
        <button onClick={handleSubmitLogOut}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
        <button>
          <div
            className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${images.admin})` }}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default Header;

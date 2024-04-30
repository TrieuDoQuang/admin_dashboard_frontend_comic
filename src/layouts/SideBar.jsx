import { useState } from "react";
import { Link } from "react-router-dom";
import images from "../assets/images";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState("");

  return (
    <div className="bg-neutral-700 w-60 p-3 flex flex-col text-white ">
      <ul className="text-center">
        <li className="flex items-center justify-center gap-2 px-1 py-3">
          <h1 className="text-2xl text-neutral-100">COMIC</h1>
          <img src={images.book} alt="book" className="w-[70px] h-auto" />
        </li>
        <li className="">
          <Link to={`/dashboard`} onClick={() => setActiveLink("/dashboard")}>
            <button
              className={`mt-4 w-full transform transition hover:scale-105 hover:bg-slate-500 duration-300 ease-in-out cursor-pointer ${
                activeLink === "/dashboard"
                  ? "bg-slate-500 text-emerald-300"
                  : ""
              } p-2`}
              type="submit"
            >
              Dashboard
            </button>
          </Link>
        </li>
        <li>
          <Link to={`/comic`} onClick={() => setActiveLink("/comic")}>
            <button
              className={`mt-4 w-full transform transition hover:scale-105 hover:bg-slate-500 duration-300 ease-in-out cursor-pointer ${
                activeLink === "/comic" ? "bg-slate-500 text-emerald-300" : ""
              } p-2`}
              type="submit"
            >
              Comic
            </button>
          </Link>
        </li>
        <li>
          <Link to={`/user`} onClick={() => setActiveLink("/user")}>
            <button
              className={`mt-4 w-full transform transition hover:scale-105 hover:bg-slate-500 duration-300 ease-in-out cursor-pointer ${
                activeLink === "/user" ? "bg-slate-500 text-emerald-300" : ""
              } p-2`}
              type="submit"
            >
              User
            </button>
          </Link>
        </li>
        <li>
          <Link to={`/comment`} onClick={() => setActiveLink("/comment")}>
            <button
              className={`mt-4 w-full transform transition hover:scale-105 hover:bg-slate-500 duration-300 ease-in-out cursor-pointer ${
                activeLink === "/comment" ? "bg-slate-500 text-emerald-300" : ""
              } p-2`}
              type="submit"
            >
              Comment
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;

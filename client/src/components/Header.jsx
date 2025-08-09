import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";

import { useSelector } from "react-redux";
import Model from "./Model";
const Header = () => {
  const [show, setShow] = useState(false);
  const { currentUser } = useSelector((store) => store.user || {});
  // console.log("currentUser", currentUser);
  return (
    <header className=" bg-slate-50 shadow-md">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-2 ">
        <Link to={"/"} className=" hidden sm:flex">
          <h1 className="hidden font-bold text-sm sm:text-xl sm:flex flex-wrap">
            <span className=" text-slate-500">Rajesh</span>
            <span className=" text-slate-700"> House</span>
          </h1>
        </Link>
        <form className=" bg-slate-100 p-3 w-[380px] sm:w-fit rounded-4xl flex justify-between items-center">
          <input
            type="text"
            placeholder="Search destinations"
            className=" bg-transparent focus:outline-none w-36  sm:w-64"
          />
          <p className=" bg-rose-500 p-1.5 rounded-full cursor-pointer">
            <FaSearch className=" text-white" />
          </p>
        </form>
        <ul className=" flex gap-4">
          <Link to={"/home"}>
            <li className=" hidden sm:flex   items-center hover:bg-slate-300 cursor-pointer px-2 py-1 rounded-2xl text-slate-900 font-semibold gap-1 hover:border  hover:border-slate-400">
              <AiOutlineHome className=" size-5" /> Home
            </li>
          </Link>

          <Link to={"/about"}>
            {currentUser?.avatar && (
              <div className="">
                <img
                  src={currentUser?.avatar}
                  alt="photo"
                  className=" size-10 rounded-full cursor-pointer object-cover "
                />
              </div>
            )}
          </Link>

          <Link to={"/sign-in"}>
            <li className=" sm:hidden flex items-center hover:bg-slate-200 cursor-pointer px-2 py-1 rounded-2xl text-slate-900 font-semibold gap-1 hover:border  hover:border-slate-300">
              <IoMdLogIn className=" hidden sm:flex size-5" /> Sign in
            </li>
          </Link>
          <li
            onClick={() => setShow(!show)}
            className=" hidden sm:block bg-slate-200 rounded-full p-2 cursor-pointer hover:opacity-80"
          >
            <IoReorderThree className=" size-6" />
          </li>
        </ul>
        {show && <Model show={show} setShow={setShow} />}
      </div>
    </header>
  );
};

export default Header;

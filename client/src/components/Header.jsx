import React from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineInfo } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" bg-slate-200 shadow-md">
      <div className=" flex  justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to={"/"}>
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap">
            <span className=" text-slate-500">Rajesh</span>
            <span className=" text-slate-700"> House</span>
          </h1>
        </Link>
        <form className=" bg-slate-100 p-3  rounded-4xl flex items-center">
          <input
            type="text"
            placeholder="Search destinations"
            className=" bg-transparent focus:outline-none w-24 sm:w-64"
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
            <li className=" hidden sm:flex  items-center hover:bg-slate-300 cursor-pointer px-2 py-1 rounded-2xl text-slate-900 font-semibold gap-1 hover:border  hover:border-slate-400">
              <MdOutlineInfo className=" size-5" /> About
            </li>
          </Link>
          <Link to={"/sign-in"}>
            <li className=" flex items-center hover:bg-slate-300 cursor-pointer px-2 py-1 rounded-2xl text-slate-900 font-semibold gap-1 hover:border  hover:border-slate-400">
              <IoMdLogIn className=" size-5" /> Sign in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;

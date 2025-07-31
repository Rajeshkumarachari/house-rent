import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineInfo } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import house from "../assets/house.png";
const Header = () => {
  const [show, setShow] = useState(false);
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
            <li className=" hidden sm:flex  items-center hover:bg-slate-300 cursor-pointer px-2 py-1 rounded-2xl text-slate-900 font-semibold gap-1 hover:border  hover:border-slate-400">
              <MdOutlineInfo className=" size-5" /> About
            </li>
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
        {show && (
          <div className=" absolute w-xs right-28 bg-white top-[63px] shadow-md rounded-md">
            <div className=" cursor-pointer hover:bg-gray-100 my-3 px-3">
              <p className=" flex gap-2 p-1 items-center  ">
                <BsQuestionCircle /> Help Center
              </p>
            </div>
            <hr className=" text-gray-400 mx-4 " />
            <div className="flex hover:bg-gray-100 my-2 cursor-pointer">
              <div className=" px-3">
                <h1 className=" font-semibold">Become a host</h1>
                <p className=" text-xs  text-gray-500 w-3/4">
                  Its easy to start hosting and earn extra income.
                </p>
              </div>
              <img src={house} alt="house" className=" size-12 mx-2" />
            </div>
            <hr className=" text-gray-400 mx-4 " />
            <div className="px-3 hover:bg-gray-100 my-2 cursor-pointer">
              <p>Find a co-host </p>
            </div>
            <hr className=" text-gray-400 mx-4 " />
            <div className=" hover:bg-gray-100 my-2 cursor-pointer px-3">
              <Link to={"/sign-in"} onClick={() => setShow(false)}>
                <p className="flex items-center gap-1">
                  <IoMdLogIn className=" hidden sm:flex size-5" />
                  Sign in
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

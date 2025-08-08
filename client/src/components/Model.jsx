import React from "react";
import house from "../assets/house.png";
import { BsQuestionCircle } from "react-icons/bs";
import { MdOutlineInfo } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAirbnb } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuGlobe } from "react-icons/lu";

export default function Model({ show, setShow }) {
  const sidebarData = [
    { id: 1, icon: <IoMdHeartEmpty />, name: "Wishlist", link: "#" },
    { id: 2, icon: <FaAirbnb />, name: "Trips" },
    { id: 3, icon: <FaRegMessage />, name: "Messages", link: "#" },
    { id: 4, icon: <FaRegUserCircle />, name: "Profile", link: "/profile" },
    { id: 5, icon: <IoSettingsOutline />, name: "Account settings", link: "#" },
    { id: 6, icon: <LuGlobe />, name: "Language & currency", link: "#" },
  ];
  const { currentUser } = useSelector((store) => store.user || {});

  return (
    <div className=" z-10 absolute w-xs right-28 bg-white top-[63px] shadow-md rounded-md">
      {currentUser &&
        sidebarData.map((data) => (
          <Link to={data.link} onClick={() => setShow(false)} key={data.id}>
            <div className=" cursor-pointer hover:bg-gray-100 my-3 px-3">
              <p className=" flex gap-2 p-1 items-center  ">
                {data.icon} {data.name}
              </p>
            </div>
          </Link>
        ))}
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
      <div className=" hover:bg-red-50 my-2 cursor-pointer px-3">
        {currentUser ? (
          <Link to={"/sign-in"} onClick={() => setShow(false)}>
            <p className="flex items-center gap-1 text-red-500">
              <IoMdLogIn className=" hidden text-red-400 sm:flex size-5" />
              Sign out
            </p>
          </Link>
        ) : (
          <Link to={"/sign-in"} onClick={() => setShow(false)}>
            <p className="flex items-center gap-1">
              <IoMdLogIn className=" hidden sm:flex size-5" />
              Sign in
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}

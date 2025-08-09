import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((store) => store.user || {});
  // console.log(currentUser?.data?.avatar);
  const location = useLocation();
  const navLink = [
    {
      id: 1,
      name: "About me",
      logo: currentUser?.avatar,
      link: "/profile",
    },
    {
      id: 2,
      name: "Your Listings",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYlSCMRDH-9978Ex7T3X5WIg9FpDAlkpfuMg&s",
      link: "/profile/listings",
    },
    {
      id: 3,
      name: "Past trips",
      logo: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-UserProfile/original/797c1df2-a40c-4d93-9550-ca5b213cd01b.png?im_w=240",
      link: "/profile/past-trips",
    },
    {
      id: 4,
      name: "Connections",
      logo: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-UserProfile/original/ed28537a-fc3c-4253-bb89-a6d927df7e50.png?im_w=240",
      link: "/profile/connections",
    },
  ];

  return (
    <div className="sm:flex flex-row bg-white ">
      <div className="sm:w-[35vw] w-full border-0 sm:border-r-1 border-gray-400 py-4 ">
        <h1 className=" text-3xl font-medium p-5">Profile</h1>
        <ul className="flex sm:flex-col flex-row sm:justify-center sm:items-center">
          {navLink.map((link) => (
            <Link to={link?.link} key={link?.id} className=" ">
              <li
                className={`flex sm:gap-3 items-center hover:bg-gray-100 sm:mx-20 px-4 py-1 rounded-2xl ${
                  link?.link == location.pathname ? "bg-gray-100" : ""
                }`}
              >
                <img
                  src={link?.logo}
                  alt={link?.name}
                  className="size-10 object-cover   rounded-full sm:block hidden "
                />
                <span className=" font-medium"> {link?.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <Outlet className="w-[75vw] border " />
    </div>
  );
};

export default Profile;

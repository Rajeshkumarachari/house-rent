import React from "react";
import { FiGlobe } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";
import { MdFacebook } from "react-icons/md";
import { RiTwitterXFill } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import { BiLogoLinkedin } from "react-icons/bi";

const Footer = () => {
  const firstData = ["Privacy", "Terms", "Sitemap", "Company details"];
  const secondData = [
    { id: 1, icon: <FiGlobe />, text: "English (IN)" },
    { id: 2, icon: <MdCurrencyRupee />, text: "INR" },
  ];
  const thirdData = [
    <MdFacebook />,
    <RiTwitterXFill />,
    <AiOutlineInstagram />,
    <BiLogoLinkedin />,
  ];
  return (
    <div className=" w-full flex flex-col sm:flex-row  justify-between  border-t-1 pt-4    border-gray-200   ">
      <div className="">
        <ul className="flex  ">
          <li>© {new Date().getFullYear()} Rajesh house, Inc.</li>
          {firstData.map((item, index) => (
            <li
              key={index}
              className="mx-2 flex items-center justify-center text-gray-700 text-sm hover:underline cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className=" flex justify-between my-4 mx-5 ">
        <div className="flex gap-1">
          {secondData.map((item) => (
            <span
              key={item.id}
              className="mx-2 flex gap-1 items-center text-gray-700 text-sm font-bold"
            >
              {item.icon}
              {item.text}
            </span>
          ))}
          {thirdData.map((icon, index) => (
            <span
              key={index}
              className="mx-2 flex items-center text-gray-700 cursor-pointer"
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

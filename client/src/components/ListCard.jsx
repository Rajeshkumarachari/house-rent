import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { Link } from "react-router-dom";

const ListCard = ({ list }) => {
  //   console.log(list);

  const handleDeleteList = async () => {
    try {
      const res = await axios.delete(`/api/listing/delete/${list._id}`);
      console.log(res);
      if (res.success === false) {
        console.log(res.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditList = async () => {
    console.log("rajesh");
  };
  return (
    <div className="group items-center justify-center w-48 ">
      <div className="flex opacity-0 group-hover:opacity-100  justify-between mx-2">
        <CiEdit
          onClick={handleEditList}
          className=" size-7  hover:bg-blue-600 hover:text-white p-1 rounded-sm"
        />
        <IoMdClose
          onClick={handleDeleteList}
          className="size-7  hover:bg-red-600 hover:text-white p-1 rounded-sm"
        />
      </div>
      <Link to={`/listing/${list._id}`}>
        <img
          src={list?.imageUrls[0]}
          alt="photo"
          className="  self-center  w-full h-48 object-cover  rounded-lg"
        />
        <p className=" font-semibold mx-2 truncate">{list?.name} </p>
        <div className="flex justify-between mx-2">
          <p className="flex items-center ">
            <IoLocationOutline className=" text-blue-900" /> {list?.address}
          </p>
          <p className="  bg-white">₹ {list.regularPrice} </p>
        </div>{" "}
      </Link>
    </div>
  );
};

export default ListCard;

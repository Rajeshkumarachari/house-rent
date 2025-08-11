import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ListingItem from "./ListingItem";

const Wishlist = () => {
  const { currentUser } = useSelector((store) => store.user || {});
  const [userWishlist, setUserWishlist] = useState([]);
  const [data, setData] = useState([]);
  // console.log(data);

  const fetchUser = async () => {
    try {
      const data = await axios.get(`/api/user/${currentUser?._id}`);
      setUserWishlist(data?.data?.wishlist);
    } catch (error) {
      console.log(error);
    }
  };
  const getWishlist = async (id) => {
    try {
      const data = await axios.get(`/api/listing/get/${id}`);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (userWishlist.length > 0) {
      Promise.all(userWishlist.map((id) => getWishlist(id))).then((results) => {
        setData(results);
      });
    }
  }, [userWishlist]);
  return (
    <div className=" mx-5">
      <h1 className="text-3xl font-medium mt-2  text-center">Your wishlist</h1>
      <div className="flex gap-3 my-5 ">
        {data &&
          data.length > 0 &&
          data.map((d) => <ListingItem listing={d} />)}
      </div>
    </div>
  );
};

export default Wishlist;

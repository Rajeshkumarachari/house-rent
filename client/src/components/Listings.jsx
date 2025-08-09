import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ListCard from "./ListCard";

const Listings = () => {
  const { currentUser } = useSelector((store) => store.user || {});
  const [listings, setListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  //   console.log(listings);

  const fetchUserListing = async () => {
    try {
      const data = await axios.get(`/api/user/listings/${currentUser._id}`);
      setListings(data?.data);
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserListing();
  }, []);
  return (
    <div>
      <h1 className="text-lg m-3">Your Listings </h1>
      <div className="flex flex-wrap mx-3 gap-3">
        {listings &&
          listings.length > 0 &&
          listings.map((list, i) => <ListCard list={list} key={i} />)}
      </div>
    </div>
  );
};

export default Listings;

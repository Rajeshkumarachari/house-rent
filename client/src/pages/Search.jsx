import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      try {
        const searchQuery = urlParams.toString();
        setLoading(true);
        const data = await axios.get(`/api/listing/get?${searchQuery}`);
        setListings(data?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, [location.search]);
  return (
    <div className=" flex flex-col md:flex-row">
      {/* Left */}
      <div className=" p-5 sm:mx-1 mx-20 border-b-1 border-gray-400 md:border-r-1  md:min-h-screen">
        <form onSubmit={handleSubmit} className=" flex flex-col gap-5 ">
          <div className="flex gap-2 items-center ">
            <label className=" whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              id="searchTerm"
              placeholder="Search..."
              className=" border p-2 rounded-lg w-full focus:outline-none border-gray-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className=" font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className=" size-5"
                id="all"
                checked={sidebarData.type === "all"}
                onChange={handleChange}
              />
              <span>Rent & Sale </span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={sidebarData.type === "rent"}
                onChange={handleChange}
                className=" size-5"
                id="rent"
              />
              <span>Rent </span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={sidebarData.type === "sale"}
                onChange={handleChange}
                className=" size-5"
                id="sale"
              />
              <span>Sale </span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={sidebarData.offer}
                onChange={handleChange}
                className=" size-5"
                id="offer"
              />
              <span>Offer </span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className=" font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={sidebarData.parking}
                onChange={handleChange}
                className=" size-5"
                id="parking"
              />
              <span>Parking </span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={sidebarData.furnished}
                onChange={handleChange}
                className=" size-5"
                id="furnished"
              />
              <span>Furnished </span>
            </div>
          </div>
          <div className=" w-full">
            <select
              id="sort_order"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              className="select select-error w-full rounded-lg"
            >
              <option>Sort</option>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="flex items-center gap-2  bg-rose-600 text-white p-2 rounded-lg  justify-center">
            <IoSearch />
            <span> Search</span>
          </button>
        </form>
      </div>
      {/* Right */}
      <div className=" flex-1 ">
        <h1 className=" text-xl font-semibold p-3 flex gap-2">
          <span> Listing results </span> <FaAngleDown className=" mt-1" />
          {loading && (
            <span className=" loading loading-ring loading-xl"></span>
          )}
        </h1>
        <div className=" p-5">
          {!loading && listings.length === 0 && (
            <p className=" text-xl text-slate-700"> No listing found...</p>
          )}
        </div>
        <div className=" flex gap-3 mx-4">
          {!loading &&
            listings.length > 0 &&
            listings.map((list) => (
              <ListingItem key={list._id} listing={list} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;

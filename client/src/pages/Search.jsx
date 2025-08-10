import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
const Search = () => {
  return (
    <div className=" flex flex-col md:flex-row">
      {/* Left */}
      <div className=" p-5 sm:mx-1 mx-20 border-b-1 border-gray-400 md:border-r-1  md:min-h-screen">
        <form className=" flex flex-col gap-5 ">
          <div className="flex gap-2 items-center ">
            <label className=" whitespace-nowrap font-semibold">
              Search Term:{" "}
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className=" border p-2 rounded-lg w-full focus:outline-none border-gray-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className=" font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" className=" size-5" id="all" />
              <span>Rent & Sale </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className=" size-5" id="rent" />
              <span>Rent </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className=" size-5" id="sale" />
              <span>Sale </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className=" size-5" id="offer" />
              <span>Offer </span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className=" font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" className=" size-5" id="parking " />
              <span>Parking </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className=" size-5" id="furnished" />
              <span>Furnished </span>
            </div>
          </div>
          <div className=" w-full">
            <select className="select select-error w-full rounded-lg">
              <option disabled={true}>Sort</option>
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="flex items-center gap-2  bg-rose-600 text-white p-2 rounded-lg  justify-center">
            <IoSearch />
            <span> Search</span>
          </button>
        </form>
      </div>
      {/* Right */}
      <div className=" ">
        <h1 className=" text-xl font-semibold p-3 flex gap-2">
          <span> Listing results </span> <FaAngleDown className=" mt-1" />
        </h1>
      </div>
    </div>
  );
};

export default Search;

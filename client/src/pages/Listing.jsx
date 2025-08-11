import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdDiamond } from "react-icons/md";
import { LuShare } from "react-icons/lu";
import { IoIosHeartEmpty } from "react-icons/io";
import { GiHearts } from "react-icons/gi";
import { CiUnlock } from "react-icons/ci";
import { TbToolsKitchen3 } from "react-icons/tb";
import { LuCircleParking } from "react-icons/lu";
import { TbElevator } from "react-icons/tb";
import { IoWifiSharp } from "react-icons/io5";
import { PiCoatHanger } from "react-icons/pi";
import { BsSignNoParking } from "react-icons/bs";
import { useSelector } from "react-redux";
import HostUser from "../components/HostUser";
const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState("");
  const [saved, setSaved] = useState(false);
  const { currentUser } = useSelector((store) => store.user || {});
  const toggleWishlist = async () => {
    try {
      const data = await axios.post(`/api/user/toggle-wishlist`, {
        listingId: listing._id,
      });
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/listing/get/${params.id}`);
        if (res.success === false) {
          setError(true);
          return;
        }
        setListing(res.data);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  return (
    <main className="min-h-screen bg-gray-50">
      {loading && (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      )}

      {!loading && listing && !error && (
        <div className="px-4 sm:px-8 py-6">
          <p className="text-2xl font-medium text-center mb-4">
            {listing?.name}
          </p>
          <div className="flex  justify-end gap-3 my-3">
            <p className=" flex justify-center items-center gap-1 rounded-lg  hover:bg-slate-200 px-2 py-1 cursor-pointer">
              <LuShare className="size-5" />
              <span className="  underline"> Share</span>
            </p>
            <p
              onClick={toggleWishlist}
              className="flex justify-center items-center gap-1 rounded-lg  hover:bg-slate-200 px-2 py-1 cursor-pointer"
            >
              {saved ? (
                <GiHearts className="size-5 text-rose-600" />
              ) : (
                <IoIosHeartEmpty className="size-5" />
              )}
              <span className=" underline"> Save</span>
            </p>
          </div>
          <div className="flex flex-row  sm:flex-row gap-3 justify-center">
            {listing.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="house"
                className={`object-cover  rounded-lg ${
                  index > 1 ? "hidden sm:block" : ""
                } sm:w-[30%] w-48   sm:h-64 h-48 `}
              />
            ))}
          </div>

          {/* Info + Price */}
          <div className="mt-6 mx-12 flex flex-col sm:flex-row justify-between gap-6">
            {/* Left Section - Address and Rooms */}
            <div className="sm:w-[60]  w-full">
              <h1 className=" font-medium text-xl">
                Room in {listing?.address} Urban, India
              </h1>
              <div className="flex flex-wrap gap-3 mt-1 text-gray-700">
                <span>
                  • {listing?.bedrooms}
                  {listing?.bedrooms > 1 ? " bedrooms" : " bedroom"}
                </span>
                <span>
                  • {listing?.bathrooms}
                  {listing?.bathrooms > 1 ? " bathrooms" : " bathroom"}
                </span>
              </div>
              {/* Hosted user */}
              <div className="">
                {currentUser && listing.userRef !== currentUser._id ? (
                  <div className=" my-7">
                    <HostUser hostId={listing?.userRef} />
                  </div>
                ) : (
                  <div className=" my-7">
                    <p>This is your list {currentUser?.username} </p>
                  </div>
                )}
              </div>
              <div className=" mt-10">
                <h1 className="font-medium text-xl">About this place</h1>
                <p>{listing?.description} </p>
              </div>
              <div className="my-3 ">
                <div className="">
                  <h1 className="font-medium  text-xl">
                    What this place offers
                  </h1>
                </div>
                <div className="">
                  {listing?.parking ? (
                    <p className="flex items-center gap-3 my-2 text-lg">
                      <LuCircleParking className=" size-7" />
                      <span>Free parking on premises</span>
                    </p>
                  ) : (
                    <p className="flex items-center gap-3 my-2 text-lg">
                      <BsSignNoParking className=" size-7" />
                      <span>There is no parking available</span>
                    </p>
                  )}
                  <p className="flex items-center gap-3 my-2 text-lg">
                    <CiUnlock className=" size-7" />
                    <span>Lock on bedroom door</span>
                  </p>
                  <p className="flex items-center gap-3 my-2 text-lg">
                    <IoWifiSharp className=" size-7" />
                    <span>Fast wifi – 53 Mbps</span>
                  </p>
                  <p className="flex items-center gap-3 my-2 text-lg">
                    <TbToolsKitchen3 className=" size-7" />
                    <span>Kitchen</span>
                  </p>
                  <p className="flex items-center gap-3 my-2 text-lg">
                    <TbElevator className=" size-7" />
                    <span>Lift</span>
                  </p>
                  <p className="flex items-center gap-3 my-2 text-lg">
                    <PiCoatHanger className=" size-7" />
                    <span>Hangers</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Price Box */}
            <div className="flex sm:w-[40%] flex-col gap-4 w-[400px]">
              <div className="bg-white shadow-md px-6 py-3 rounded-lg flex gap-2 items-center justify-center">
                <MdDiamond className="text-red-500 text-lg" />
                <p className="text-sm">
                  Rare find! This place is usually booked
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md">
                <div className="flex flex-wrap gap-1 items-center m-4">
                  <p className="text-2xl underline font-semibold">
                    ₹
                    {(
                      +listing?.regularPrice - +listing?.discountPrice
                    ).toLocaleString("en-IN")}
                  </p>
                  <span className="mt-1 text-gray-600">for 1 night</span>
                </div>
                <div className="flex flex-col m-3 border  justify-between items-center mx-3 rounded-lg">
                  <div className="flex   rounded-lg justify-between items-center ">
                    <div className=" flex border-r-1 w-1/2 flex-col p-2">
                      <label
                        htmlFor="check-in"
                        className=" uppercase text-[10px] "
                      >
                        check-in
                      </label>
                      <input
                        type="date"
                        name=""
                        id="check-in"
                        className=" focus:outline:none"
                      />
                    </div>
                    <div className=" flex w-1/2 flex-col p-2">
                      <label
                        htmlFor="check-in"
                        className=" uppercase text-[10px]"
                      >
                        check-out
                      </label>
                      <input type="date" name="" id="check-in" />
                    </div>
                  </div>
                  <div className=" border-t-1 w-full ">
                    <p className=" flex flex-col mx-3 my-2">
                      <span className=" text-[10px] uppercase ">Guests</span>
                      <span>1 guest</span>
                    </p>
                  </div>
                </div>
                <div className=" flex flex-col justify-center mx-5">
                  <button className="w-full cursor-pointer bg-rose-600  text-white  py-2 rounded-3xl font-medium">
                    Reserve
                  </button>
                  <p className=" text-center my-3 text-gray-800">
                    You won't be charged yet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center text-red-500 py-10">
          Failed to load listing.
        </div>
      )}
    </main>
  );
};

export default Listing;

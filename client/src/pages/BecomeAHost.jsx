import React from "react";
import { useSelector } from "react-redux";

const BecomeAHost = () => {
  const { currentUser } = useSelector((store) => store.user || {});

  console.log(currentUser);
  return (
    <main className=" p-3 max-w-4xl mx-auto h-full">
      <div className="">
        <h1 className="font-medium sm:text-4xl text-lg text-center my-4">
          Welcome back, {currentUser?.username || "Guest"}
        </h1>
        <p className=" sm:text-xl text-md font-medium mx-3">
          Finish your listing
        </p>
      </div>
      <form className=" flex flex-col sm:flex-row  my-5 bg-whit">
        <div className="flex flex-col gap-4  flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border px-2 py-1 bg-white rounded-lg border-gray-400  focus:outline-none "
            id="name"
            maxLength={62}
            minLength={10}
            required
          />
          <textarea
            placeholder="Description"
            className="border px-2 py-1 bg-white rounded-lg border-gray-400  focus:outline-none  "
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border px-2 py-1 bg-white rounded-lg border-gray-400  focus:outline-none "
            id="address"
          />
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-error rounded-full"
                id="sale"
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2 ">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-error rounded-full"
                id="rent"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-error rounded-full"
                id="parking"
              />
              <span>Parking available</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-error rounded-full"
                id="furnished"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-error rounded-full"
                id="offer"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className=" px-2  py-1 bg-white rounded-lg focus:outline-none border border-gray-400"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                required
                className=" px-2 py-1 bg-white rounded-lg focus:outline-none border border-gray-400"
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min={1}
                max={10}
                required
                className=" px-2 py-1 bg-white rounded-lg focus:outline-none border border-gray-400"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className=" text-xs">(₹ / Month) </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min={1}
                max={10}
                required
                className=" px-2 py-1 bg-white rounded-lg focus:outline-none border border-gray-400"
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className=" text-xs">(₹ / Month) </span>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col flex-1">
          <div className="flex mx-6">
            <fieldset className="fieldset">
              <span>Upload up to 3 images (Max size 2 MB each)</span>
              <div className="flex   gap-7">
                <input type="file" className="file-input" />
                <button className=" bg-black text-white text-[16px] font-medium cursor-pointer  px-4 rounded-lg">
                  Upload
                </button>
              </div>
            </fieldset>
          </div>

          <button className="bg-black text-white py-2 rounded-lg mx-7 mt-5 cursor-pointer hover:opacity-95 disabled:opacity-85">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default BecomeAHost;

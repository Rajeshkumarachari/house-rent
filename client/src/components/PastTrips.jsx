import React from "react";

const PastTrips = () => {
  return (
    <div>
      <h1 className="text-3xl font-medium  text-center ">PastTrips</h1>
      <div className=" flex flex-col items-center justify-center gap-10">
        <img
          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-trips-tab/original/c2f5127b-f701-4e2d-bbf0-d54afe17d6e3.png?im_w=960&im_q=medq"
          alt="PastTrips"
          className=" size-40"
        />
        <p className=" w-[65%] text-center">
          You’ll find your past reservations here after you’ve taken your first
          trip on Airbnb.
        </p>
        <button className=" text-white bg-rose-400 px-5 py-2 rounded-lg">
          Book a trip
        </button>
      </div>
    </div>
  );
};

export default PastTrips;

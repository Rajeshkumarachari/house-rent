import React from "react";

const Connections = () => {
  return (
    <div className="">
      <h1 className="text-3xl font-medium text-center">Connections</h1>
      <div className=" flex flex-col items-center justify-center gap-10">
        <img
          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-UserProfile/original/e7a31b6a-2370-4cec-8bd7-8943d4130a8e.png?im_w=960&im_q=medq"
          alt="Connections"
          className=" w-80 w- h-40"
        />
        <p className=" w-[65%] text-center">
          When you join an experience or invite someone on a trip, you’ll find
          the profiles of other guests here.{" "}
          <span className=" underline cursor-pointer">Learn more</span>
        </p>
        <button className=" text-white bg-rose-400 px-5 py-2 rounded-lg">
          Book a trip
        </button>
      </div>
    </div>
  );
};

export default Connections;

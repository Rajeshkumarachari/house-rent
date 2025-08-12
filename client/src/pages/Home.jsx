import React, { useState } from "react";

const Home = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleData = (e) => {
    console.log(e.target);
    setData({ ...data, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <form action="" className=" flex flex-col bg-white mx-auto w-1/4 gap-4">
        <input
          type="text"
          placeholder="name"
          className=" border p-2 "
          onClick={handleData}
        />
        <input
          type="email"
          placeholder="email"
          className=" border p-2 "
          onClick={handleData}
        />
        <input
          type="password"
          placeholder="password"
          onClick={handleData}
          className=" border p-2 "
        />
      </form>
    </div>
  );
};

export default Home;

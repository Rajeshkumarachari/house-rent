import React from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className=" p-3 max-w-lg mx-auto bg-white rounded-2xl mt-5">
      <h1 className=" text-2xl text-center font-semibold mb-4">Sign Up</h1>

      <form className=" flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="User Name"
          className="border border-slate-400 p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg border-slate-400 "
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg border-slate-400 "
          id="password"
        />
        <button className=" p-3 rounded-lg  text-white bg-red-500 uppercase cursor-pointer hover:opacity-95  disabled:opacity-85">
          Sign up
        </button>
      </form>
      <div className=" flex gap-2 mt-3  ">
        <p> Have an account ?</p>
        <Link to={"/sign-in"}>
          <span className=" text-blue-700 hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;

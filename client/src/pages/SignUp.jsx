import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/userSlice";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((store) => store.user || {});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const data = await axios.post("/api/auth/signup", formData);
      if (data.succuss === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data.data.user));
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(signInFailure(error.response.data.message));
      }
    }
  };
  return (
    <div className="  p-3 max-w-md mx-auto bg-white rounded-2xl mt-5">
      <h1 className=" text-2xl text-center font-semibold mb-4">Sign Up</h1>

      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="User Name"
          className="border mx-3 border-slate-400  max-w rounded-lg p-1 focus:outline-none"
          onChange={handleChange}
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-1 mx-3 focus:outline-none rounded-lg border-slate-400 "
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border mx-3 rounded-lg border-slate-400 p-1 focus:outline-none "
          onChange={handleChange}
          id="password"
        />
        <button
          disabled={loading}
          className=" p-1 mx-3 rounded-lg  text-white bg-red-500 uppercase cursor-pointer hover:opacity-95  disabled:opacity-85"
        >
          {loading ? "Loading..." : " Sign up"}
        </button>
        <OAuth />
      </form>
      <div className=" flex gap-2 mt-3 mx-3  ">
        <p> have an account ?</p>
        <Link to={"/sign-in"}>
          <span className=" text-blue-700 hover:underline">Sign in</span>
        </Link>
      </div>
      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error} </span>
        </div>
      )}
    </div>
  );
};

export default SignUp;

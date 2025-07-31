import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.post("/api/auth/signin", formData);
      console.log("user", data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // <-- show "Wrong credential"
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="  p-3 max-w-md mx-auto bg-white rounded-2xl mt-5">
      <h1 className=" text-2xl text-center font-semibold mb-4 text-slate-700">
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
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
          {loading ? "Loading..." : " Sign in"}
        </button>
      </form>
      <div className=" flex gap-2 mt-3 mx-3  ">
        <p>Dont have an account ?</p>
        <Link to={"/sign-up"}>
          <span className=" text-blue-700 hover:underline">Sign up</span>
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

export default SignIn;

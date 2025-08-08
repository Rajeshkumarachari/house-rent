import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCamera } from "react-icons/io5";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/userSlice";
import axios from "axios";

const About = () => {
  const { currentUser, loading, error } = useSelector(
    (store) => store.user || {}
  );
  const [show, setShow] = useState(false);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  // console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    setUpdateSuccess(false);
    // console.log(file);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setFileUploadPercentage(0);
        });
      }
    );
    // fileUploadPercentage(0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const updatedUser = await axios.post(
        `/api/user/update/${currentUser._id}`,
        formData
      );
      if (updatedUser.success === false) {
        dispatch(updateUserFailure(updatedUser.message));
        return;
      }
      console.log(updatedUser.data);
      setUpdateSuccess(true);
      dispatch(updateUserSuccess(updatedUser.data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <div className=" w-[75vw] ">
      <h1 className="text-3xl font-medium mt-2  text-center">About me</h1>

      {/* {make this below div center in mobile screen only} */}
      <div className="  sm:flex block  items-center text-center">
        <div className="sm:w-[40%] w-full flex flex-col gap-3  shadow-sm m-5 py-5 rounded-2xl ">
          <h1 className=" text-xl">My profile </h1>
          <img
            src={currentUser?.avatar}
            alt="profile"
            className=" rounded-full self-center size-20 object-cover cursor-pointer "
          />
          <p>{currentUser?.username} </p>
          <p>{currentUser?.email} </p>
          <div className="flex justify-between mx-4">
            <button className=" cursor-pointer text-red-600  hover:bg-red-50 rounded-lg p-1 font-medium">
              Delete Account
            </button>
            <button className="cursor-pointer text-red-600  rounded-lg p-1 font-medium">
              Sign Out
            </button>
          </div>
        </div>
        <div className="sm:w-[40%] w-full m-5">
          {!show && (
            <div className="">
              <h1 className=" text-2xl">Complete your profile</h1>
              <p className=" text-sm">
                Your Rajesh house profile is an important part of every
                reservation. Create yours to help other hosts and guests get to
                know you.
              </p>
              <button
                onClick={() => setShow(!show)}
                className="mt-4 text-white px-3 bg-rose-400 py-2 rounded-lg cursor-pointer"
              >
                Get started
              </button>
            </div>
          )}
          {show && (
            <div className="w-full ">
              <form
                onSubmit={handleSubmit}
                className=" flex flex-col gap-3 mx-5"
              >
                {formData.avatar || currentUser?.avatar ? (
                  <div className="">
                    <img
                      src={formData?.avatar || currentUser?.avatar}
                      onClick={() => fileRef.current.click()}
                      alt="avatar"
                      className="w-20 h-20 rounded-full object-cover cursor-pointer mx-auto"
                    />
                    <p
                      onClick={() => fileRef.current.click()}
                      className=" flex items-center gap-2  cursor-pointer hover:opacity-95 relative left-32 -top-2 bg-white shadow-sm w-fit px-3 py-1 rounded-2xl"
                    >
                      <IoCamera className=" size-5" /> <span>Add</span>
                    </p>
                    {fileUploadPercentage > 0 && (
                      <progress
                        className="progress progress-error h-0.5"
                        value={fileUploadPercentage}
                        max="100"
                      ></progress>
                    )}
                    {fileUploadError && (
                      <p className="text-red-500 text-xs font-medium">
                        Error uploading file...
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="">
                    <p className="mx-auto text-white bg-black  rounded-full size-20 text-6xl flex items-center text-center  justify-center ">
                      {currentUser?.username?.split("")[0].toUpperCase() || "A"}
                    </p>
                    <p
                      onClick={() => fileRef.current.click()}
                      className=" flex items-center gap-2  cursor-pointer hover:opacity-95 relative left-32 -top-2 bg-white shadow-sm w-fit px-3 py-1 rounded-2xl"
                    >
                      <IoCamera className=" size-5" /> <span>Add</span>
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  id=""
                  onChange={(e) => setFile(e.target.files[0])}
                  ref={fileRef}
                  hidden
                  accept="image/*"
                />
                <input
                  type="text"
                  placeholder="User name"
                  id="username"
                  onChange={handleChange}
                  defaultValue={currentUser?.username}
                  className="border border-gray-200 rounded-lg px-2 py-1  focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  defaultValue={currentUser?.email}
                  id="email"
                  className="border border-gray-200 rounded-lg px-2 py-1 focus:outline-none "
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  id="password"
                  className="border border-gray-200 rounded-lg px-2 py-1  focus:outline-none"
                />
                <button
                  disabled={loading}
                  onClick={() => dispatch()}
                  className=" bg-slate-900 text-white px-2 py-1 rounded-lg  cursor-pointer"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </form>
              <p className="text-green-700 mt-5">
                {updateSuccess ? "Your profile is updated successfully!" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* <hr className=" text-gray-400 mx-10" /> */}
    </div>
  );
};

export default About;

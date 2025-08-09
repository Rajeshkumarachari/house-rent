import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// import { set } from "mongoose";
import { app } from "../firebase";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BecomeAHost = () => {
  const { currentUser } = useSelector((store) => store.user || {});
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 500,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    // userRef: currentUser?._id,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //   console.log(error);

  console.log(formData);
  const handleUploadImage = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed :", err);
          setUploading(false);
        });
    } else if (
      files.length == 0 &&
      files.length + formData.imageUrls.length == 0
    ) {
      setImageUploadError("Please select minimum 1 image ");
    } else {
      setImageUploadError("You can upload 3 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload 1 image");
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Discount price must be lower than regular price");
      }
      setLoading(true);
      setError(false);
      const data = await axios.post("api/listing/create", {
        ...formData,
        userRef: currentUser?._id,
      });
      console.log(data?.data?._id);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data?.data?._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const decreaseBedroom = () => {
    if (formData.bedrooms > 1) {
      setFormData({
        ...formData,
        bedrooms: formData.bedrooms - 1,
      });
    }
  };
  const increaseBedroom = () => {
    if (formData.bedrooms < 30) {
      setFormData({
        ...formData,
        bedrooms: formData.bedrooms + 1,
      });
    }
  };

  const decreaseBathroom = () => {
    if (formData.bathrooms > 1) {
      setFormData({
        ...formData,
        bathrooms: formData.bathrooms - 1,
      });
    }
  };
  const increaseBathroom = () => {
    if (formData.bathrooms < 30) {
      setFormData({
        ...formData,
        bathrooms: formData.bathrooms + 1,
      });
    }
  };
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
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col sm:flex-row  my-5 bg-whit"
      >
        <div className="flex flex-col gap-4  flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border px-2 py-1 bg-white rounded-lg border-gray-400  focus:outline-none "
            id="name"
            onChange={handleChange}
            value={formData.name}
            maxLength={62}
            minLength={10}
            required
          />
          <textarea
            placeholder="Description"
            className="border px-2 py-1 bg-white rounded-lg border-gray-400  focus:outline-none  "
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border px-2 py-1 bg-white rounded-lg border-gray-400  focus:outline-none "
            id="address"
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                className="checkbox checkbox-error rounded-full"
                id="sale"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2 ">
              <input
                type="checkbox"
                className="checkbox checkbox-error rounded-full"
                id="rent"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                className="checkbox checkbox-error rounded-full"
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking available</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                className="checkbox checkbox-error rounded-full"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                className="checkbox checkbox-error rounded-full"
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 justify-center">
              <p
                onClick={decreaseBedroom}
                className={`rounded-full border flex justify-center items-center cursor-pointer size-7  ${
                  formData.bedrooms == 1 ? " text-gray-400" : "text-gray-700"
                }`}
              >
                -
              </p>
              <span>{formData.bedrooms} </span>
              <p
                onClick={increaseBedroom}
                className={`rounded-full border flex justify-center items-center cursor-pointer size-7  ${
                  formData.bedrooms < 30 ? " text-gray-700" : "text-gray-400"
                } `}
              >
                +
              </p>
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <p
                onClick={decreaseBathroom}
                className={`rounded-full border flex justify-center items-center cursor-pointer size-7  ${
                  formData.bathrooms == 1 ? " text-gray-400" : "text-gray-700"
                }`}
              >
                -
              </p>
              <span>{formData.bathrooms} </span>
              <p
                onClick={increaseBathroom}
                className={`rounded-full border flex justify-center items-center cursor-pointer size-7  ${
                  formData.bathrooms < 30 ? " text-gray-700" : "text-gray-400"
                } `}
              >
                +
              </p>
              <span>Bathroom</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min={500}
                onChange={handleChange}
                value={formData.regularPrice}
                max={100000}
                required
                className=" px-2 py-1 bg-white rounded-lg focus:outline-none border border-gray-400"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className=" text-xs">(₹ / Month) </span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min={0}
                  max={100000}
                  onChange={handleChange}
                  value={formData.discountPrice}
                  required
                  className=" px-2 py-1 bg-white rounded-lg focus:outline-none border border-gray-400"
                />
                <div className="flex flex-col items-center">
                  <p>Discount Price</p>
                  <span className=" text-xs">(₹ / Month) </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" flex flex-col flex-1">
          <div className="flex mx-6">
            <fieldset className="fieldset">
              <span>Upload up to 3 images (Max size 2 MB each)</span>
              <div className="flex gap-7">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  type="file"
                  multiple
                  accept="image/*"
                  className="file-input"
                />
                <button
                  type="button"
                  onClick={handleUploadImage}
                  disabled={uploading}
                  className=" bg-black text-white text-[16px] font-medium cursor-pointer  px-4 rounded-lg"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </fieldset>
          </div>
          <p className=" text-sm text-red-700 mx-6">
            {imageUploadError && imageUploadError}
          </p>
          <div className="flex gap-5 mx-6 mt-3 ">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, i) => (
                <div className="relative inline-block group" key={i}>
                  <img
                    src={url}
                    alt="photo"
                    className=" size-28 object-cover cursor-pointer  rounded-lg"
                  />
                  <IoCloseOutline
                    onClick={() => handleRemoveImage(i)}
                    className=" z-20 bg-white absolute opacity-0 group-hover:opacity-100  -top-2 -right-2  hover:text-white hover:bg-red-500 size-5 cursor-pointer transition-opacity"
                  />
                </div>
              ))}
          </div>
          <button
            disabled={loading || uploading}
            className="bg-black text-white py-2 rounded-lg mx-7 mt-5 cursor-pointer hover:opacity-95 disabled:opacity-85"
          >
            {loading ? "Creating..." : " Create Listing"}
          </button>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error} </p>
          )}
        </div>
      </form>
    </main>
  );
};

export default BecomeAHost;

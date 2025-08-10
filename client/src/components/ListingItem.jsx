import { IoMdHeart } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const ListingItem = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`} className=" w-48">
      <div className=" relative">
        <FiHeart className=" cursor-pointer hover:scale-110 absolute top-1 text-white  bg-gray-90  right-1 size-6" />
        <img
          src={listing?.imageUrls[0]}
          alt="house"
          className=" size-48 object-cover rounded-2xl"
        />
      </div>
      <div className="">
        <p className="text-[15px] font-medium "> {listing?.name} </p>
        <p className=" text-gray-600 text-sm">
          ₹
          {(
            (+listing?.regularPrice - +listing?.discountPrice) *
            2
          ).toLocaleString("en-IN")}{" "}
          for 2 nights
        </p>
      </div>
    </Link>
  );
};

export default ListingItem;

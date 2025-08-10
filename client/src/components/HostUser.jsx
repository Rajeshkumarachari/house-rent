import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const HostUser = ({ hostId }) => {
  const [host, setHost] = useState(null);
  console.log(host);
  useEffect(() => {
    const fetchHostedUser = async () => {
      try {
        const res = await axios.get(`/api/user/${hostId}`);
        setHost(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHostedUser();
  }, [hostId]);

  return (
    <div className=" m-2 flex gap-3">
      <div className="">
        <img
          src={host?.avatar}
          alt="host-photo"
          className=" size-10 rounded-full object-cover"
        />
      </div>
      <div className="">
        <p className=" font-medium">Hosted by {host?.username} </p>
        <p className="  text-sm">
          Superhost • {dayjs(host?.createdAt).fromNow()} hosting
        </p>
      </div>
    </div>
  );
};

export default HostUser;

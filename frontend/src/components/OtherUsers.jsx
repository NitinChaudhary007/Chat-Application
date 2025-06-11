import React from "react";
import SingleUser from "./SingleUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetOtherUsers();

  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) return;

  return (
    <div className="overflow-auto flex-1 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-300 custom-scrollbar">
      {otherUsers?.map((user) => {
        return <SingleUser key={user._id} user={user} />;
      })}
    </div>
  );
};

export default OtherUsers;

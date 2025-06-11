import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const SingleUser = (props) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(props.user._id);

  const handleActive = (e, user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={(e) => handleActive(e, props.user)}
        className={`${
          props?.user._id === selectedUser?._id ? "bg-green-900" : ""
        } flex items-center p-1 gap-2 text-green-100 hover:bg-green-900 rounded-xl cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img src={props.user?.profilePhoto} alt="img" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p>{props.user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default SingleUser;

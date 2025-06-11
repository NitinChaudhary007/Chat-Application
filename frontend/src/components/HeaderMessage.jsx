import React from "react";
import { useSelector } from "react-redux";

const HeaderMessage = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const { onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <div className="flex items-center w-full px-4 py-2 mb-2 p-2 gap-2 text-white bg-green-900 rounded-md">
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-10 rounded-full">
          <img src={selectedUser?.profilePhoto} alt="img" />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between gap-2">
          <p>{selectedUser?.fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderMessage;

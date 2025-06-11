import React from "react";
import SendMessage from "./SendMessage";
import HeaderMessage from "./HeaderMessage";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const { authUser } = useSelector((store) => store.user);
  return (
    <div className="w-3/4 flex flex-col pl-4">
      {selectedUser ? (
        <>
          <HeaderMessage />
          <Messages />
          <SendMessage />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full my-2">
          <h1 className="text-4xl text-white font-bold">
            Hi {authUser?.fullName}
          </h1>
          <h1 className="text-4xl text-white">Let's start a conversation.</h1>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;

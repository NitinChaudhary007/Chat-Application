import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser } = useSelector((store) => store.user);
  const { selectedUser } = useSelector((store) => store.user);
  const scroll = useRef();

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={scroll}
      className={`chat 
        ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={`${
              authUser?._id === message?.senderId
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }`}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble text-white bg-green-700">
        {message?.message}
      </div>
    </div>
  );
};

export default Message;

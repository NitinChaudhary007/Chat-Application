import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const SendMessage = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const [message, setMessage] = useState("");
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, res.data.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex items-center gap-2 bg-white border rounded-xl"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input w-full bg-transparent border-none focus:outline-none"
          placeholder="Type..."
        />
        <button
          type="submit"
          className="btn bg-transparent border-none hover:bg-transparent"
        >
          <IoSend className="w-6 h-6 outline-none fill-gray-500 hover:fill-green-700" />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;

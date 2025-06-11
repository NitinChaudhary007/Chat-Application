import React, { useState } from "react";
import OtherUsers from "./OtherUsers";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      console.log(res);

      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setMessages(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Logout error", error);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    alert(search);
  };

  return (
    <div className="flex flex-col w-1/4 border-r border-slate-500 p-2">
      <form
        onSubmit={searchSubmitHandler}
        className="flex items-center gap-2 bg-white border rounded-xl overflow-hidden"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="input w-4/5 bg-transparent border-none focus:outline-none"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="btn bg-transparent border-none hover:bg-transparent"
        >
          <BsSearch className="w-6 h-6 outline-none fill-gray-500 hover:fill-green-700" />
        </button>
      </form>

      <div className="divider px-3"></div>

      <OtherUsers />

      <div>
        <button
          type="submit"
          className="btn btn-block btn-md mt-2 border border-slate-700 bg-green-900"
          onClick={handleLogout}
        >
          <p>Log out</p>
        </button>
      </div>
    </div>
  );
};

export default SideBar;

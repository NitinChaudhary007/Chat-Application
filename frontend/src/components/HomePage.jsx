import React, { useEffect } from "react";
import SideBar from "./SideBar";
import MessageContainer from "./MessageContainer";
import Login from "./Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {authUser ? (
        <div className="flex w-4/5 p-6 h-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-200">
          <SideBar />
          <MessageContainer />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default HomePage;

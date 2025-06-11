import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Welcome " + res.data.fullName);
      dispatch(setAuthUser(res.data));
      navigate("/");
      //
    } catch (error) {
      console.log("login error", error);
      toast.error(error.response.data.message);
    }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="p-6 h-full w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-green-700">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text text-gray-200">
                Username
              </span>
            </label>
            <input
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="John@123"
            />
          </div>

          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text text-gray-200">
                Password
              </span>
            </label>
            <input
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="john"
            />
          </div>

          <div className="flex items-center">
            <p>Don't have an account?</p>
            <Link
              className="mx-2 text-green-600 font-bold underline"
              to="/register"
            >
              Signup
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-md mt-2 border border-slate-700 bg-green-700"
            >
              <p>Login</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

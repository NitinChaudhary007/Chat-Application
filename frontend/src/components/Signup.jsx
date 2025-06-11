import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleRadio = (selected) => {
    setUser({
      ...user,
      gender: selected,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
      //
    } catch (error) {
      console.log("signup error", error);
      toast.error(error.response.data.message);
    }

    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="p-6 h-full w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-green-700">
          SignUp
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text text-gray-200">
                Full Name
              </span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => {
                setUser({ ...user, fullName: e.target.value });
              }}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="John"
            />
          </div>

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

          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text text-gray-200">
                Confirm password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
              }}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="jonh"
            />
          </div>

          <div className="flex items-center my-4 ">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="radio"
                onChange={() => {
                  handleRadio("male");
                }}
                name="radio-5"
                className="radio radio-success mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                type="radio"
                onChange={() => {
                  handleRadio("female");
                }}
                name="radio-5"
                className="radio radio-success mx-2"
              />
            </div>
          </div>

          <div className="flex items-center">
            <p>Already have an account?</p>
            <Link
              className="mx-2 text-green-600 font-bold underline"
              to="/login"
            >
              login
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-md mt-2 border border-slate-700 bg-green-700"
            >
              <p className="text-white py-2">Signup</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log(req.body);
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res
        .status(400)
        .json({ message: "All fields are required!!!", success: false });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "confirm password don't match", success: false });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "user already registered", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender == "male" ? maleAvatar : femaleAvatar,
      gender,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      success: true,
    });
  } catch (error) {
    console.log("User controller register error");
  }
};

//
//
//
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User is not registered", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Wrong password", success: false });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
        success: true,
      });
  } catch (error) {
    console.log("User controller login error", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const logout = (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("User controller logout error", error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json(otherUser);
  } catch (error) {
    console.log("User controller GetOtherUsers error", error);
  }
};

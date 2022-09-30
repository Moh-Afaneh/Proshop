import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import { generateToken } from "../util/GenToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message: "invalid username or password",
    });
  }
});
// @desc    Get user
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      message: "success",
    });
  } else {
    res.status(200).json({
      message: "User not found",
    });
  }
});
// @desc    update user
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("+password");

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
  }
  const updateUser = await user.save();
  if (updateUser) {
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(200).json({
      message: "User not found",
    });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Something went wrong please try again",
    });
  }
});
// @desc    get all users by admin
// @route   GET /api/users
// @access  private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    res.json({
      users,
    });
  } else {
    res.status(401).json({
      message: "users weren't found",
    });
  }
});
// @desc    get all users by admin
// @route   DELETE /api/users/:id
// @access  private/Admin
export const DelUsers = asyncHandler(async (req, res) => {
  const delUser = await User.findByIdAndDelete(req.params.id);

  if (delUser) {
    res.status(200).json({
      message: "User Removed",
      delUser,
    });
  } else {
    res.status(401).json({
      user: null,
    });
  }
});
// @desc    get one user by admin
// @route   GET /api/users/:id
// @access  private/Admin
export const getUserByIdAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json({
      message: "success",
      user,
    });
  } else {
    res.status(401).json({
      message: "failed to get user Check ID",
    });
  }
});
// @desc    Update one user by admin
// @route   PUT /api/users/:id
// @access  private/Admin
export const UpdateUserAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("+password");

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
  }
  const updateUser = await user.save();
  if (updateUser) {
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(401).json({
      message: "failed to get user, Check ID",
    });
  }
});

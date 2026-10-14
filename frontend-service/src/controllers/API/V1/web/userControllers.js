"use strict";
const { status, } = require("http-status");
const { message500 } = require("../../../../utils/httpResponses");
const asyncHandler = require("express-async-handler");
const {
  register,
  login,
  authorise,
  logout,
  uploadAvatar: uploadAvatarService,
  updateUser: updateUserService,
  deleteAvatar,
} = require("../../../../services/usersService");

const createUser = asyncHandler(async (req, res) => {
  try {
    const newUserRes = await register(
      req.body,
      req.headers,
    );
    res.status(newUserRes.status);
    return res.json(newUserRes.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status);
      return res.json(error.response.data);
    }
    res.status(status.INTERNAL_SERVER_ERROR);
    throw new Error(message500);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const loginUserRes = await login(
      req.body,
      req.headers,
    );
    res.status(loginUserRes.status);
    return res.json(loginUserRes.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status);
      return res.json(error.response.data);
    }
    res.status(status.INTERNAL_SERVER_ERROR);
    throw new Error(message500);
  }
});

const authoriseUser = asyncHandler(async (req, res) => {
  const bearerToken = req.headerString("authorization");
  if (!bearerToken || null === bearerToken.match(/Bearer \w+/g)) {
    res.status(status.UNAUTHORIZED);
    throw new Error("Missing authorization header.");
  }
  try {
    const extractedToken = bearerToken
    .split(" ")[1];
    const authoriseUserRes = await authorise(
      extractedToken,
      req.headers,
    );
    res.status(authoriseUserRes.status);
    return res.json(authoriseUserRes.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status);
      return res.json(error.response.data);
    }
    res.status(status.INTERNAL_SERVER_ERROR);
    throw new Error(message500);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    const logoutRes = await logout(
      req.session.extractedToken,
      req.headers,
    );
    res.status(logoutRes.status);
    return res.json(logoutRes.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status);
      return res.json(error.response.data);
    }
    res.status(status.INTERNAL_SERVER_ERROR);
    throw new Error(message500);
  }
});

const uploadAvatar = asyncHandler(async (req, res) => {
  try {
    const uploadAvatarRes = await uploadAvatarService(
      req.body,
      req.headers,
    );
    res.status(uploadAvatarRes.status);
    return res.json(uploadAvatarRes.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status);
      return res.json(error.response.data);
    }
    res.status(status.INTERNAL_SERVER_ERROR);
    throw new Error(message500);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const updateUserRes = await updateUserService(
      req.body,
      req.headers,
    );
    res.status(updateUserRes.status);
    return res.json(updateUserRes.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status);
      return res.json(error.response.data);
    }
    res.status(status.INTERNAL_SERVER_ERROR);
    throw new Error(message500);
  }
});

const removeAvatar = asyncHandler(async (req, res) => {
  try {
    const deleteAvatarRes = await deleteAvatar(
      req.body,
      req.headers,
    );
    res.status(deleteAvatarRes.status);
    return res.json(deleteAvatarRes.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status);
      return res.json(error.response.data);
    }
    res.status(status.INTERNAL_SERVER_ERROR);
    throw new Error(message500);
  }
});

module.exports = {
  createUser,
  loginUser,
  authoriseUser,
  logoutUser,
  uploadAvatar,
  updateUser,
  removeAvatar,
};
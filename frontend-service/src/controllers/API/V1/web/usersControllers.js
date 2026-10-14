'use strict';
const { status, } = require('http-status');
const { message500, } = require("../../../../utils/httpResponses");
const asyncHandler = require("express-async-handler");
const { getUsers: getUsersService } = require("../../../../services/usersService");

const getUsers = asyncHandler(async (req, res) => {
  try {
    const getUsersRes = await getUsersService(
      req.url,
      req.session.extractedToken,
      req.headers,
    );
    res.status(getUsersRes.status);
    return res.json(getUsersRes.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status);
      return res.json(error.response.data);
    }
    res.status(status.INTERNAL_SERVER_ERROR);
    throw new Error(message500);
  }
});

module.exports = { getUsers, };
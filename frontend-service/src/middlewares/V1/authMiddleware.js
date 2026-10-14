"use strict";
const { status, } = require("http-status");
const { message401, } = require("../../utils/httpResponses");
const asyncHandler = require("express-async-handler");
const { authorise } = require("../../services/usersService");

module.exports.authenticate = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(status.UNAUTHORIZED);
    throw new Error(message401);
  }
  const bearerToken = req.headerString("authorization");
  if (!bearerToken || null === bearerToken.match(/Bearer \w+/g)) {
    res.status(status.UNAUTHORIZED);
    throw new Error("Missing authorization header.");
  }
  let authoriseRes, extractedToken;
  try {
    extractedToken = bearerToken
    .split(" ")[1];
    authoriseRes = await authorise(extractedToken);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status);
      throw new Error(error.response.data.message);
    }
    res.status(status.UNAUTHORIZED);
    throw new Error(message401);
  }
  req.session.userId = authoriseRes.data.user.id;
  req.session.extractedToken = extractedToken;
  return next();
});
"use strict";
const asyncHandler = require("express-async-handler");
const { hello: helloService } = require("../../../../services/usersMobileService");
const { status } = require("http-status");
const { message500 } = require("../../../../utils/httpResponses");

const hello = asyncHandler(async (req, res) => {
  try {
    const helloRes = await helloService(
      req.headers,
    );
    res.status(helloRes.status);
    return res.json(helloRes.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status);
      return res.json(error.response.data);
    }
    res.status(status.INTERNAL_SERVER_ERROR);
    throw new Error(message500);
  }
});

module.exports = { hello, };
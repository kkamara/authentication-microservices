"use strict";
const axios = require("axios");
const {
  usersMobileServiceURL
} = require("../config");
const { forwardHeaders } = require("../utils/services");

/**
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.hello = async (headers) => {
  return await axios.get(
    `${usersMobileServiceURL}/hello`, {
      headers: forwardHeaders(headers),
    },
  );
};
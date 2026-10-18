"use strict";
const {
  usersServiceURL
} = require('../config');
const axios = require("axios");
const fs = require("fs");

/**
 * Allowlist of headers to forward: Time-Zone (if present) and Authorization (if a token is given).
 * @param {Object} headers incoming request headers (lower-cased by Node)
 * @param {string} [token]
 * @returns {Object}
 */
const forwardHeaders = (headers = {}, token) => {
  const forwarded = {};
  if (headers["time-zone"]) {
    forwarded["Time-Zone"] = headers["time-zone"];
  }
  if (token) {
    forwarded.Authorization = `Bearer ${token}`;
  }
  return forwarded;
};

/**
 * @param {Object} body
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.register = async (body, headers) => {
  return await axios.post(
    `${usersServiceURL}/user/register`,
    body, {
      headers: forwardHeaders(headers)
    },
  );
};

/**
 * @param {Object} body
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.login = async (body, headers) => {
  return await axios.post(
    `${usersServiceURL}/user/`,
    body, {
      headers: forwardHeaders(headers)
    },
  );
};

/**
 * @param {string} token
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.authorise = async (token, headers) => {
  return await axios.get(
    `${usersServiceURL}/user/authorise`, {
      headers: forwardHeaders(headers, token)
    },
  );
};

/**
 * @param {string} token
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.logout = async (token, headers) => {
  return await axios.delete(
    `${usersServiceURL}/user`, {
      headers: forwardHeaders(headers, token)
    },
  );
};


/**
 * @param {Object} body
 * @param {string} token
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.updateUser = async (body, token, headers) => {
  return await axios.put(
    `${usersServiceURL}/user`,
    body, {
      headers: forwardHeaders(headers, token)
    },
  );
};

/**
 * @param {Object} file multer file (disk storage)
 * @param {string} token
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.uploadAvatar = async (file, token, headers) => {
  const form = new FormData();
  form.append(
    "avatar",
    new Blob(
      [await fs.promises.readFile(file.path)], {
        type: file.mimetype
      },
    ),
    file.originalname,
  );

  try {
    return await axios.post(
      `${usersServiceURL}/user/avatar`,
      form, {
        headers: forwardHeaders(headers, token)
      },
    );
  } finally {
    fs.promises.unlink(file.path).catch(() => {});
  }
};

/**
 * @param {string} token
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.deleteAvatar = async (token, headers) => {
  return await axios.delete(
    `${usersServiceURL}/user/avatar`, {
      headers: forwardHeaders(headers, token)
    },
  );
};

/**
 * @param {string} urlVariablesString /?page=3
 * @param {string} token
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.getUsers = async (urlVariablesString, token, headers) => {
  return await axios.get(
    `${usersServiceURL}/users${urlVariablesString}`, {
      headers: forwardHeaders(headers, token)
    },
  );
};
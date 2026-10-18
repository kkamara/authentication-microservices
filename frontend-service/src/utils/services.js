"use strict";

/**
 * Allowlist of headers to forward: Time-Zone (if present) and Authorization (if a token is given).
 * @param {Object} headers incoming request headers (lower-cased by Node)
 * @param {string} [token]
 * @returns {Object}
 */
module.exports.forwardHeaders = (headers = {}, token) => {
  const forwarded = {};
  if (headers["time-zone"]) {
    forwarded["Time-Zone"] = headers["time-zone"];
  }
  if (token) {
    forwarded.Authorization = `Bearer ${token}`;
  }
  return forwarded;
};
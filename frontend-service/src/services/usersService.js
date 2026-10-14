"use strict";
const { usersServiceURL } = require('../config');
const axios = require("axios");

/**
 * @param {Object} body
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.register = async (body, headers) => {
    return await axios.post(
        `${usersServiceURL}/user/register`,
        body,
        { headers },
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
        body,
        { headers },
    );
};

/**
 * @param {string} token
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.authorise = async (token, headers) => {
    return await axios.get(
        `${usersServiceURL}/user/authorise`,
        {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
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
        `${usersServiceURL}/user`,
        {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        },
    );
};


/**
 * @param {Object} body
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.updateUser = async (body, headers) => {
    return await axios.put(
        `${usersServiceURL}/user`,
        body,
        { headers },
    );
};

/**
 * @param {Object} body
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.uploadAvatar = async (body, headers) => {
    return await axios.post(
        `${usersServiceURL}/user/avatar`,
        body,
        { headers },
    );
};

/**
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.deleteAvatar = async (headers) => {
    return await axios.delete(
        `${usersServiceURL}/user/avatar`,
        { headers },
    );
};

/**
 * @param {string} token
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.getUsers = async (token, headers) => {
    return await axios.get(
        `${usersServiceURL}/users`,
        {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
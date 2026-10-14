"use strict";
const { usersServiceURL } = require('../config');
const axios = require("axios");
const fs = require("fs");

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
 * @param {Object} file multer file (disk storage)
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.uploadAvatar = async (file, headers) => {
    const form = new FormData();
    form.append(
        "avatar",
        new Blob(
            [await fs.promises.readFile(file.path)],
            { type: file.mimetype },
        ),
        file.originalname,
    );

    // Drop incoming multipart headers so axios sets its own boundary and length
    const {
        "content-type": _type,
        "content-length": _length,
        ...forwardHeaders
    } = headers;

    try {
        return await axios.post(
            `${usersServiceURL}/user/avatar`,
            form,
            { headers: forwardHeaders },
        );
    } finally {
        fs.promises.unlink(file.path).catch(() => { });
    }
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
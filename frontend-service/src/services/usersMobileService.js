"use strict";
const axios = require("axios");
const { usersMobileServiceURL } = require("../config"); 

/**
 * @param {Object} headers
 * @returns {Promise<Object>}
 */
module.exports.hello = async (headers) => {
    return await axios.get(
        `${usersMobileServiceURL}/hello`,
        { headers, },
    );
};
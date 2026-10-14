'use strict';
const express = require('express');
const { health } = require('../../controllers/API/healthControllers');

const router = express.Router();

router.route("/health").get(health);

module.exports = router;
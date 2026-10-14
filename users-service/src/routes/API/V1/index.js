'use strict';
const express = require('express');
const userRoutes = require("./userRoutes");
const usersRoutes = require("./usersRoutes");

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/user", userRoutes);

module.exports = router;
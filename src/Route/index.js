const express = require("express");
const _ = express.Router();
const registrationRoute = require("./api/registration.apiRoutes");
const baseApi = process.env.BASE_API;

_.use(baseApi, registrationRoute);
_.use("*", (req, res) => {
  return res.status(404).json({
    sucess: false,
    data: null,
    message: "Your route is invalid",
    error: true,
  });
});

module.exports = _;

"use strict";

var logger = require("../logger");
var express = require("express");

var pingApi = express.Router({mergeParams: true});

pingApi.use(function (req, res, next) {
    logger.info("Ping Request Received");
    res.send("pong");
});

module.exports = pingApi;
"use strict";

var logger = require("../logger");
var express = require("express");
var aribaApprovalManager = require("../lib/aribaApprovalManager");

var aribaApprovalApi = express.Router({mergeParams: true});


aribaApprovalApi.use(function (req, res, next) {
    logger.info("Get Request received");

    aribaApprovalManager.getDocumentsForApprovalFromAriba(req.body)
        .then(function (oData) {
            res.send(oData);
        })
        .catch(next);
});

module.exports = aribaApprovalApi;
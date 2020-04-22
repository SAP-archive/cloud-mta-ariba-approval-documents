"use strict";

var logger = require("./logger");
var xsenv = require("@sap/xsenv");
var passport = require("passport");
var { JWTStrategy } = require("@sap/xssec");

var express = require("express");
var app = express();


// XSUAA Middleware
passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa));
app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/ping/", require("./api/pingApi"));
app.use("/ariba/", require("./api/aribaApprovalApi"));


app.get("/", function (req, res) {
    res.send("This is the backend. Send requests to the specific endpoints");
});

var port = process.env.PORT || 9600;
var listener = app.listen(port, function () {
    logger.info("Backend server up and running, listening on port " + listener.address().port);
    logger.info("http://localhost:" + listener.address().port);
});

module.exports = listener;

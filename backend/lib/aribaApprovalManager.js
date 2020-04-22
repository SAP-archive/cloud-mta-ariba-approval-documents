"use strict";

var logger = require("../logger");
var axios = require("axios");
var cloudSDK = require("../cloudSDK");


function getDocumentsForApprovalFromAriba(oBody) {
    return new Promise(function (resolve, reject) {
        cloudSDK.getDestination("ariba-approval-documents-sandbox").then(function(oDestination) {
            var sApprovableType = "requisitions";
            var sApprovableId = "PR2";
            var sRealm = "mytestrealm";

            if (!oDestination) {
                reject("Error - no destination found");
            }

            if (oBody && oBody.type) {
                var sApprovableType = oBody.type;
            }

            if (oBody && oBody.realm) {
                var sRealm = oBody.realm;
            }

            // See https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings
            var sUrlParameter = `${sApprovableType}/${sApprovableId}`;
            var sApi = oDestination.url + sUrlParameter;

            logger.info("Sending request to: " + sApi);
            axios.get(sApi, {
                params: {
                    realm: sRealm
                },
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "APIKey": oDestination.originalProperties.APIKey
                }
            }).then(function (oData) {
                logger.info("Successfully received response");
                resolve(oData.data);
            })
            .catch(function (oError) {
                logger.error("Error when calling: " + sApi);
                reject("Error");
            });
        })
        .catch(function (oError) {
            logger.error("Error accessing destination.");
            reject("Error");
        });
    });
}

exports.getDocumentsForApprovalFromAriba = function (oBody) {
    return getDocumentsForApprovalFromAriba(oBody);
};
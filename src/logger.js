"use strict";
var winston = require("winston");
// winston.emitErrs = true;
var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: "info",
            filename: "./logs/all-logs.log",
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
exports.__esModule = true;
exports["default"] = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};
//# sourceMappingURL=logger.js.map
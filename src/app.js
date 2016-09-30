/// <reference path="_all.d.ts" />
"use strict";
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var indexRoute = require("./routes/index");
var main_1 = require("./controllers/main");
var api_1 = require("./controllers/api");
var logger_1 = require("./logger");
/**
 * The server.
 *
 * @class Server
 */
var Server = (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //configure routes
        this.routes();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    Server.prototype.config = function () {
        //configure jade
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        //mount logger
        //this.app.use(logger("dev"));
        // Build the connection string
        var dbURI = "mongodb://localhost:27017/posts";
        // Create the database connection
        mongoose.connect(dbURI);
        mongoose.connection.once("open", function () {
            logger_1["default"].log("debug", "Mongoose is open.");
        });
        // CONNECTION EVENTS
        // When successfully connected
        mongoose.connection.on("connected", function () {
            logger_1["default"].log("Mongoose default connection open to " + dbURI);
        });
        // If the connection throws an error
        mongoose.connection.on("error", function (err) {
            console.log("Mongoose default connection error: " + err);
        });
        // When the connection is disconnected
        mongoose.connection.on("disconnected", function () {
            console.log("Mongoose default connection disconnected");
        });
        //mount json form parser
        this.app.use(bodyParser.json());
        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    };
    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    Server.prototype.routes = function () {
        //get router
        var router;
        router = express.Router();
        //create routes
        var index = new indexRoute.Index();
        //home page
        router.get("/", main_1["default"].getIndex);
        router.get("/api/posts", api_1["default"].getAllPosts);
        router.get("/api/posts/:postid", api_1["default"].getPost);
        router.post("/api/posts", api_1["default"].createPost);
        //use router middleware
        this.app.use("/", router);
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;
//# sourceMappingURL=app.js.map
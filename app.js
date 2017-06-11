"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const main_1 = require("./controllers/main");
const api_1 = require("./controllers/api");
const logger_1 = require("./logger");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    static bootstrap() {
        return new Server();
    }
    config() {
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        var mongoHost = "192.168.0.102";
        let dbURI = "mongodb://" + mongoHost + ":27017/posts";
        mongoose.connect(dbURI);
        mongoose.connection.once("open", function () {
            logger_1.default.debug("Mongoose is open.");
        });
        mongoose.connection.on("connected", function () {
            logger_1.default.debug("Mongoose default connection open to " + dbURI);
        });
        mongoose.connection.on("error", function (err) {
            logger_1.default.debug("Mongoose default connection error: " + err);
        });
        mongoose.connection.on("disconnected", function () {
            logger_1.default.debug("Mongoose default connection disconnected");
        });
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "/")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
    routes() {
        let router;
        router = express.Router();
        router.get("/", main_1.default.getIndex);
        router.get("/templates/:template", main_1.default.getTemplate);
        router.get("/api/posts", api_1.default.getAllPosts);
        router.get("/api/posts/:postid", api_1.default.getPost);
        router.post("/api/posts", api_1.default.createPost);
        router.put("/api/posts/:postid", api_1.default.updatePost);
        router.delete("/api/posts/:postid", api_1.default.deletePost);
        this.app.use("/", router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;

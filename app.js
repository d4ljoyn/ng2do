"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const indexRoute = require("./routes/index");
const main_1 = require("./controllers/main");
const api_1 = require("./controllers/api");
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
        var dbURI = "mongodb://localhost:27017/posts";
        mongoose.connect(dbURI);
        mongoose.connection.once("open", function () {
            console.log("Mongoose is open.");
        });
        mongoose.connection.on("connected", function () {
            console.log("Mongoose default connection open to " + dbURI);
        });
        mongoose.connection.on("error", function (err) {
            console.log("Mongoose default connection error: " + err);
        });
        mongoose.connection.on("disconnected", function () {
            console.log("Mongoose default connection disconnected");
        });
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "public")));
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
        var index = new indexRoute.Index();
        router.get("/", main_1.default.getIndex);
        router.get("/api/posts", api_1.default.getAllPosts);
        this.app.use("/", router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;

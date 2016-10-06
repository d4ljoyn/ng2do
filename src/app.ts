/// <reference path="_all.d.ts" />
"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as mongoose from "mongoose";

import * as indexRoute from "./routes/index";
import mainController from "./controllers/main";
import apiController from "./controllers/api";
import logger from "./logger";

/**
 * The server.
 *
 * @class Server
 */
class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //configure routes
    this.routes();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   * @return void
   */
  private config() {
    //configure jade
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //mount logger
    //this.app.use(logger("dev"));
    // Build the connection string
    var dbURI = "mongodb://localhost:27017/posts";

    // Create the database connection
    mongoose.connect(dbURI);

    mongoose.connection.once("open", function() {
      logger.debug( "Mongoose is open.");
    });
    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on("connected", function () {
      logger.debug( "Mongoose default connection open to " + dbURI);
    });

    // If the connection throws an error
    mongoose.connection.on("error", function (err : string) {
      logger.debug("Mongoose default connection error: " + err);
    });

    // When the connection is disconnected
    mongoose.connection.on("disconnected", function () {
      logger.debug("Mongoose default connection disconnected");
    });


    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //add static paths
    this.app.use(express.static(path.join(__dirname, "/")));
    this.app.use(express.static(path.join(__dirname, "bower_components")));

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      var error = new Error("Not Found");
      err.status = 404;
      next(err);
    });
  }

  /**
   * Configure routes
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes() {
    //get router
    let router: express.Router;
    router = express.Router();

    //create routes
    var index: indexRoute.Index = new indexRoute.Index();

    //home page
    router.get("/", mainController.getIndex);
    router.get("/templates/:template", mainController.getTemplate);
    router.get("/api/posts", apiController.getAllPosts);
    router.get("/api/posts/:postid", apiController.getPost);
    router.post("/api/posts", apiController.createPost);
    router.put("/api/posts/:postid", apiController.updatePost);
    router.delete("/api/posts/:postid", apiController.deletePost);
    //use router middleware
    this.app.use("/", router);
  }
}

var server = Server.bootstrap();
export = server.app;

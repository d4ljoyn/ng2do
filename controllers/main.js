"use strict";
const Post_1 = require("../models/Post");
let mainController = {
    getIndex: (req, res) => {
        res.render("index");
    },
    getTemplate: (req, res) => {
        res.render("templates/" + req.params.template);
    },
    getAllPosts: (req, res) => {
        Post_1.Post.find({}, (err, posts) => {
            if (err) {
                return res.send(err);
            }
            res.json(posts);
        });
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mainController;

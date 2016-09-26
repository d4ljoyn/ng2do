"use strict";
const Post_1 = require("../models/Post");
let apiController = {
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
exports.default = apiController;

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
    getPost: (req, res) => {
        let idParam = req.params.postid;
        Post_1.Post.findById(idParam, (err, post) => {
            if (err) {
                return res.send(idParam);
            }
            res.json(post);
        });
    },
    createPost: (req, res) => {
        let newPost = new Post_1.Post({
            "id": req.body.id,
            "title": req.body.title,
            "content": req.body.content });
        newPost.save((err) => {
            if (err) {
                res.send(err);
            }
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = apiController;

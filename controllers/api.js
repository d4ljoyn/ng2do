"use strict";
const Post_1 = require("../models/Post");
const logger_1 = require("../logger");
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
            "content": req.body.content
        });
        logger_1.default.debug(req.body);
        logger_1.default.debug(JSON.stringify(newPost));
        newPost.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json(newPost);
        });
    },
    updatePost: (req, res) => {
        let idParam = req.params.postid;
        Post_1.Post.findByIdAndUpdate(idParam, { $set: req.body }, (err, doc) => {
            if (err) {
                res.send(err);
            }
            else {
                if (doc != null) {
                    res.json(doc);
                }
                else {
                    res.sendStatus(404);
                }
            }
        });
    },
    deletePost: (req, res) => {
        let idParam = req.params.postid;
        Post_1.Post.findOneAndRemove({ "_id": idParam }, (err, doc) => {
            if (err) {
                return res.send(err);
            }
            else {
                if (doc != null) {
                    res.send("Document _id removed " + idParam);
                }
                else {
                    res.sendStatus(404);
                }
            }
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = apiController;

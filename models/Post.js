"use strict";
const mongoose = require("mongoose");
var postSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    originalId: {
        type: String,
        require: true
    },
    author: {
        type: String
    },
    title: {
        type: String
    },
    link: {
        type: String
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    excerpt: {
        type: String
    },
    pubDate: {
        type: Date
    },
    lastModifiedDate: {
        type: Date
    },
    alias: {
        type: String
    },
    status: {
        type: String
    },
    category: {
        type: [String]
    }
});
exports.Post = mongoose.model("Post", postSchema);

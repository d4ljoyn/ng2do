
import mongoose = require("mongoose");

export interface IPost extends mongoose.Document {
    id: string;
    originalId: string;
    author: string;
    title: string;
    link: string;
    description: string;
    content: string;
    excerpt: string;
    pubDate: Date;
    lastModifiedDate: Date;
    alias: string;
    status: string;
    category: Array<string>;

}
var postSchema: mongoose.Schema = new mongoose.Schema({
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

export  var Post =  mongoose.model<IPost>("Post", postSchema);

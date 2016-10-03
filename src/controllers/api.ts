import {Post} from "../models/Post";
import logger from "../logger";

let apiController = {
  getAllPosts: (req, res) => {
    Post.find({}, (err, posts) => {
      if (err) {
        return res.send(err);
      }
      res.json(posts);
    });
  },
  getPost: (req, res) => {
    let idParam: string = req.params.postid;
    Post.findById(idParam, (err, post) => {
      if (err) {
        return res.send(idParam);
      }
      res.json(post);
    });
  },
  createPost: (req, res) => {
    let newPost = new Post({
        "id": req.body.id,
        "title": req.body.title,
        "content": req.body.content
      }
    );
    logger.debug(req.body);
    logger.debug(JSON.stringify(newPost));
    newPost.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json(newPost);
    });
  },
  updatePost: (req, res) => {
    let idParam : string = req.params.postid;
    Post.findByIdAndUpdate(idParam, {$set: req.body}, (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        if (doc != null) {
          res.json(doc);
        } else {
          res.sendStatus(404);
        }
      }
    });
  },
  deletePost: (req, res) => {
    let idParam: string = req.params.postid;
    Post.findOneAndRemove({"_id": idParam}, (err, doc) => {
      if (err) {
        return res.send(err);
      } else {
        if (doc != null) {
          res.send("Document _id removed " + idParam);
        } else {
          res.sendStatus(404);
        }
      }

    });
  }
};
export default apiController;

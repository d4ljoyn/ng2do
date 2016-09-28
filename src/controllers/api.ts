import {Post} from "../models/Post";

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
      let idParam : string = req.params.postid;
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
        "content": req.body.content}
      );
      newPost.save( (err) => {
        if (err) {
          res.send(err);
        }
        res.json(newPost);
      });
    }
};
export default apiController;

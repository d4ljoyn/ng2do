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
};
export default apiController;
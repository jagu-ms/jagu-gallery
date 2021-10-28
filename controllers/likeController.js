const Post = require('../modules/post');
const createError = require('http-errors');


exports.create = (req, res, next) => {
    let data = {
        _id: req.user.id,
    }

    Post.findById(req.params.id)

    .then(post => {
        if(!post) throw createError(404);
        post.likes.push(data);
        return post.save();
    })

    .then(post => {
        res.json(post);
    })

    .catch(next);
};

exports.delete = (req, res, next) => {
    let postId = req.params.id;

    Post.findById(postId)

    .then(post => {
        if(!post) throw createError(404);
        post.likes.pull({ _id: req.user.id })
        return post.save();
    })

    .then(post => {
        res.json(post); 
    })

    .catch(next);
};
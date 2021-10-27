const Post = require('../modules/post');
const createError = require('http-errors');
const mongoose = require('mongoose');

exports.handler =  (req, res) => {
    const user = req.user.id
    const {post, type} = req.body
    Post.like(post, {user, type})
    .then(post => {
        if(!post) throw createError(404);
        res.status(200).json()
    })
    .catch(next);
} 

exports.unrepeatable = (req, res) => {
    const user = req.user.id
    const {id} = req.body;
    const post = await Post.findOne({_id: question, parent: null})
    if (post?.user != user) return res.status(403).json()

    await Post.updateMany({parent: question}, {"answer.accepted": false})
    await Post.updateMany({parent: question, _id: answer}, {"answer.accepted": true})
    res.status(200).json()
}

exports.create = (req, res, next) => {
    let data = {
        _id: mongoose.Types.ObjectId(),
        content: req.body.content,
        author: req.user.id
    }

    Post.findById(req.params.postId)

    .then(post => {
        if(!post) throw createError(404);
        post.likes.push(data);
        return post.save();
    })

    .then(post => {
        let comment = post.comments.id(data._id);
        res.json(comment);
    })

    .catch(next);
};
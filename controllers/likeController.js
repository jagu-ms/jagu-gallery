const Post = require('../modules/post');
const createError = require('http-errors');

exports.handler = async (req, next, res) => {
    const user = req.user.id
    const {post, type} = req.body
    await Post.like(post, {user, type})
    res.status(200).json()
} 
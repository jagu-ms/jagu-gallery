const Post = require('../modules/post');
const createError = require('http-errors');

exports.create = (req, res, next) => {
    console.log(req.file)
    let model = new Post({
        img: req.file.filename,
        title: req.body.title,
        discr: req.body.discr,
        author: req.user.id
    });

    model.save()

    .then(post => {
        res.json();
    })

    .catch(next);
};

exports.list = (req, res, next) => {
    Post.find()
    .sort({created_at: 'desc'})
    .populate('author', 'name')

    .then(posts => {
        res.json(posts);
    })

    .catch(next);

};

exports.mine = (req, res, next) => {
    console.log(req.user.id)
    Post.find({author: req.user.id})
    .sort({created_at: 'desc'})

    .then(posts => {
        res.json(posts);
    })

    .catch(next);
};

exports.post = (req, res, next) => {
    let postId = req.params.id;
    Post.findById(postId)

    .populate('author', 'name')

    .then(post =>{
        if(!post) throw createError(404);
        res.json(post);
    })

    .catch(next);
};

exports.update = (req, res, next) => {
    let postId = req.params.id;

    let data = {
        img: req.file.filename,
        title: req.body.title,
        discr: req.body.discr,
    };

    Post.findOneAndUpdate({_id: postId, author: req.user.id}, data, {runValidators: true})

    .then(post => {
        if(!post) throw createError(404);
        res.json();
    })

    .catch(next);
};

exports.delete = (req, res, next) => {
    let postId = req.params.id;

    Post.findOneAndDelete({_id: postId, author: req.user.id})

    .then(post => {
        if(!post) throw createError(404);
        res.json();
    })

    .catch(next);
}
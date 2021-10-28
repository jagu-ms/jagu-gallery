const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikesSchema = new Schema({});

const PostSchema = new Schema ({
    img: String,
    title: {
        type: String,
        required: true,
    },
    discr: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: [
        LikesSchema
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
});

PostSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

PostSchema.set('toJSON', {virtuals: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
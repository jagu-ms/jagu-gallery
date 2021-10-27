const mongoose = require('mongoose');

const Schema = mongoose.Schema;


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
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            type: {
                type: Boolean
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
});

PostSchema.statics.like = async function (_id, {type, user}) {
    const {n: updated} = await this.updateOne(
        {
            '_id': _id,
            'likes.user': user
        },
        {
            $set: {"likes.$.type": type}
        }
    )
    if (updated) return;
    await this.updateOne({_id}, {
        $push: {likes: {type, user}}
    })
}

PostSchema.virtual('likesTotal').get(function () {
    let total = 0;
    for (let like of this.likes) total += like.type ? 1 : -1 /* 0 */;
    return total;
});

PostSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

PostSchema.set('toJSON', {virtuals: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
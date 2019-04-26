const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String, required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String,
    issuedAt: {
        type: Date,
        required: true
    },
    image: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
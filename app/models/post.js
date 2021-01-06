const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
const commentSchema = new Schema({ content: String });

// Define schema
const postSchema = new Schema({
    title: { type: String, required: true },
    content: String,
    comments: [commentSchema]
});

// Define model
Post = mongoose.model('Post', postSchema);
module.exports = Post;

const Post = require('../models/post');

// Get all posts
const getPosts = async function (req, res, next) {
    try {
        const posts = await Post.find({});
        return res.json({ posts: posts.map((p) => p.toJSON()) });
    } catch (err) {
        return next(err);
    }
};

// New post
const newPost = async function (req, res, next) {
    const content = req.body.content;
    const title = req.body.title;

    try {
        const post = await Post.create({ content, title });
        return res.json(post.toJSON());
    } catch (err) {
        return next(err);
    }
};

// Get specific post
const getPost = async function (req, res, next) {
    try {
        const post = await Post.findById(req.params.postID);
        if (!post) {
            const err = Error('Cannot find post');
            err.status = 404;
            throw err;
        }
        return res.json(post.toJSON());
    } catch (err) {
        return next(err);
    }
};

// Modify post content
const modifyPost = async function (req, res, next) {
    const content = req.body.content;
    const title = req.body.title;

    try {
        const post = await Post.findById(req.params.postID);
        if (!post) {
            const err = Error('Cannot find post');
            err.status = 404;
            throw err;
        }

        // Update
        if (content) {
            post.content = content;
        }
        if (title) {
            post.title = title;
        }

        await post.save();
        return res.json(post.toJSON());
    } catch (err) {
        return next(err);
    }
};

// Delete post
const deletePost = async function (req, res, next) {
    try {
        const post = await Post.findByIdAndDelete(req.params.postID);
        if (!post) {
            const err = Error('Cannot find post or post is already deleted');
            err.status = 400;
            throw err;
        }
        return res.json({ status: 'success' });
    } catch (err) {
        return next(err);
    }
};

// Add comment
const addComment = async function (req, res, next) {
    const postID = req.params.postID;
    const content = req.body.content;

    try {
        const post = await Post.findById(postID);
        if (!post) {
            const err = Error('Cannot find post');
            err.status = 400;
            throw err;
        }

        // Add comment, save post
        post.comments.push({ content });
        await post.save();

        return res.json(post.comments[post.comments.length - 1]);
    } catch (err) {
        return next(err);
    }
};

// Modify comment
const modifyComment = async function (req, res, next) {
    const postID = req.params.postID;
    const commentID = req.params.commentID;
    const newContent = req.body.content;

    try {
        // Get post
        const post = await Post.findById(postID);
        if (!post) {
            const err = Error('Cannot find post');
            err.status = 404;
            throw err;
        }

        // Get comment
        const comment = post.comments.id(commentID);
        if (!comment) {
            const err = Error('Cannot find comment');
            err.status = 404;
            throw err;
        }

        // Save parent
        comment.content = newContent;
        await post.save();
        return res.json(comment.toJSON());
    } catch (err) {
        return next(err);
    }
};

// Delete comment
const deleteComment = async function (req, res, next) {
    const postID = req.params.postID;
    const commentID = req.params.commentID;

    try {
        // Get post
        const post = await Post.findById(postID);
        if (!post) {
            const err = Error('Cannot find post');
            err.status = 404;
            throw err;
        }

        // Get comment
        const comment = post.comments.id(commentID);
        if (!comment) {
            const err = Error('Cannot find comment');
            err.status = 404;
            throw err;
        }
        comment.remove();

        // Save parent
        await post.save();
        return res.json({ status: 'success' });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getPosts,
    getPost,
    newPost,
    modifyPost,
    deletePost,
    addComment,
    modifyComment,
    deleteComment,
};

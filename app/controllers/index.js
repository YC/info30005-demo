const Post = require('../models/post');

// Home page
const getHome = async function (req, res, next) {
    const posts = await Post.find({}).lean();
    return res.render('index', { posts, title: 'Posts' });
};

// Renders page for post
const getPost = async function (req, res, next) {
    const postID = req.params.postID;
    try {
        const post = await Post.findById(postID).lean();
        if (!post) {
            const err = Error('Cannot find post');
            err.status = 404;
            throw err;
        }
        return res.render('post', { post, title: `Post - ${post.title}` });
    } catch (err) {
        return next(err);
    }
};

// Delete post
const deletePost = async function (req, res, next) {
    const postID = req.params.postID;
    try {
        const post = await Post.findByIdAndDelete(postID);
        if (!post) {
            const err = Error('Cannot find post');
            err.status = 400;
            throw err;
        }
        return res.redirect('/');
    } catch (err) {
        return next(err);
    }
};

// New post
const newPostPage = async function (req, res, next) {
    return res.render('post_new', { title: 'New Post' });
};

// Create new post
const newPost = async function (req, res, next) {
    const content = req.body.content;
    const title = req.body.title;

    try {
        const post = await Post.create({ content, title });
        return res.redirect(`/posts/${post._id}`);
    } catch (err) {
        return next(err);
    }
};

// Modify post
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
        return res.redirect('back');
    } catch (err) {
        return next(err);
    }
};

module.exports.getHome = getHome;
module.exports.getPost = getPost;
module.exports.deletePost = deletePost;
module.exports.newPostPage = newPostPage;
module.exports.newPost = newPost;
module.exports.modifyPost = modifyPost;

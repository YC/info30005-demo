const express = require('express');
const router = express.Router();

// Import API controllers
const controller = require('../controllers/api');

// Ensures that param is valid
const paramVerifier = require('../middleware/param');

// Get all posts
router.get('/posts', controller.getPosts);

// New post
router.post('/posts', controller.newPost);

// Get specific post
router.get('/posts/:postID', paramVerifier('postID'), controller.getPost);

// Modify post
router.patch('/posts/:postID', paramVerifier('postID'), controller.modifyPost);

// Delete post
router.delete('/posts/:postID', paramVerifier('postID'), controller.deletePost);

// Add comment
router.post('/posts/:postID/comments', controller.addComment);

// Modify comment
router.patch(
    '/posts/:postID/comments/:commentID',
    paramVerifier('postID'),
    paramVerifier('commentID'),
    controller.modifyComment
);

// Delete comment
router.delete(
    '/posts/:postID/comments/:commentID',
    paramVerifier('postID'),
    paramVerifier('commentID'),
    controller.deleteComment
);

module.exports = router;

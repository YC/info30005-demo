const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const paramVerifier = require('../middleware/param');

// Get home page
router.get('/', indexController.getHome);

// Get new post page
router.get('/posts/new', indexController.newPostPage);

// Get post page
router.get('/posts/:postID', paramVerifier('postID'), indexController.getPost);

// Create new post
router.post('/posts/new', indexController.newPost);

// Delete post
router.post(
    '/posts/:postID/delete',
    paramVerifier('postID'),
    indexController.deletePost
);

// Modify post
router.post(
    '/posts/:postID',
    paramVerifier('postID'),
    indexController.modifyPost
);

module.exports = router;

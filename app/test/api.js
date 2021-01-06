const { request, expect } = require('chai');
const mongoose = require('mongoose');
const app = require('./index');

// Integration tests for API
describe('API Integration Tests', function() {
    const agent = request.agent(app);

    // Clear collections before starting
    before(async function() {
        await mongoose.connection.db.dropDatabase();
    });

    // Clear collection before each test
    beforeEach(async function() {
        try {
            await mongoose.connection.collections['posts'].deleteMany({});
        } catch (err) {}
    });

    it('Create post', async function() {
        const res = await agent
            .post(`/api/posts`)
            .send({ title: 'hello', content: 'world' });
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.title).to.equal('hello');
        expect(res.body.content).to.equal('world');
    });

    it('Get multiple posts', async function() {
        // Create posts
        await agent
            .post(`/api/posts`)
            .send({ title: 'hello', content: 'world' });
        await agent
            .post(`/api/posts`)
            .send({ title: 'hello2', content: 'world' });
        const res = await agent.get(`/api/posts`);
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('posts');
        expect(res.body.posts).to.have.lengthOf(2);
    });

    it('Get post', async function() {
        // Create post
        const created = await agent
            .post(`/api/posts`)
            .send({ title: 'hello', content: 'world' });

        const res = await agent.get(`/api/posts/${created.body._id}`);
        expect(res).to.be.json;
        expect(res).to.have.status(200);
        expect(res.body._id).to.equal(created.body._id);
        expect(res.body.title).to.equal('hello');
        expect(res.body.content).to.equal('world');
    });

    it('Modify post', async function() {
        // Create post
        const created = await agent
            .post(`/api/posts`)
            .send({ title: 'hello', content: 'world' });
        const postID = created.body._id;

        // Perform update
        const updateRes = await agent
            .patch(`/api/posts/${postID}`)
            .send({ content: 'ABCD' });
        expect(updateRes.body.content).to.equal('ABCD');

        const res = await agent.get(`/api/posts/${postID}`);
        expect(res.body.content).to.equal('ABCD');
    });

    it('Delete post', async function() {
        // Create post
        const created = await agent
            .post(`/api/posts`)
            .send({ title: 'hello', content: 'world' });
        const postID = created.body._id;

        // Delete post
        const deleteRes = await agent.delete(`/api/posts/${postID}`);
        expect(deleteRes.body.status).to.equal('success');

        // Now, look at number of posts
        const res = await agent.get(`/api/posts`);
        expect(res.body.posts).to.have.lengthOf(0);
    });

    it('Add comment', async function() {
        // Create post
        const created = await agent
            .post(`/api/posts`)
            .send({ title: 'hello', content: 'world' });
        const postID = created.body._id;

        // Add comment
        const comment = await agent
            .post(`/api/posts/${postID}/comments`)
            .send({ content: 'hi' });
        expect(comment.body).to.have.property('content');
        expect(comment.body.content).to.equal('hi');

        // Verify that comment is added
        const post = await agent.get(`/api/posts/${postID}`);
        expect(post.body).to.have.property('comments');
        expect(post.body.comments).to.have.lengthOf(1);
    });

    it('Modify comment', async function() {
        // Create post
        const created = await agent
            .post(`/api/posts`)
            .send({ title: 'hello', content: 'world' });
        const postID = created.body._id;

        // Add comment
        const comment = await agent
            .post(`/api/posts/${postID}/comments`)
            .send({ content: 'hi' });
        const commentID = comment.body._id;

        // Modify comment
        await agent
            .patch(`/api/posts/${postID}/comments/${commentID}`)
            .send({ content: 'hi2' });

        // Verify that comment is added
        const post = await agent.get(`/api/posts/${postID}`);
        expect(post.body).to.have.property('comments');
        expect(post.body.comments).to.have.lengthOf(1);
        expect(post.body.comments[0].content).to.equal('hi2');
    });

    it('Delete comment', async function() {
        // Create post
        const created = await agent
            .post(`/api/posts`)
            .send({ title: 'hello', content: 'world' });
        const postID = created.body._id;

        // Add comment
        const comment = await agent
            .post(`/api/posts/${postID}/comments`)
            .send({ content: 'hi' });
        const commentID = comment.body._id;

        // Delete comment
        await agent.delete(`/api/posts/${postID}/comments/${commentID}`);

        // Verify that comment is deleted
        const post = await agent.get(`/api/posts/${postID}`);
        expect(post.body).to.have.property('comments');
        expect(post.body.comments).to.have.lengthOf(0);
    });
});

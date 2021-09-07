const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

describe('Example usage of mongoose', function () {
    // Define schemas
    const commentSchema = new Schema({ content: String });
    const postSchema = new Schema({
        title: { type: String, required: true },
        content: String,
        views: { type: Number, required: true, default: 0 },
        comments: [commentSchema],
    });

    // Define models
    var Post = mongoose.model('Post', postSchema);

    before(async function () {
        // Connect to db
        await mongoose.connect('mongodb://localhost:27017/example');

        // Drop previous database (use with caution)
        await mongoose.connection.db.dropDatabase();
    });

    const POST = { title: 'Hello', content: 'World' };
    it('Create document', async function () {
        const created = await Post.create(POST);
        expect(created).has.property('id');
        expect(created).has.property('title');
        expect(created).has.property('content');
        expect(created).has.property('views');
        expect(created.title).to.equal(POST.title);
        expect(created.content).to.equal(POST.content);
        expect(created.views).to.equal(0);
    });

    it('Read (Find) document', async function () {
        // Create post
        const POST1 = { title: '?' };
        const created = await Post.create(POST1);

        // Get post
        const post = await Post.findById(created._id);
        expect(post.title).to.equal(POST1.title);
        expect(post.content).to.equal(POST1.content);

        // Get all posts
        const posts = await Post.find({ title: '?' });
        expect(posts).to.have.lengthOf(1);
        // Compare id
        // https://stackoverflow.com/questions/15724272
        expect(posts[0].id).to.equal(created.id);
    });

    it('Update document', async function () {
        // Create post
        const POST2 = { title: 'foo', content: '' };
        const created = await Post.create(POST2);

        const NEW_CONTENT = 'New Content';
        var i = 0;

        // Update 1
        await Post.findByIdAndUpdate(created._id, {
            content: `${NEW_CONTENT} ${++i}`,
        });
        // Update 2
        await Post.findOneAndUpdate(
            { title: POST2.title },
            { content: `${NEW_CONTENT} ${++i}` }
        );
        // Update 3
        const post = await Post.findOne({ title: POST2.title });
        post.content = `${NEW_CONTENT} ${++i}`;
        await post.save();

        // Now, verify the content of the post
        const newPost = await Post.findOne({ title: POST2.title });
        expect(newPost.content).to.equal(`${NEW_CONTENT} 3`);
    });

    it('Delete document', async function () {
        // Create post
        const POST3 = { title: 'cool' };
        await Post.create(POST3);

        // Delete post with title of 'cool
        await Post.findOneAndRemove({ title: 'cool' });

        // Now, there should be no posts with title of 'foo' left
        const posts = await Post.find({ title: 'cool' });
        expect(posts).to.have.lengthOf(0);
    });

    it('Subdocument', async function () {
        // Add post, add comment
        const post = await Post.create(POST);
        post.comments.push({ content: 'Hi' });
        await post.save();

        // Read comment
        const created = await Post.findById(post._id);
        expect(created.comments).to.have.lengthOf(1);
        expect(created.comments[0].content).to.equal('Hi');

        // Delete comment
        await created.comments.id(created.comments[0]._id).remove();
    });

    after(function () {
        mongoose.disconnect();
    });
});

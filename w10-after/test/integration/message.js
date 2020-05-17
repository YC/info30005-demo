const supertest = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');
const Message = require('../../message');

describe('controllers integration', () => {
    beforeEach(async () => {
        await Message.deleteMany({});
    });

    it('add message', async () => {
        const res = await supertest(app).post('/api').send({ message: 'hi' });
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property("_id");
        expect(res.body.message).to.equal('hi');
    });

    it('add message view', async () => {
        const res = await supertest(app).post('/view').send('message=hi');
        expect(res.redirect).to.equal(true);
        expect(res.header['location']).to.equal('/view');

        const messages = await Message.find({});
        expect(messages).to.have.lengthOf(1);
        expect(messages[0]).to.have.property("_id");
        expect(messages[0].message).to.equal('hi');
    });
});

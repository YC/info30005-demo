const sinon = require('sinon');
const expect = require('chai').expect;

const Message = require('../../message');
const controllers = require('../../controllers');

describe('controllers test', () => {
    const sandbox = sinon.createSandbox();

    after(async() => {
        sandbox.restore();
    });

    it('add message', async () => {
        const fake = sinon.fake();
        const req = {
            body: { message: 'hi' }
        };
        const res = {
            json: fake
        }

        // replace create function
        sandbox.replace(Message, 'create', (obj) => {
            return Promise.resolve({ ...obj, _id: 'some_id'});
        });

        await controllers.addMessage(req, res);
        const result = fake.lastCall.lastArg;
        expect(result).to.have.property('message');
        expect(result).to.have.property('_id');
        expect(result.message).to.equal('hi');
    });
});

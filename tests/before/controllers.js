const Message = require('./message');

// api (to be consumed by frontend app)
const getMessages = async (req, res) => {
    const messages = await Message.find({});
    return res.send(messages);
};

const getMessageView = async (req, res) => {
    const messages = await Message.find({});
    return res.render('main', { messages });
};

// view engine
const addMessage = async (req, res) => {
    const message = await Message.create({ message: req.body.message });
    return res.send(message);
};

const addMessageView = async (req, res) => {
    const message = await Message.create({ message: req.body.message });
    return res.redirect('/view');
};

module.exports = {
    addMessage,
    getMessages,
    getMessageView,
    addMessageView
};

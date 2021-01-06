const mongoose = require('mongoose');
// model
const schema = mongoose.Schema({
    message: String,
});
module.exports = mongoose.model('Message', schema);

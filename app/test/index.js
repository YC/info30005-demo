const mongoose = require('mongoose');
require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
chai.use(chaiAsPromised);
chai.use(chaiHttp);

// Init app
const app = require('../bin/www');
module.exports = app;

// Wait for database connection to open
before(function (done) {
    mongoose.connection.once('open', function () {
        done();
    });
});

// Run tests
require('./api.js');

// Close database connection and server
after(function (done) {
    mongoose.disconnect();
    done();
});

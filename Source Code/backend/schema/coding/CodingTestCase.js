const mongoose = require('mongoose');

const codingTestcase = mongoose.Schema(
    {
        input: String,
        output: String
    }
);

const CodingTestcase = mongoose.model('CodingTestcase', codingTestcase);


module.exports = CodingTestcase;
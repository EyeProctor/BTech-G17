const mongoose = require('mongoose');

const codingProblem = mongoose.Schema(
    {
        title: String,
        statement: String,
        courseID: String,
        testcases: [{
            input: String,
            output: String
        }],
        languages: {
            c: {type: Boolean, default: true},
            cpp: {type: Boolean, default: true},
            java: {type: Boolean, default: true},
            python: {type: Boolean, default: true},
        }
    }
)

const codingProblem = mongoose.model('CodingProblem', codingProblem);

module.exports = CodingProblem;
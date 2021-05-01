const mongoose = require('mongoose');

const codingSession = mongoose.Schema(
    {
        codeID: String, //coding assignment ID
        userID: String,
        solution: [String],
        courseID: String,
        correctTestcases: Number,
        totalTestcases: Number,
        language: String,
        startedAt: Number,
        warnings: Number
    }
)

const CodingSession = mongoose.model('CodingSession', codingSession);

module.exports = CodingSession;
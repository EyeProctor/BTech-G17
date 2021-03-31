const mongoose = require('mongoose');

const userChoices = mongoose.Schema(
    {
        userID: String,
        quizID: String,
        userChoices: {},
        attempted: [Number],
        flagged: [Number],
        status: String,
        warnings: {type: Number, default: 0},
        startedAt: Number,
        questions: Array
        
    }
);

const UserChoices = mongoose.model('UserChoices', userChoices);


module.exports = UserChoices;


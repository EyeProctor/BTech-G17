const mongoose = require('mongoose');

const userChoices = mongoose.Schema(
    {
        userName: String,
        email: String,
        choices: {} ,
        attempted: [Number],
        flagged: [Number],
        status: String,
        warnings: Number,
        startTime: Date,
        estimatedTime: Date,
        
    }
);

const UserChoices = mongoose.model('UserChoices', userChoices);


module.exports = UserChoices;


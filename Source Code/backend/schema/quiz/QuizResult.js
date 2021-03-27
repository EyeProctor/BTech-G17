const mongoose = require('mongoose');

const quizResult = mongoose.Schema(
    {
        qID: String,
        correct: Number,
        incorrect: Number,
        userID: String,
        firstName: String,
        lastName: String,
        middleName: String,
        finishedAt:{type: Date, default: Date.now()},
        
    }
);

const QuizResult = mongoose.model('QuizResult', quizResult);


module.exports = QuizResult;


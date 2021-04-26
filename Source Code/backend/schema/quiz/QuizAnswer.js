const mongoose = require('mongoose');

const quizAnswer = mongoose.Schema(
    {
        qs: String,
        ans: Boolean,
        
    }
);

const QuizAnswer = mongoose.model('QuizAnswer', quizAnswer);


module.exports = QuizAnswer;


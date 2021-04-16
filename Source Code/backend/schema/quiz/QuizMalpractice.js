const mongoose = require('mongoose');

const quizMalpractice = mongoose.Schema(
    {
        qID: String,
        userID: String,
        timestamp:{type: Date, default: Date.now()},
        image: Buffer
        
    }
);

const QuizMalpractice = mongoose.model('QuizMalpractice', quizMalpractice);


module.exports = QuizMalpractice;


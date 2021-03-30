const mongoose = require('mongoose');

const quizQuestion = mongoose.Schema(
    {
        qNo: Number,
        qType: {type: Number, default: 1},
        question: String,
        options: Array,
        
    }
);

const QuizQuestion = mongoose.model('QuizQuestion', quizQuestion);


module.exports = QuizQuestion;


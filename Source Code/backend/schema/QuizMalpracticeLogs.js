const mongoose = require('mongoose');

const QuizMalpracticeLogs = mongoose.Schema(
    {
        ID: String,
        quizID: String,
        warnings: Number,
        //array of images with their timestamps
        logs: [{
            img: Object,
            timestamp: string
        }],
    }
);

const QuizMalpracticeLogs = mongoose.model('QuizMalpracticeLogs', QuizMalpracticeLogs);


module.exports = UserChoices;


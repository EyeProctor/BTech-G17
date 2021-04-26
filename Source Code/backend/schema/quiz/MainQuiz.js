const mongoose = require('mongoose');

const mainQuiz = mongoose.Schema(
    {
        subject: String,
        proctored: {type: Boolean, default: false},
        startDate: Date,
        endDate: Date,
        duration: Number,
        questions: Array,
        threshold: Number
    }
);

const MainQuiz = mongoose.model('MainQuiz', mainQuiz);

module.exports = MainQuiz;


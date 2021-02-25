const mongoose = require('mongoose');

const mainQuiz = mongoose.Schema(
    {
        subject: String,
        proctored: {type: Boolean, default: false},
        startDate: Date,
        endData: Date,
        duration: Number,
        questions: Array,
    }
);

const MainQuiz = mongoose.model('MainQuiz', mainQuiz);

module.exports = MainQuiz;


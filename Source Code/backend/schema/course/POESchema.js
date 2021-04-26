const mongoose = require('mongoose');

const POESchema = mongoose.Schema(
    {
        title: String,
        teacherID: String,
        courseID: String,
        problemStatement: String,
        language: String,
        duration: Number,
        startTime: Date,
        endTime: Date,
        input: String
    }
);

const POE = mongoose.model('POE', POESchema);


module.exports = POE;


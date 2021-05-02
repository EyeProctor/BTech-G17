const mongoose = require('mongoose');

const codingAssignment = mongoose.Schema(
    {
        title: String,
        threshold: {type: Number, default: 10},
        problems: [], //{problemID: String}
        duration: Number,
        startDate: Date,
        endDate: Date,
        courseID: String,
    }
)

const CodingAssignment = mongoose.model('CodingAssignment', codingAssignment);

module.exports = CodingAssignment;
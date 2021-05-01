const mongoose = require('mongoose');

const codingAssignment = mongoose.Schema(
    {
        title: String,
        threshold: {type: Number, default: 10},
        problems: [], //{problemID: String}
        duration: Number,
        startDate: Date,
        endDate: Date
    }
)

const CodingAssignment = mongoose.model('CodingAssignment', codingAssignment);

module.exports = CodingAssignment;
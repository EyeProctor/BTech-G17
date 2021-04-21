const mongoose = require('mongoose');

const codingAssignment = mongoose.Schema(
    {
        title: String,
        proctored: {type: Boolean, default: false},
        problems: [], //{problemID: String}
        duration: Number,
        startDate: Date,
        endDate: Date
    }
)

const CodingAssignment = mongoose.model('CodingAssignment', codingAssignment);

module.exports = CodingAssignment;
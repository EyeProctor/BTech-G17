const mongoose = require('mongoose');

const codingAssignment = mongoose.Schema(
    {
        title: String,
        teacherID: String,
        courseID: String,
        proctored: {type: Boolean, default: false},
        problems: [], //{problemID: String}
        duration: Number,
        startTime: Date,
        endTime: Date
    }
)

const CodingAssignment = mongoose.model('CodingAssignment', codingAssignment);

module.exports = CodingAssignment;
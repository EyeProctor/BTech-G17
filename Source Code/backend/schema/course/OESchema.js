const mongoose = require('mongoose');

const OESchema = mongoose.Schema(
    {
        title: String,
        teacherID: String,
        courseID: String,
        duration: Number,
        startTime: Date,
        endTime: Date
    }
);

const OE = mongoose.model('OE', OESchema);


module.exports = OE;


const mongoose = require('mongoose');

const codeSchema = mongoose.Schema(
    {
        problemStatement: String,
        inputs: String,
        outputs: String,
        startDate: Date,
        endDate: Date,
        duration: Number,
        course: String,
        subject: String,
    }
);

const Code = mongoose.model('Code', codeSchema);
module.exports = Code;


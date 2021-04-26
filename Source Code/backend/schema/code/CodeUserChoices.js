const mongoose = require('mongoose');

const codeUserSchema = mongoose.Schema(
    {
        codeQuestionID: String,
        lang: String,
        code: String,
        startedAt: Number,
    }
);

const CodeUserChoices = mongoose.model('CodeUserChoices', codeUserSchema);
module.exports = CodeUserChoices;


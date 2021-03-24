const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
    {
        courseName: String,
        class: String,
        branch: String,
        quizes: [String],
        poes: [String],
        oes: [String],
    }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;


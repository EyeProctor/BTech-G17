const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
    {
        courseName: String,
        Class: String,
        branch: String,
        sem: String,
        quizes: Array,
        poes: Array,
        oes: Array,
    }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;


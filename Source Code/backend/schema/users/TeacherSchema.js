const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        middleName: String,
        branch: String,
        courses: [String],
    }
);

const Teacher = mongoose.model('Teacher', teacherSchema);


module.exports = Teacher;


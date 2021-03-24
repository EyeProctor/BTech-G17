const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        middleName: String,
        branch: String,
        class: String,
    }
);

const Student = mongoose.model('Student', studentSchema);


module.exports = Student;


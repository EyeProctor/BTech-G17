const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userName: String,
        email: String,
        password: String,
        userType: {type: String, default: "Student"},
        studentData: String,
        teacherData: String,
    }
);

const User = mongoose.model('User', userSchema);


module.exports = User;


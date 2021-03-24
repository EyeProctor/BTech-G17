const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userName: String,
        email: String,
        password: String,
        userType: {type: String, default: "Student"}
    }
);

const User = mongoose.model('User', userSchema);


module.exports = User;


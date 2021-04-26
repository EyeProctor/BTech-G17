const mongoose = require('mongoose');

const codingSolution = mongoose.Schema(
    {
        assignmentID: String, //coding assignment ID
        solution: [{
            problemID: String
        }],
        courseID: String,
        correctTestcases: Number,
        totalTestcases: Number,
        language: String //c, cpp, java, python
    }
)

const CodingSolution = mongoose.model('CodingSolution', codingSolution);

module.exports = CodingSolution;
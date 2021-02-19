const express = require('express');

const router = express.Router();



router.get('/',(req,res)=>{
    res.send("Quiz Routes Root");
})

// METHOD: GET
// desc : Get Particular Quiz from Quiz ID
router.get('/:id', (req,res) => {
    res.send(`Fetching ${req.params.id} Quiz`);

})


// METHOD: POST
// desc: Add Quiz
router.post('/addQuiz',(req,res) => {
    // Get Quiz Data from req.body and Using MongoDB Schema Save it into Database
    // Data will come from Front end form

})



module.exports = router;


// TODOs: SUBMIT QUIZ


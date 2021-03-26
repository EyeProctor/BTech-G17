const express = require('express');
const MainQuiz = require('../../schema/quiz/MainQuiz');
const QuizAnswer = require('../../schema/quiz/QuizAnswer');
const QuizQuestion = require('../../schema/quiz/QuizQuestions');
const Course = require('../../schema/course/CourseSchema')

const router = express.Router();



router.get('/',(req,res)=>{
    res.send("Quiz Routes Root");
})

// METHOD: GET
// desc : Get Particular Quiz from Quiz ID
router.get('/getQuiz/:id', (req,res) => {
    const id = req.params.id;
    console.log(id);
    MainQuiz.findById(id).then(quizData => 
        {
            console.log(quizData); 
            return res.status(200).json(quizData)
        }).catch(err => {
            console.log(err)
            return res.status(500).json({err})
        });
})


// METHOD: POST
// desc: Add Quiz
router.post('/addQuiz',(req,res) => {
    const {courseID,subject, proctored, startDate, endDate, duration, questions} = req.body;

    console.log(courseID);
    var questionsArray = []
    questions.forEach(que => {
        var optionsArray = []
        que.options.forEach(opt=> {
            optionsArray.push(new QuizAnswer({qs: opt.qs, ans: opt.ans}));
        })
        questionsArray.push(new QuizQuestion({
            qNo: que.qNo,
            qType: que.qType,
            question: que.question,
            options: optionsArray
        }));
    });

    const newQuiz = MainQuiz({
        subject,proctored, startDate, endDate, duration, questions: questionsArray
    });

    console.log("Question",questions)
    console.log("Subject", subject)
    console.log("Start", startDate)
    console.log("End", endDate)
    console.log("Duration", duration)
    
    newQuiz.save().then(data => {
        console.log(data);
        const toadd = {quizID: data._id, subject}
        Course.findByIdAndUpdate({_id: courseID}, 
            { $addToSet: { quizes : toadd } },
            function (err, updatedDoc) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({msg : "Server Error"});
                }
            console.log(updatedDoc);
            return res.status(200).json(updatedDoc)
        })
    }).catch((err)=> {
        return res.status(500).json({msg: err.message});
    })

    
})



module.exports = router;


// TODOs: SUBMIT QUIZ


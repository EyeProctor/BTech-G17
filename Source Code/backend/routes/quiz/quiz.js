const express = require('express');
const MainQuiz = require('../../schema/quiz/MainQuiz');
const QuizMalpractice = require('../../schema/quiz/QuizMalpractice');
const QuizAnswer = require('../../schema/quiz/QuizAnswer');
const QuizQuestion = require('../../schema/quiz/QuizQuestions');
const QuizResult = require('../../schema/quiz/QuizResult');
const Course = require('../../schema/course/CourseSchema')

const UserChoices = require('../../schema/UserChoices')

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
            return res.status(200).json(quizData)
        }).catch(err => {
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
        subject, proctored, startDate, endDate, duration, questions: questionsArray
    });

    // console.log("Question",questions)
    // console.log("Subject", subject)
    // console.log("Start", startDate)
    // console.log("End", endDate)
    // console.log("Duration", duration)
    
    newQuiz.save().then(data => {
        console.log(data);
        const toadd = {quizID: data._id, subject}
        Course.findByIdAndUpdate(courseID, 
            { $addToSet: { "quizes" : toadd } },
            function (err, updatedDoc) {
                if (err) {
                    //console.log(err);
                    return res.status(500).json({msg : "Server Error"});
                }
            console.log(updatedDoc);
            return res.status(200).json(updatedDoc)
        })
    }).catch((err)=> {
        return res.status(500).json({msg: err.message});
    })

    
})


router.post('/saveUserChoices',(req,res)=>{
    const {userID, attempted,flagged,userChoices,startedAt , quizID, questions} = req.body;
    console.log(userID);
    console.log(attempted);
    console.log(quizID);
    const status = "Valid";
    console.log(attempted);
    console.log(flagged);
    UserChoices.findOne({userID,quizID}).then(prevDoc =>
        {
            if(prevDoc){
                prevDoc.updateOne({userID,quizID,userChoices,attempted,flagged,status,warnings: 0, startedAt, questions}).then(
                    savedDoc => {
                        return res.status(200).json(savedDoc);
                    }
                ).catch(err => {
                    console.log(err);
                    console.log("update Error")
                    return res.status(500).json({msg: "Internal Error"})
                })
            }
            else{

                newUserChoices = new UserChoices({
                    userID, quizID, userChoices, attempted, flagged, status, warnings: 0, startedAt, questions
                });
            
                newUserChoices.save().then(savedDoc =>{
                    return res.status(200).json(savedDoc);
                }).catch(err => {
                    console.log(err);
                    return res.status(500).json({msg: "Internal Error"})
                })

            }
        }
        ).catch(err => {
            console.log(err);
            return res.status(500).json({msg: "Server error"})
        })
    



})

router.get('/userChoices/:userID/:quizID', (req,res)=> {

    const userID = req.params.userID;
    const quizID = req.params.quizID;

    UserChoices.findOne({userID,quizID}).then(doc =>{
        console.log(doc)
        if(doc)
            return res.status(200).json(doc);
        else
            return res.status(404).json({msg: "No User Record Found"})
    }).catch(err => {
        console.log(err);
        return res.status(500).json({msg: "Internal Error"})
    })
})

router.post("/submitQuiz", (req,res)=>{
    const {userID,studentID, qID ,userChoices,questions, firstName, lastName, middleName, quizName, startedAt} = req.body;

    var correct = 0, incorrect = 0;
    const qArray = questions;
    const attemptedQ = Object.keys(userChoices)
    const finishedAt = Date.now();
    console.log(attemptedQ);
    console.log(userChoices)
    console.log(qArray[0].options);
    for (let i = 0; i < attemptedQ.length; i++) {
        const optionsArray = qArray[parseInt(attemptedQ[i])-1].options;
        const correctAnswer = optionsArray.filter((e)=> e.ans)[0].qs;
        console.log(correctAnswer);
        if(userChoices[attemptedQ[i]] === correctAnswer)
            correct += 1
        else
            incorrect += 1
    }
    // Take Result Schema
    const quizResult = new QuizResult({
        qID, correct, incorrect, userID, firstName, lastName, middleName, startedAt, quizName ,finishedAt
    })
    // Store The Result

    quizResult.save().then(
        data => {
            return res.status(200).json(data);
        }
    ).catch(err=> {
        return res.status(500).json(err)
    })
})

router.post('/quizStatusCheck', (req,res)=>{
    const {qID, userID} = req.body;
    QuizResult.findOne({qID,userID}).then(
        data => {
            if(data)
                return res.status(200).json({status: true})
            else
                return res.status(200).json({status: false})
        }
    ).catch(err => 
        res.status(500).json({msg: err}))
})

router.get('/getAll/:quizID', (req,res)=>{
    const quizID = req.params.quizID;
    QuizResult.find({qID: quizID}).then(
        results =>{
            if(results){
                console.log(results);
                var newRes = []
                results.forEach(r => {
                    newRes.push({...r._doc, logs: `localhost:3000/teacher/quiz/malpractices/${quizID}/${r.userID}`})
                });
                console.log(newRes);
                return res.status(200).json(newRes);

            }
            else
                return res.status(200).json(results);
        }
    ).catch(err =>{
        console.log(err);
        return res.status(400).json({msg: "Bad Request"})
    })
});


// TODO
router.post('/deleteQuiz',(req,res)=>{
    const { quizID, courseID } = req.body;

    if(!quizID || !courseID)
        return res.status(400).json({msg: "Bad Request"});

    MainQuiz.deleteOne({_id: quizID}).then(
        data =>{
            console.log(data);
            Course.updateOne({_id: courseID}, {$pullAll: { quizes: [courseID] }}).then(courseDoc => {
                console.log(courseDoc);
                res.status(200).json(courseDoc)
            }).catch(err => {
                console.log(err);
                res.status(500).json({msg: "Server Error"})
            })
        }
    ).catch(err =>{
        console.log(err);
        res.status(500).json({msg: "Server Error"})

    })
})


// Save Malpractices

router.post('/malpracticeLog', (req,res)=>{
    const { quizID, userID, image } = req.body;

    if(!quizID || !userID || !image )
        return res.status(400).json({msg: "Bad Request"});
    
    quizMalpractice = new QuizMalpractice({
        qID: quizID, userID, image
    })

    quizMalpractice.save().then( data => {
        res.status(200).json(data);
    }).catch(err => {
        console.error(err);
        res.status(500).json({msg: "Server Error"})
    })
    
})

// Get All Malpractice of particular user

router.get('/malpracticeLog/:userID/:quizID', (req,res) => {
    const userID = req.params.userID;
    const quizID = req.params.quizID;

    if(!userID || !quizID)
        return res.status(400).json({msg: "Bad Request"})
    
    QuizMalpractice.find({userID, qID: quizID}).then(
        logList =>{
            console.log(logList);
            res.status(200).json(logList);
        }
    ).catch(err => {
        console.error(err);
        res.status(500).json({msg: "Server Error"})
    })
})


module.exports = router;



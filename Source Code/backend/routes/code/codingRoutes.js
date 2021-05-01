const express = require('express');
const fetch = require('node-fetch')
const CodingAssignment = require('../../schema/coding/CodingAssignment');
const CodingProblem = require('../../schema/coding/CodingProblem');
const CodingTestcase = require('../../schema/coding/CodingTestcase');
const Course = require('../../schema/course/CourseSchema');
const CodingSolution = require('../../schema/coding/CodingSolution');
const CodingSession = require('../../schema/coding/CodingSession');

const router = express.Router();



router.get('/',(req,res)=>{
    res.send("Coding Routes Root");
})

// METHOD: GET
// desc : Get Particular Quiz from Quiz ID
router.get('/:id', (req,res) => {
    res.send(`Fetching ${req.params.id} Coding Question`);

})


// METHOD: POST
// desc: Test Code
router.post('/compile',(req,res) => {
    const compiler_API = "https://ide.geeksforgeeks.org/main.php";
    
    const {lang, code, input, save} = req.body;
    const data ={
        lang,code,input,save
      }
    var reqData = new URLSearchParams();
    
    for (var property in data) {
        var val = data[property]
        if(val !== null)
        reqData.append(property, data[property])
        else{
            reqData.append(property, "padding")
        }
    }
    console.log(reqData);
// reqData = reqData.join("&");
    fetch(compiler_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: reqData
    }).then((response)=> response.json().then(resData => {
        console.log(resData);
        return res.status(200).json(resData);
    })).catch(err => {
        console.log(err.message)
        return res.status(400).json(err.message);
        
    })

})


router.post('/fetchResult',(req,res) => {

    const {sid} = req.body;
    const result_API = "https://ide.geeksforgeeks.org/submissionResult.php";
    fetch(result_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: `sid=${sid}&requestType=fetchResults`
    }).then(
        result => 
            result.json().then(output => {
            console.log(output);
            return res.status(200).json(output);
        }).catch(err => res.status(500).json({msg: err.message}))
    ).catch(
        err => {
            console.log("err", err.message);
            return res.status(400).json({msg: "Error while fetching results"});
        }
    )

})


// METHOD: POST
// desc: Add CodingAssignment
router.post('/addCodingAssignment',(req,res) => {
    const {courseID, title, threshold, startDate, endDate, duration, problems} = req.body;
    
    if(!courseID || !title || !threshold || !startDate || !endDate || !duration || !problems)
        return res.status(400).json({msg: "Bad Request"});

    console.log("courseID= " + courseID);
    var problemsArray = []
    problems.forEach(prob => {
        var testArray = []
        prob.testcases.forEach( test => {
            testArray.push(new CodingTestcase({
                input: test.input,
                output: test.output
            }));
        })
        problemsArray.push(new CodingProblem({
            title: prob.title,
            statement: prob.statement,
            testcases: testArray,
            languages: prob.languages
        }));
    });

    const newCodingAssignment = CodingAssignment({
        title, threshold, startDate, endDate, duration, problems: problemsArray, courseID
    });
    
    newCodingAssignment.save().then(data => {
        console.log(data);
        const toadd = { poeID: data._id, title }
        Course.findByIdAndUpdate(courseID, 
            { $addToSet: { "poes" : toadd } },
            function (err, updatedDoc) {
                if (err) {
                    //console.log(err);
                    return res.status(500).json({msg : "Server Error"});
                }
            console.log("updated Doc= " +updatedDoc);
            return res.status(200).json(updatedDoc)
        })
    }).catch((err)=> {
        return res.status(500).json({msg: err.message});
    })

    
})

router.get('/getCodingAssignment/:codeID',(req,res)=>{

    const codeID = req.params.codeID;

    CodingAssignment.findOne({_id: codeID}).then(assignment =>{
        res.status(200).json(assignment);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({msg: "Server Error"});
    })
})

// Saving User Typed Code on backend incase of any interruption
router.post('/saveUserCode',(req,res)=>{
    const { codeID, solution, correctTestcases, totalTestcases, language,
    startedAt,warnings,userID} = req.body;
    CodingSession.findOne({userID,codeID}).then(
        session => {
            if(session){

                session.updateOne({
                    codeID,userID,solution,correctTestcases,totalTestcases, language,startedAt,warnings
                }).then(savedDoc =>{
                    console.log("Updating")
                    return res.status(200).json(savedDoc);
                }).catch(err => {
                    console.log(err);
                   return  res.status(500).json({msg: "Internal Server Error While Updating"});
                })
            }else{
                const newSession = CodingSession({
                    codeID,userID,solution,correctTestcases,totalTestcases, language,startedAt,warnings
                })

                newSession.save().then(newSess => {
                    return res.status(200).json(newSess);
                }).catch(err => {
                    console.log(err);
                   return  res.status(500).json({msg: "Internal Server Error"});
                })
            }
        }
    ).catch();
    
})


// Retriving User Typed Code to Continue the interrupted Session
router.get('/getUserCode/:codeID/:userID',(req,res)=>{
    const codeID = req.params.codeID;
    const userID = req.params.userID;
    CodingSession.findOne({codeID,userID}).then(
        data =>{
            if(data)
                return res.status(200).json(data);
            else{
                return res.status(200).json({msg: "New Session"});
            }
        }
    ).catch(
        err => {
            res.status(500).json({msg: "Server Error"});
        }
    )
})

// Submiting the Assignment
router.post('/submitCodeSolution',(req,res)=>{
    const { codeID, solution, correctTestcases, totalTestcases, language,
        startedAt,warnings,userID} = req.body;

        res.status(200).json({msg: "ToDO"});
    
})

router.get('/submitStatus/:codeID/:userID', (req,res)=> {
    console.log("Checking Submission Status");
    const codeID = req.params.codeID;
    const userID = req.params.userID;
    CodingSolution.findOne({codeID,userID}).then(data => {
        if(data){
            return res.status(200).json({found: true});
        }
        else
            return res.status(200).json({found: false})
    }).catch(err => {
        console.log(err);
        return res.status(500).json({msg: "Error"});
    })
})

router.get('/getAll/:codeID',(req,res)=> {
    const codeID = req.params.codeID;

    CodingSolution.find({codeID}).then(resData => {
        if(resData){
            return res.status(200).json(resData);
        }
        else
            return res.status(200).json([]);
    }).catch(err=> {
        console.log(err);
        return res.status(500).json({msg: "Server Error"});
    })
})

module.exports = router;


// TODOs: SUBMIT QUIZ


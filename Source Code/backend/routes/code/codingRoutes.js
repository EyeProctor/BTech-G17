const express = require('express');
const fetch = require('node-fetch')

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



module.exports = router;


// TODOs: SUBMIT QUIZ


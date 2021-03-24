const express = require('express');
const router = express.Router();


router.post('/createCourse', (req,res)=>{
    const { courseName, courseBranch, courseClass} = req.body;

    if(!courseName || !courseBranch || !courseClass)
        return res.body({msg: "Enter all Fields"})
    // Get course Schema 
    // Populate Schema
    // Save Schema

});


router.post('/assignTeacher', (req,res)=>{

    const { teacherID, courseID } = req.body;

    if(!teacherID || !courseID)
        return res.body({msg: "Enter all Fields"})
    
    // Find Teacher with ID
    // Update Course Array with given ID 
    
});

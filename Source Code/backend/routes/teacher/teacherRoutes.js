const express = require('express');
const router = express.Router();


router.get('/getAllCourses', (req,res)=>{
    const { teacherID } = req.body;

    if(!teacherID)
        return res.body({msg: "Enter all Fields"})
    
    
    // Get Courses ID array
    // Fetch all Courses Doc 
    // Send CoursesName

});


router.get('/getCourse', (req,res)=>{

    const { teacherID, courseID } = req.body;

    if(!teacherID || !courseID)
        return res.body({msg: "Enter all Fields"})
    
    // Find and return course with given ID
    
});

router.post('/createOE',(req,res)=>{
    res.send("TODO");
});

router.get('/getAllOE', (req,res)=>{
    res.send("TODO");
});

router.post('/createPOE', (req,res)=>{

    res.send("TODO");
})

router.get('/getAllPOE', (req,res)=>{
    res.send("TODO");
});



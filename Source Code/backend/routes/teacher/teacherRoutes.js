const express = require('express');
const router = express.Router();
const Teacher = require('../../schema/users/TeacherSchema');
const Course = require('../../schema/course/CourseSchema');


router.post('/getAllCourses', (req,res)=>{
    const { teacherID } = req.body;

    if(!teacherID)
        return res.json({msg: "Enter all Fields"})
    console.log(teacherID)
    var coursesID = []
    Teacher.findOne({_id: teacherID}).then(doc=>{
        console.log(doc)
        if(!doc)
            return res.status(400).json({msg: "No data"})
        coursesID = doc.courses;

        Course.find({
            '_id' :{
                $in: coursesID
            }
        }).then(docData => {
            res.status(200).json(docData);
        }).catch(err => {
            res.status(500).json(err);
        }).catch(err => 
            {
                console.log("Teacher Error");
                res.json(err);
            })

    })

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


module.exports = router;
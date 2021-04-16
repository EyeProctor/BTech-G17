const express = require('express');
const router = express.Router();
const Course = require('../../schema/course/CourseSchema');
const Teacher = require('../../schema/users/TeacherSchema');




router.post('/createCourse', (req,res)=>{
    const { courseName, branch, Class, sem} = req.body;

    if(!courseName || !branch || !Class || !sem)
        return res.json({msg: "Enter all Fields"})
    const quizes = [];
    const oes = [];
    const poes = [];

    Course.findOne({courseName, branch, Class, sem}).then(course => {
        if(course){
            res.status(400).json({msg: "Course Already Exists"});
            return;
        }
        else{
            const newCourse = new Course({
                courseName, Class, branch, sem,  quizes, poes, oes
            });
        
            newCourse.save().then(data => {
                console.log(data);
                return res.status(200).json(data);
            }).catch(err => 
                {
                    console.log(err);
                    return res.status(500).json({msg: "Server Error"})
                })
        }
    }).catch(
        err=> {
             console.log("Error Finding");
            console.log(err)
            return res.status(400).json({msg: "Input Errors"})
        }
        )


    
});


router.post('/assignTeacher', (req,res)=>{

    const { teacherID, courseID } = req.body;
    console.log(teacherID);

    if(!teacherID || !courseID)
        return res.status(400).body({msg: "Enter all Fields"})
    
    // Teacher.findOne({_id: teacherID}).then(data=>
    //     {
    //         data.courses = [];
    //         data.save().then(newDoc => res.json(newDoc))
    //     }).catch(err=> res.json(err))
    
    Teacher.findByIdAndUpdate({_id: teacherID}, 
        { $addToSet: { courses :courseID } },
        function (err, updatedDoc) {
            if (err) {
                return res.status(500).json({msg : err});
            }
        console.log(updatedDoc);
        res.status(200).send(updatedDoc)
    })
    
});

router.get('/allTeachers', (req,res)=>{
    Teacher.find({}).then(resData => {
        console.log(resData);
        return res.status(200).json(resData);
    }).catch(err =>{
        console.log(err);
        return res.status(500).json({msg: "Internal Error"})
    })
})

router.get('/allCourses', (req,res)=>{
    Course.find({}).then(resData => {
        console.log(resData);
        return res.status(200).json(resData);
    }).catch(err =>{
        console.log(err);
        return res.status(500).json({msg: "Internal Error"})
    })
})


router.get('/cleanDatabase', (req,res) => {
})

module.exports = router;
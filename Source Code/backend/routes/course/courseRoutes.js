const express = require('express');
const router = express.Router();
const Course = require('../../schema/course/CourseSchema');


router.post('/student/getAll', (req,res)=>{
    const { branch, Class, sem } = req.body;

    if(!branch || !Class || !sem){
        return res.status(400).json({msg: "Enter All Fields"});
    }
    else{

        Course.find({branch,Class,sem}).then(courseList => {
            return res.status(200).json(courseList);
        }).catch(err=> {
            return res.status(500).json(err);
        })
    }
})




module.exports = router;
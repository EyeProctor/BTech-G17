const express = require('express');
const User = require('../../schema/User');
const UserChoices = require('../../schema/UserChoices');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../../schema/users/StudentSchema')
const Teacher = require('../../schema/users/TeacherSchema')




router.post('/register',(req,res)=>{
    const {userName, email , password, userType , studentData, teacherData} =  req.body;
    console.log(userName + " " + email + " " + password + " " + userType);
    if(!userName || !email || !password || !userType)
       return res.status(400).json({msg: "Please enter all fields"});
       User.findOne({email}).then(user => {
           if(user){
               return res.status(400).json({msg: "User Already Exists"});
           }
       });
       if(userType === "Teacher"){
        const newTeacher = Teacher(
            {
                firstName: teacherData.firstName,
                lastName: teacherData.lastName,
                middleName: teacherData.middleName,
                branch: teacherData.branch,
                courses : teacherData.courses
            }
        );

        newTeacher.save().then(teacherDoc =>

            {
                const newUser = User({
                    userName, email, password , userType, studentData: "Null", teacherData: teacherDoc.id
                });

                registerUser(newUser);
            }

        );
    }
    else if(userType === "Student"){
        const newStudent = Student(
            {
                firstName: studentData.firstName,
                lastName: studentData.lastName,
                middleName: studentData.middleName,
                branch: studentData.branch,
                Class: studentData.Class,
                sem: studentData.sem
            }
        );

        newStudent.save().then(studentDoc =>{
            const newUser = User({
                userName, email, password , userType, studentData: studentDoc.id, teacherData: "Null"
            });
            registerUser(newUser);
        })
    }

    function registerUser(newUser){

        

        // Create SALT HASH
        bcrypt.genSalt(10, (err,salt)=> {
            bcrypt.hash(newUser.password, salt, (err,hash)=>{
                if(err) throw err;
                newUser.password = hash;
    
                newUser.save().then(
                    user => {
                        jwt.sign({id: user.id}, "SAAKB", {expiresIn:3600},
                        (err,token)=>{
    
                            if(err) throw err;
    
                            res.json(
                                {
                                    token,
                                    user
                                }
                            );
    
                        }
                        
                        )
                        
                    }
                ).catch(
                    error => console.log("Register Error MongoDB", error.message)
                );
            })
        })
    }    
})

router.post('/login', (req,res)=> {
    const {userName, password} = req.body;

    if(!userName || !password) {
       return res.status(400).json({msg: "Please Fill All Data"});
    }

    User.findOne({userName}).then(
        user => {
            if(user){
                bcrypt.compare(password, user.password).then(isMatch => {
                    if(isMatch)
                    {
                        jwt.sign({id: user.id}, "SAAKB", {expiresIn:3600},
                    (err,token)=>{

                        if(err) throw err;

                        if(user.studentData === "Null"){
                            Teacher.findOne({_id: user.teacherData}).then(teacherDoc =>{
                                res.status(200).json({
                                    token,
                                    user:{
                                        id: user.id,
                                    name: user.userName,
                                    email: user.email,
                                    userType: user.userType,
                                    studentData: user.studentData,
                                    teacherData: user.teacherData
                                    },
                                    teacherDoc
                                })
                            })
                        }
                        else{
                            Student.findOne({_id: user.studentData}).then(studentDoc => {
                                res.status(200).json({
                                    token,
                                    user:{
                                        id: user.id,
                                    name: user.userName,
                                    email: user.email,
                                    userType: user.userType,
                                    studentData: user.studentData,
                                    teacherData: user.teacherData
                                    },
                                    studentDoc
                                })
                            })
                        }

                    }
                    
                    )
                    }
                    else{
                        res.status(400).json({msg: "Invalid Credentials"});
                    }
                });
            }
            else{
                res.status(400).json({msg: "User Does not exist"});
            }
        }
    );

    
});

router.post('/saveUserChoices',(req,res)=> {
    const userChoices = new UserChoices(req.body);
    userChoices.save().then(
        data => {

            res.status(200).send(data);

        }
    ).catch(
        err => res.status(400).send(err.message)
    );
})

router.post('/submitUserChoices', (req,res)=> {

})

module.exports = router;


const express = require('express');
const User = require('../../schema/User');
const router = express.Router();



router.post('/register',(req,res)=>{
    const {userName, email , password} =  req.body;
    const newUser = User({
        userName, email, password
    });

    newUser.save().then(
        data => {
            res.status(200).send(data);
        }
    ).catch(
        error => console.log(error.message)
    );

})


module.exports = router;


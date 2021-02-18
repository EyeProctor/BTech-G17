const express = require('express');
const User = require('../../schema/User');
const UserChoices = require('../../schema/UserChoices');
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

router.post('/login', (req,res)=> {
    const {email, password} = req.body;

    User.findOne({email}, (err, user)=>{
        if(err){
            res.status(400).send(err.message);
        }else{
            if(user.password === password){
                res.status(200).send(user._id);
            }
            else{
                res.status(400).send({message: "Invalid Password"})
            }

        }
    })

    
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


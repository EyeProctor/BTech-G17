const express = require('express');
const QuizRoutes = require('./routes/quiz/quiz.js');
var cors = require('cors')



app = express()

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Connected");
})

app.use('/quiz',QuizRoutes );
app.get('/', (req,res)=> {
    res.send("Hello!");
});

app.post('/login', (req,res)=>{
    const {email, pass} = req.body;
    console.log(pass);
    console.log(email);
    res.status(200).send({value: "Logged IN"});
});
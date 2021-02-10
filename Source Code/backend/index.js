const express = require('express');
const QuizRoutes = require('./routes/quiz/quiz.js');


app = express()

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Connected");
})

app.use('/quiz',QuizRoutes );
app.get('/', (req,res)=> {
    res.send("Hello!");
});
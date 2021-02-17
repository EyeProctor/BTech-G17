const express = require('express');
const QuizRoutes = require('./routes/quiz/quiz.js');
var cors = require('cors')
const mongoose = require('mongoose');
const userRouts = require('./routes/user/userRoutes');


// -------------------------TODO-------------------------------
// TODO: Add Dot env to secure Database keys and other data
// -----------------------------------------------------------

// Setting up Express
app = express()


// Middlewares
app.use(express.json());
app.use(cors());
app.use("/user", userRouts);


const PORT = process.env.PORT || 5000;

// Connecting MongoDB
const MONGODB_URL = "mongodb+srv://btech:root@cluster0.xohwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)))
.catch((err) => console.log(err.message) );

mongoose.set('useFindAndModify', false);

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
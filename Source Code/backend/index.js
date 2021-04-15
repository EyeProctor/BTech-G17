const express = require('express');
const QuizRoutes = require('./routes/quiz/quiz.js');
var cors = require('cors')
const http = require('http')
const mongoose = require('mongoose');
const socket = require('socket.io')
const userRoutes = require('./routes/user/userRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');
const codingRoutes = require('./routes/code/codingRoutes');
const courseRoutes = require('./routes/course/courseRoutes');
const teacherRoutes = require('./routes/teacher/teacherRoutes');


// -------------------------TODO-------------------------------
// TODO: Add Dot env to secure Database keys and other data
// -----------------------------------------------------------

// Setting up Express
app = express()
const server = http.createServer(app)
const io = socket(server)


// Middlewares
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);
app.use("/code", codingRoutes);
app.use('/quiz',QuizRoutes );
app.use('/admin',adminRoutes );
app.use('/course',courseRoutes );
app.use('/teacher',teacherRoutes );


const PORT = process.env.PORT || 5000;




app.get('/', (req,res)=> {
    res.send("Hello!");
});

app.post('/login', (req,res)=>{
    const {email, pass} = req.body;
    console.log(pass);
    console.log(email);
    res.status(200).send({value: "Logged IN"});
});



const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    socket.on("join room", roomID => {
        console.log(roomID);
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

// Connecting MongoDB
const MONGODB_URL = "mongodb+srv://btech:root@cluster0.xohwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)))
.catch((err) => console.log(err.message) );

mongoose.set('useFindAndModify', false);


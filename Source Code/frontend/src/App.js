import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Practice from './components/practice/practice';
import Quiz from "./components/quiz/Quiz";
import {Component, createRef} from 'react';
import {Button, CardContent} from '@material-ui/core'
import {Grid} from '@material-ui/core'
import Webcam from "react-webcam";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import HomePage from './components/Home/HomePage'
import CodeUI from './components/Coding/CodeUI';
import Creator from './components/quiz/QuizCreation/QuizCreator'
import CreateRoom from './components/OE/CreateRoom'
import Room from "./components/OE/Room";
import AdminHome from "./components/admin/AdminHome"
import CreateStudent from './components/admin/CreateStudent/CreateStudent'
import CreateTeacher from './components/admin/CreateTeacher/CreateTeacher'
import CreateCourse from './components/admin/CreateCourse/CreateCourse'
import AssignCourse from './components/admin/CreateCourse/AssignCourse'
import Login from './components/Login/Login'
import CourseHome from './components/Home/Student/CourseHome'
import TeacherCourseHome from './components/Home/Teacher/TeacherCourse'
import QuizLandingPage from './components/quiz/QuizLandingPage';
function App() {
	return(
		<Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={HomePage} />

                <Route path="/course/quiz/:quizID" exact component={QuizLandingPage} />
                <Route path="/course/quiz/:quizID/:userID" exact component={WebCamScreen} />
                <Route path="/quiz/:quizID/:userID" exact component={Quiz} />
                <Route path="/OE" exact component={CreateRoom}/>
                <Route path="/room/:roomID" component={Room}/>

                <Route path="/admin" exact component={AdminHome} />
                <Route path="/createStudent" exact component={CreateStudent} />
                <Route path="/createTeacher" exact component={CreateTeacher} />
                <Route path="/createCourse" exact component={CreateCourse} />
                <Route path="/assignCourse" exact component={AssignCourse} />

                <Route path="/course/:courseName" exact component={CourseHome} />
                <Route path="/course/teacher/:courseName" exact component={TeacherCourseHome} />
                <Route path="/teacher/createQuiz/:courseID" exact component={Creator} />
            </Switch>
        </Router>
	);
}


class WebCamScreen extends Component {
    // webcamRef: React.useRef(null),
    constructor(props) {
        super(props);
        this.state = {  webcamRef: createRef(null),
            videoConstraints: {facingMode: "user"},
            camActive: false,
            quizPage: `/quiz/${this.props.match.params.quizID}/${this.props.match.params.userID}` 
        }
        navigator.mediaDevices.getUserMedia({video: true}).then(
            () => {
                this.setState({camActive: true});
            }
        ).catch((err)=> console.log(err));
    }
    

    render() {
      return (
        <>
        <Grid container spacing={2}>

                <Grid item xs={6} style={{marginTop:100}}>
                    <Card style={{marginLeft:150,marginRight:100,background:'#1e88e5'}}>
                        <CardContent style={{marginTop:15,color:'white'}}>
                        <Typography display="inline" variant="h5" style={{fontWeight:800}}>
                            Subject :
                        </Typography>

                        <Typography display="inline" variant="h5" style={{fontWeight:500,marginLeft:10}}>
                            Operating System
                        </Typography>
                        <br/>
                        <Typography display="inline" variant="h5" style={{fontWeight:800}}>
                            Time :
                        </Typography>

                        <Typography display="inline" variant="h5" style={{fontWeight:500,marginLeft:10}}>
                            10 Minutes
                        </Typography>
                        </CardContent>
                        </Card>
                </Grid>

                <Grid item xs={6}>
                        <Webcam  style={{width:550,marginTop:20}}
                        audio={false}
                        ref={this.state.webcamRef}
                        videoConstraints={this.state.videoConstraints}
                        />
                        <br/>
                        {
                    this.state.camActive?<Link style={{}} to={this.state.quizPage}><Button onClick={()=> {
                        
                    }} style={{background:'#03A9F4',color:'white',marginTop:10}}>Take Quiz</Button></Link>
                    :<Card style={{color: 'red', padding: 10}}> Please Allow Camera Permissions </Card>
                }
                        
                        {/* Capture Button can be triggered in Attempt quiz Button
                        <button onClick={capture}>Capture photo</button> */}
                
                </Grid>
                <hr/>
                <Grid item xs={12} style={{background:'#274056',paddingBottom:'25%'}}>
                    <br/>

                        <Typography display="inline" variant="h5" style={{fontWeight:600,marginLeft:200,color:'white'}}>
                            Instructions :
                        </Typography>
                        <Typography style={{fontWeight:300,marginLeft:215,color:'white'}}>
                            <ul>
                            <li>Select an answer for every question. Unanswered questions will be scored as incorrect.</li>
                            <li>Timing - You will need to complete each of your attempts in one sitting, as you are allotted 10 minutes to complete each attempt.</li>
                            <li>Answers - You may review your answer-choices and compare them to the correct answers after your final attempt.</li>
                            <li>To start, click the "Take the Quiz" button. When finished, click the "Submit Quiz" button.</li>
                            <li>Click on the Submit button at the bottom of the page to have your answers graded.</li>
                            </ul>
                        </Typography>

                </Grid>

            </Grid>
        </>
      );
    }
}

export default App;

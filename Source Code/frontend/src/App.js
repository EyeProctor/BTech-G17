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

function App() {
	return(
		<Router>
            <Switch>
                <Route path="/" exact component={Creator} />
                <Route path="/home" exact component={HomePage} />
                <Route path="/quiz" exact component={WebCamScreen} />
                <Route path="/quizID" exact component={Quiz} />
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
            camActive: false
        }
        navigator.mediaDevices.getUserMedia({video: true}).then(
            () => {
                this.setState({camActive: true});
            }
        ).catch((err)=> console.log(err));

        console.log("IN App JS",localStorage.getItem("UserToken"));
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
                    this.state.camActive?<Link style={{}} to="/quizID"><Button style={{background:'#03A9F4',color:'white',marginTop:10}}>Take Quiz</Button></Link>
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

<<<<<<< HEAD
export default App;
=======
export default App;
/*import QuizHeader from './components/quiz/QuizHeader';
import {Grid, Card, CardActions, Button } from '@material-ui/core';
import QuestionsPanel from './components/quiz/rightPanel/RightPanel.js';
import QuestionBody, {  } from "./components/quiz/questions/QuestionBody";
import Countdown from 'react-countdown';
import questionBank from './service/questions.js';
import userData from './service/userData.js';
import {  useState, useEffect } from 'react';

function App() {

		// var userChoice = {
		// 	prn: userData.prn,
		// 	startDate : 'dd-mm-yyy',
		// 	choices: {},
		// 	current: currentQ,
		// }
		useEffect(() => {
			   setStartDate(Date.now());
			   document.documentElement.requestFullscreen().catch((e) => {console.log(e)})
		  }, []);
	// 	const  blackListedKeys = ['Control', 'Alt', 'Tab']
	// 	window.addEventListener('keydown', function (event) {

	// 		// if the keyCode is 16 ( shift key was pressed )
		
	// 			// prevent default behaviour
	// 			if(blackListedKeys.includes(event.key)){
	// 				event.preventDefault();
	// 			return false;
	// 			}
				
		
				
			
		
	// })
	var [attempted, updateAttempted] = useState([]);
	const [startDate,setStartDate] = useState(Date.now());
	const [flagged, updateFlagged] = useState([]);
	const [currentQ, updateCurrentQ] = useState(1);
	var endDate = startDate + questionBank.duration;
	const handleAttempted = () => {
		updateAttempted(
			arr => [...arr, currentQ]
			
		);
		attempted = [...new Set(attempted)];
		console.log('AttemptedArray',attempted);
	}
	const handleFlagged = () => {
		if(!flagged.includes(currentQ))
			updateFlagged(
				arr => [...arr, currentQ]
			)
		else{
			var temp = [...flagged]
			temp.splice(temp.indexOf(currentQ));
			updateFlagged(
				temp
			)
		}
		// console.log('FlaggedArray',flagged);
		// console.log('CurrentQ',currentQ);
	}
	const handlePrev = () => {
		updateCurrentQ(currentQ-1);
	}
	const handleNext = () => {
		updateCurrentQ(currentQ+1);
	}

	const handleUserChoice = (val) => {

		updateUserChoice({...userChoices, [currentQ]: val})

		// console.log(JSON.stringify(userChoices));
	}

	var [userChoices, updateUserChoice] = useState({});

  return (
    <div>
      <Grid container justify={'center'} spacing={2}>
        <Grid item xs={12} >
        	<QuizHeader prn={userData.prn} status="Valid"/>
        </Grid>
		<Grid item container spacing={2} xs={12}>
			<Grid item xs={8}>
				<Card>
				<QuestionBody onFlagged={handleFlagged} onAttempted={handleAttempted} currentQ={questionBank.questions[currentQ - 1]} no = {currentQ} flagged={flagged} userChoice={userChoices[currentQ.toString()]} updateUserChoice={handleUserChoice}/>
				<CardActions>
		<Grid container
  direction="row"
  justify="space-between"
  alignItems="center" >
		<Grid item>	{
			(currentQ !== 1) ?
				<Button variant="contained" size="small" color="primary" href="#" onClick={handlePrev}>
				Prev
			</Button>:<></>
		  }</Grid>
		 <Grid item> {currentQ < questionBank.questions.length?<Button  variant="contained" size="small" color="primary" href="#" onClick={handleNext}  >
          Next
        </Button>:<></>}
		</Grid>
        </Grid>
      </CardActions>
				</Card>
			</Grid>
			<Grid item xs={4}>
				<Grid item xs={12} container>
					<QuestionsPanel updateNav={(val)=> updateCurrentQ(val) } qNo={questionBank.questions.length} attemptedQ={attempted} flagged={flagged} current={currentQ}/>
				</Grid>
				<Grid item xs={12}>
				<Button onClick={()=>{alert(JSON.stringify(userChoices))}} variant="contained" style={{background:'green',color: 'white', marginTop: 10}}>
          Submit
        </Button>
				</Grid>
				<Grid item xs={8}>
				<Countdown date={endDate} />
				</Grid>
			</Grid>
        </Grid>
		<Grid item xs={12} >
        	<h1>Group 17</h1>
        </Grid>
      </Grid>
      
    </div>
  );
}

export default App;*/
>>>>>>> 262c6514177a8c54fc10dac9b337a8e191aeacc5

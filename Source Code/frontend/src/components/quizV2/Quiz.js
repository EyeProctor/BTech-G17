import QuizHeader from './QuizHeader';
import {Grid, Card, CardActions, Button } from '@material-ui/core';
import QuestionsPanel from './rightPanel/RightPanel.js';
import QuestionBody, {  } from "./questions/QuestionBody";
import Countdown from 'react-countdown';
// import questionBank from '../../service/questions.js';
import userData from '../../service/userData.js';
import {  useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { saveUserChoices } from '../../reducer/quiz/quiz'
import { useHistory } from 'react-router';

function Quiz(props) {
	const quizDataFromStore = useSelector(state => state.quiz);
	const userName = useSelector(state => state.auth)
	var startDate = 0;
	const history = useHistory();
	console.log(JSON.stringify(quizDataFromStore))
	if(quizDataFromStore.startedAt === null)
		startDate = Date.now()
	else
		startDate = quizDataFromStore.startedAt;
	useEffect(() => {
			   document.documentElement.requestFullscreen().catch((e) => {console.log(e)})
			   
			   //setStartDate( );
	}, []);
	
	const dispatch = useDispatch();
	
	const fromStore = quizDataFromStore.userChoices;
	const userID = props.match.params.userID;
	const quizID = props.match.params.quizID;
	const questionBank = quizDataFromStore.questions;
	// const [quizData, setQuizData] = useState([])
	var [attempted, updateAttempted] = useState(quizDataFromStore.attempted);
	// const [startDate,setStartDate] = useState(Date.now());
	const [flagged, updateFlagged] = useState(quizDataFromStore.flagged);
	const [currentQ, updateCurrentQ] = useState(1);
	var endDate = startDate + parseInt(questionBank.duration)*60000;
	console.log("Start Date", startDate);
	
	const handleAttempted = () => {
		attempted = [...new Set(attempted)];
		updateAttempted(
			arr => [...arr, currentQ]
			
		);
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
	}
	const handlePrev = () => {
		updateCurrentQ(currentQ-1);
	}
	const handleNext = () => {
		updateCurrentQ(currentQ+1);
	}

	const handleUserChoice = (val) => {

		updateUserChoice({...userChoices, [currentQ]: val})

	}

	var [userChoices, updateUserChoice] = useState(quizDataFromStore.userChoices);
	useEffect(()=> {
		const data = {
			userID: userID,
			quizID: quizID,
			attempted: attempted,
    		flagged: flagged,
    		userChoices: userChoices,
    		startedAt: startDate,
			questions: questionBank,
		}

		// Updates on Backend
		dispatch(saveUserChoices());

		// Updates on Redux Store
		dispatch({type: "SAVE_USERCHOICES", payload: data});

	}, [attempted, flagged, userChoices,dispatch]);

	const handleSubmit = (e) => {
		const {firstName, lastName, middleName} = userName.studentDoc;
		const quizName = quizDataFromStore.questions.subject;
		const startedAt = startDate;
		e.preventDefault();
		if (window.confirm('Confirm Submission'))
		{
			fetch('/quiz/submitQuiz',{
				method: "POST",
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({userID, qID: quizID, userChoices, questions: questionBank.questions, firstName, middleName, lastName, startedAt, quizName})
			 }).then(data => data.json().then(newData => {
				console.log(JSON.stringify(newData));
				 if(newData.msg){
					 alert("Error");
				 }else{
					//dispatch({type: "QUIZ_RESET"})
					history.replace('/home');
					 
				 }
			 })).catch(err => console.log(err))

		}
	}

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
		
			{
			(currentQ !== 1) ?
				<Button variant="contained" size="small" color="primary" href="#" onClick={handlePrev}>
				Prev
			</Button>:<></>
		  }
		  {currentQ < questionBank.questions.length?<Button  variant="contained" size="small" color="primary" href="#" onClick={handleNext}>
          Next
        </Button>:<></>}
        
      </CardActions>
				</Card>
			</Grid>
			<Grid item xs={4}>
				<Grid item xs={12} container>
					<QuestionsPanel updateNav={(val)=> updateCurrentQ(val) } qNo={questionBank.questions.length} attemptedQ={attempted} flagged={flagged} current={currentQ}/>
				</Grid>
				<Grid item xs={12}>
				<Button onClick={handleSubmit} variant="contained" style={{background:'green',color: 'white', marginTop: 10}}>
          Submit
        </Button>
				</Grid>
				<Grid item xs={8}>
				<Countdown onComplete={handleSubmit} date={endDate} />
				</Grid>
			</Grid>
        </Grid>
		<Grid item xs={12} >
        	<h1> © Eye Procotor</h1>
        </Grid>
      </Grid>
      
    </div>
  );
}

export default Quiz;

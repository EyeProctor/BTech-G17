import { Box, Button, Grid, Typography, AppBar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';



const QuizLandingPage = (props) => {
    const quizID = props.match.params.quizID;
    //console.log(quizID)
    const [quizData,setQuizData] = useState({})
    const [isAvailable, setAvailable] = useState(false);
    const dispatch = useDispatch();
    const quizState = useSelector(state => state.quiz);
    const fromStore = quizState.userChoices;
    const userID = useSelector(state => state.auth.user.id);
    const [status, setStatus] = useState(true);
    const history = useHistory();

    useEffect(
        () => {
            fetch(`/quiz/getQuiz/${quizID}`).then(
                data => data.json().then(newData => {
                    //console.log(JSON.stringify(newData));
                    setQuizData(newData);
                    const endDate = new Date(newData.endDate).getTime();
                    const startDate = new Date(newData.startDate).getTime();
                    console.log();
                    if(startDate > Date.now() || endDate < Date.now())
                    {
                        setAvailable(false);
                    }else{
                        setAvailable(true);
                    }
                })
            );
            
            fetch('/quiz/quizStatusCheck',{
                method: "POST",
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({qID: quizID, userID})
             }).then(data => data.json().then(newData => {
                 setStatus(newData.status);
             })).catch(err => console.log(err))
        }, []
        );
    const takeQuiz = () => {
        // Save Current Quiz Data to Store
        dispatch({type:"SET_QUIZDATA", payload: quizData});

        // Check if UserData StartTime Exists
        // If store does not have any saved Instances of userChoices
        if(!fromStore){

            //Check from Database
            console.log("database Check")
            fetch(`/quiz/userChoices/${userID}/${quizID}`).then(data=>{
                data.json().then(newData => {
                    // No Saved Instance on Database
                    // New Attempt starts
                    if(newData.msg){

                        const newUserChoices = {
                                userID: userID,
                                quizID: quizID,
			                    attempted: [],
    		                    flagged: [],
                                userChoices: {},
                                startedAt: null,
                                questions: quizData,
                        }
                        dispatch({type: "SAVE_USERCHOICES", payload: newUserChoices})
                        history.push(`${quizID}/${userID}`);


                    }
                    // Saved Instance on Database
                    else{
                        
                        console.log(JSON.stringify(newData));
                        const questions = newData.questions[0];
                        newData = {...newData, questions: questions};
                        history.push(`${quizID}/${userID}`);
                        // Set Start Date from Database
                        dispatch({type: "SAVE_USERCHOICES", payload: newData})

                    }
                })
            });
        }else{
            console.log("From Store");
            console.log(JSON.stringify(quizState));
            history.push(`${quizID}/${userID}`);
        }
    }
    return(
        <div className='ch-container'>
        <div style={{padding:'5px'}}>
                <AppBar position='static' className='Appbar'>
                    <Grid container style={{justifyContent:'center',position:'relative'}}>
                        <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                            Proctored Quiz
                        </Grid>
                    </Grid>
                </AppBar>
        </div>
    <Grid className='cor' style={{margin:'0'}} container >
            <Grid item xs={12} style={{textAlign: 'center',marginTop:'5vh'}}>
                <Box p={2} boxShadow={5} borderBottom={1}>
                    {quizData.subject}
                </Box>
            </Grid>
            <Grid item xs={12} style={{textAlign: 'center',marginTop:'5vh'}}>
                {
                  status || !isAvailable ?<Alert severity='warning'> Quiz Not Available </Alert>
                  :<Button variant='contained' color='primary' onClick={takeQuiz}>Take Quiz</Button>
                }
            </Grid>
        </Grid>
  </div>
        
    );
}


export default QuizLandingPage;
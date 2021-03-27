import { Box, Button, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';



const QuizLandingPage = (props) => {
    const quizID = props.match.params.quizID;
    console.log(quizID)
    const [quizData,setQuizData] = useState({})
    const dispatch = useDispatch();
    const quizState = useSelector(state => state.quiz);
    const fromStore = quizState.userChoices;
    const userID = useSelector(state => state.auth.user.id);
    const [status, setStatus] = useState(false);
    const history = useHistory();

    useEffect(
        () => {
            fetch(`/quiz/getQuiz/${quizID}`).then(
                data => data.json().then(newData => {
                    console.log(JSON.stringify(newData));
                    setQuizData(newData);
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
                        history.push(`${quizID}/${userID}`);
                        // Set Start Date from Database
                        dispatch({type: "SAVE_USERCHOICES", payload: newData})

                    }
                })
            });
        }else{
            // Continue from localStore
            // if(Object.keys(fromStore).length ===0){
            //     const newUserChoices = {
            //         userID: userID,
            //         quizID: quizID,
            //         attempted: [],
            //         flagged: [],
            //         userChoices: {},
            //         startedAt: null,
            //         questions: quizData,
            // }
            // dispatch({type: "SAVE_USERCHOICES", payload: newUserChoices})
            // }
            console.log("From Store");
            console.log(JSON.stringify(quizState));
            history.push(`${quizID}/${userID}`);
        }
    }
    return(
        <Grid container >
            <Grid item xs={12}>
                <Box p={2}>
                    <Typography variant='h4'>
                    {quizData.subject}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {
                  status?<>Cannot Take Quiz</> 
                  :<Button variant='contained' onClick={takeQuiz}>Take Quiz</Button>
                }
            </Grid>
        </Grid>
    );
}


export default QuizLandingPage;
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';



const QuizLandingPage = (props) => {
    const quizID = props.match.params.quizID;
    console.log(quizID)
    const [quizData,setQuizData] = useState({})
    const dispatch = useDispatch();
    const fromstore = useSelector(state => state.quiz.userChoices);

    useEffect(
        () => {
            console.log("QuizLanding")
            fetch(`/quiz/getQuiz/${quizID}`).then(
                data => data.json().then(newData => {
                    console.log(JSON.stringify(newData));
                    setQuizData(newData);
                })
            );        
        }, []
    );
    const takeQuiz = () => {
        // Save Current Quiz Data to Store
        dispatch({type:"SET_QUIZDATA", payload: quizData});

        // Check if UserData StartTime Exists
        // If store does not have any saved Instances of userChoices
        if(!fromstore){

            //Check from Database
            fetch('/user/userChoices/userID').then(data=>{
                data.json().then(newData => {

                    // No Saved Instance on Database
                    if(newData.msg){

                        // Set StartDate as now

                    }

                    // Saved Instance on Database
                    else{

                        // Set Start Date from Database
                        // Update Redux Store

                    }
                })
            });
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
                <Button variant='contained' onClick={takeQuiz}>Take Quiz</Button>
            </Grid>
        </Grid>
    );
}


export default QuizLandingPage;
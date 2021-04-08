import {useHistory } from "react-router-dom";
import {useEffect, useRef, useState} from 'react';
import {Button, CardContent, Card, Typography, Grid} from '@material-ui/core';
import Webcam from "react-webcam";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";

const TempLanding = (props) => {    
    const quizData = useSelector(state => state.quiz.questions)
    const webCamRef = useRef(null);
    const videoConstraints = {facingMode: 'user'};
    const [camActive, setCamActive] = useState(false);
    const history = useHistory();
    const quizPage = `/quiz/${props.match.params.quizID}/${props.match.params.userID}`;

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video: true}).then(
            (stream) => {
                setCamActive(true);
                stream.oninactive = () => {history.go(0)}
                stream.onremovetrack = () => {history.go(0)}
            }
        ).catch((err)=> console.log(err));
    },[]);
    return(
        

        <>
        <Grid container spacing={2}>

                <Grid item xs={6} style={{marginTop:100}}>
                    <Card style={{marginLeft:150,marginRight:100,background:'#1e88e5'}}>
                        <CardContent style={{marginTop:15,color:'white'}}>
                        <Typography display="inline" variant="h5" style={{fontWeight:800}}>
                            Subject :
                        </Typography>

                        <Typography display="inline" variant="h5" style={{fontWeight:500,marginLeft:10}}>
                            {quizData.subject}
                        </Typography>
                        <br/>
                        <Typography display="inline" variant="h5" style={{fontWeight:800}}>
                            Time :
                        </Typography>

                        <Typography display="inline" variant="h5" style={{fontWeight:500,marginLeft:10}}>
                            {quizData.duration} Minutes
                        </Typography>
                        </CardContent>
                        </Card>
                </Grid>

                <Grid item xs={6}>
                        <Webcam  style={{width:550,marginTop:20}}
                        audio={false}
                        ref={webCamRef}
                        videoConstraints={videoConstraints}
                        />
                        <br/>
                        {
                    camActive?<Button variant='contained' color='primary' onClick={()=> {
                        history.replace(quizPage);
                    }} style={{background:'#03A9F4',color:'white',marginTop:10}}>Take Quiz</Button>
                    :<Alert severity="error"> Please Allow Camera Access</Alert>
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
                            <li>Timing - You will need to complete each of your attempts in one sitting, as you are allotted {quizData.duration} minutes to complete each attempt.</li>
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



export default TempLanding;
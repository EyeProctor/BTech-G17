import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles'; 
import {Grid } from '@material-ui/core';
import Capture from './Capture.js'
import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import blankProfile from './blankProfile';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
  margin: 0,
  },
  userIcon:{
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginLeft:'90%',
    borderRadius: '3rem'
  }
  }));

const QuizHeader = (props) => {
  const userData = useSelector(state => state.auth.user);
  const quizSubject = useSelector(state => state.quiz.questions.subject);
  const quizID = useSelector(state => state.quiz.quizID);
  useEffect(() => {
    faceapi.nets.tinyFaceDetector.loadFromUri('/models').then(()=> {console.log(
      "Face API Started"
    )}).catch((err) => console.log("Error Starting FACE API", err.message));
    
    }, []);
    function warn(message){
      confirmAlert({
        title: 'Warning',
        message: message,
        buttons: [
          {
            label: 'OK',
            onClick: () => document.documentElement.requestFullscreen().catch((e) => {console.log(e)})
          }
        ]
      });
    };
    function saveLog(img){
      const userID = userData.id;
      const reqBody = {
        image: img,
        userID,
        quizID
      }

      fetch('/quiz/malpracticeLog', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
      }).then( data => {
        console.log(data);
      }).catch(err => {
        console.error(err);
      })

    }
    const faceProcessingFunction = (faceData,img) => {
      console.log(faceData.length)
      if(faceData.length === 0){
        warn("No Face Detected")
        saveLog(img);
      }
      else if(faceData.length > 1){
        warn("Multiple Face Detected")
        saveLog(img);
      }
    }

    const userPRN = props.prn;
    const status = props.status;
    //const profile = props.profile;
    const classes = useStyles();
    const [ImgSrc,setImgSrc]= useState(blankProfile);
    const updateImgSrc = (img) => {
      setImgSrc(img);
      faceapi.detectAllFaces("input", new faceapi.TinyFaceDetectorOptions()).then((data) => faceProcessingFunction(data,img)).catch((err)=> console.error(err))
    }

    return(
        <AppBar position="static" className={classes.appBar}>
        <Toolbar style={{ background: '#274056' ,padding:5}}>
         
          <Grid container spacing={2}>
            
            <Grid item xs={4}>
              <Typography variant="h5" style={{fontWeight:500,margin:10}}>
               {quizSubject}
              </Typography>
            </Grid>

            <Grid item xs={4} >
              <img id="input" src={ImgSrc} className={classes.userIcon}/>
            </Grid>

            <Grid item xs={3} style={{marginTop:'0.3%'}}>
              <Typography display="inline" style={{marginLeft:15}} varient="h6">username : </Typography>
              <Typography display="inline" style={{marginLeft:5}} varient="h6">{userData.name}</Typography>
              <br/>
              <Typography display="inline" style={{marginLeft:15}} varient="h6">Status : </Typography>
              <Typography display="inline" style={{marginLeft:5,color:'#22D400',fontWeight:600}} varient="h6">{status}</Typography>
            </Grid>
            <Grid xs={1}>
              <Capture setImgSrc={updateImgSrc}/>
            </Grid>
          </Grid>
          
        </Toolbar>
      </AppBar>
    );
}


export default QuizHeader;
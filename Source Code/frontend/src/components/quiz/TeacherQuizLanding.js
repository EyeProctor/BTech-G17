import { AppBar, Grid } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import CustomBox from '../Helper/CustomBox';
import QuizDownload from './QuizDownload';
const TeacherQuizLanding = (props) => {
    const quizId = props.match.params.quizID;
    const [quizData, setQuizData] = useState([]);
    const [subject, setSubject] = useState(null);
    useEffect( () => {
        fetch(`/quiz/getAll/${quizId}`)
         .then(data =>  data.json().then(res => {setQuizData(res);
         setSubject(res[0].quizName);
         }))
         .catch(err => console.log(err));
     },[]);
    const quizObj =  useSelector(state => state.currentCourse.quizes);
    console.log(quizObj);
    return(
        <>
            <div className='ch-container'>
            <div style={{padding:'5px'}}>
                <AppBar position='static' className='Appbar'>
                    <Grid container style={{justifyContent:'center',position:'relative'}}>
                        <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                            {quizObj[0].subject}
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
                <Grid style={{marginTop: '10vh'}} container>
                    <Grid item xs={2}>
                        <QuizDownload quizData={quizData} subject={subject} />
                    </Grid>
                    
                </Grid>
            </div>
        </>
    );
}

export default TeacherQuizLanding;
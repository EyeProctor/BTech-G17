import {AppBar, Box, Button, Grid, Toolbar} from '@material-ui/core'
import { useSelector } from 'react-redux';
import CustomBox from '../../Helper/CustomBox'
import {Alert} from '@material-ui/lab'
import { useHistory } from 'react-router';

const TeacherCourseHome = (props) => {
    const courseID = props.match.params.courseName;
    const courses =  useSelector(state => state.course);
    const course = courses.filter((e)=> e._id === courseID)[0]
    const quizes = course.quizes;
    const poes = course.poes;
    const oes = course.oes;
    const history = useHistory();
    console.log(course);
    return(
        <div className='ch-container'>
            <div style={{padding:'5px'}}>
                <AppBar position='static' className='Appbar'>
                    <Grid container style={{justifyContent:'center',position:'relative'}}>
                        <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                            {course.courseName}
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
            
            <Grid className='cor' style={{margin:'0'}} container>
                <Grid item xs={12} style={{textAlign: 'center',marginTop:'5vh'}}>
                    <Box p={2} boxShadow={5} borderBottom={1}>
                        Quizes
                    </Box>
                </Grid>
                {(quizes.length === 0)?<Grid  item xs={12}><Alert severity="error" >No Active Quizes</Alert></Grid>:
                quizes.map((quizObj)=> <CustomBox key={quizObj.quizID} innerText={quizObj.subject} onClick={()=> {history.push(`/teacher/quiz/${quizObj.quizID}`)}}/>)}
                <Grid container justify="center" alignContent="center" alignItems="center" item xs={12}>
                    <Button onClick={()=>{ history.push(`/teacher/createQuiz/${courseID}`) }} variant="contained" color="primary">Create New Quiz</Button>
                </Grid>
                <Box border={1}/>
                <Grid item xs={12} style={{textAlign: 'center',marginTop:'5vh'}}>
                    <Box p={2} boxShadow={5} borderBottom={1}>
                        Practicals
                    </Box>
                </Grid>
                {(poes.length === 0)?<Grid  item xs={12} style={{width:'50%'}}><Alert severity="error">No Active Practicals</Alert></Grid>:<></>}
                <Grid container justify="center" alignContent="center" alignItems="center" item xs={12}>
                   <Button onClick={()=>{ history.push('/teacher/createPOE') }} variant="contained" color="primary">Create New Practical</Button>
                 </Grid>
                <Box border={1} />
                
            </Grid>
        </div>
    );
}

export default TeacherCourseHome;


// import {AppBar, Box, Button, Grid, Toolbar} from '@material-ui/core'
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom'
// // import CustomBox from '../../Helper/CustomBox'
// import {Alert} from '@material-ui/lab'
// import CustomBox from '../../Helper/CustomBox';
// const TeacherCourseHome = (props) => {
//     const courseID = props.match.params.courseName;
//     const courses =  useSelector(state => state.course);
//     const course = courses.filter((e)=> e._id === courseID)[0]
//     const quizes = course.quizes;
//     const poes = course.poes;
//     const oes = course.oes;
//     const history = useHistory();
//     console.log(course);
//     return(
//         <div>
//             <AppBar>
//                 <Toolbar stype={{backgroundColor: "black" }}>
//                 {course.courseName}
//                 </Toolbar>
//             </AppBar>
//             <Grid style={{marginTop: 60}} container spacing={2}>
//                 <Grid item xs={12} style={{textAlign: 'center'}}>
//                     <Box p={2} boxShadow={3} bgcolor="background.paper" borderBottom={1}>
//                         Quizes
//                     </Box>
//                 </Grid>
//                 {(quizes.length === 0)?<Grid  item xs={12}><Alert severity="error" >No Active Quizes</Alert></Grid>:
//                 quizes.map((quizObj)=> <CustomBox key={quizObj.quizID} innerText={quizObj.subject} onClick={()=> {history.push(`/teacher/quiz/${quizObj.quizID}`)}}/>)}
//                 <Grid container justify="center" alignContent="center" alignItems="center" item xs={12}>
//                     <Button onClick={()=>{ history.push(`/teacher/createQuiz/${courseID}`) }} variant="contained" color="primary">Create New Quiz</Button>
//                 </Grid>
//                 <Box border={1}/>
//                 <Grid item xs={12} style={{textAlign: 'center'}}>
//                     <Box p={2} boxShadow={3} bgcolor="background.paper" borderBottom={1}>
//                         Practicals
//                     </Box>
//                 </Grid>
//                 {(poes.length === 0)?<Grid  item xs={12}><Alert severity="error" >No Active Practicals</Alert></Grid>:<></>}
//                 <Grid container justify="center" alignContent="center" alignItems="center" item xs={12}>
//                     <Button onClick={()=>{ history.push('/teacher/createPOE') }} variant="contained" color="primary">Create New Practical</Button>
//                 </Grid>
//                 <Box border={1} />
                
//             </Grid>
//         </div>
//     );
// }

// export default TeacherCourseHome;

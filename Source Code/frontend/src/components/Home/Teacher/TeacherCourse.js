import {AppBar, Box, Button, Grid, Toolbar} from '@material-ui/core'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
// import CustomBox from '../../Helper/CustomBox'
import {Alert} from '@material-ui/lab'
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
        <div>
            <AppBar>
                <Toolbar stype={{backgroundColor: "black" }}>
                {course.courseName}
                </Toolbar>
            </AppBar>
            <Grid style={{marginTop: 60}} container spacing={2}>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                    <Box p={2} boxShadow={3} bgcolor="background.paper" borderBottom={1}>
                        Quizes
                    </Box>
                </Grid>
                {(quizes.length === 0)?<Grid  item xs={12}><Alert severity="error" >No Active Quizes</Alert></Grid>:<></>}
                <Grid container justify="center" alignContent="center" alignItems="center" item xs={12}>
                    <Button onClick={()=>{ history.push(`/teacher/createQuiz/${courseID}`) }} variant="contained" color="primary">Create New Quiz</Button>
                </Grid>
                <Box border={1}/>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                    <Box p={2} boxShadow={3} bgcolor="background.paper" borderBottom={1}>
                        Practicals
                    </Box>
                </Grid>
                {(poes.length === 0)?<Grid  item xs={12}><Alert severity="error" >No Active Practicals</Alert></Grid>:<></>}
                <Grid container justify="center" alignContent="center" alignItems="center" item xs={12}>
                    <Button onClick={()=>{ history.push('/teacher/createPOE') }} variant="contained" color="primary">Create New Practical</Button>
                </Grid>
                <Box border={1} />
                
            </Grid>
        </div>
    );
}

export default TeacherCourseHome;
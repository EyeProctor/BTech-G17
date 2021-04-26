import {AppBar, Box, Grid, Toolbar} from '@material-ui/core'
import { useSelector } from 'react-redux';
import CustomBox from '../../Helper/CustomBox'
import {Alert} from '@material-ui/lab'
import { useHistory } from 'react-router';
const CourseHome = (props) => {
    const courseID = props.match.params.courseName;
    const courses =  useSelector(state => state.course);
    const course = courses.filter((e)=> e._id === courseID)[0]
    const quizes = course.quizes;
    const poes = course.poes;
    const history = useHistory();
    const oes = course.oes;
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
                {(quizes.length === 0)?<Grid  item xs={12}><Alert severity="error" >Nothing Here</Alert></Grid>:
                quizes.map((quizObj)=> <CustomBox key={quizObj.quizID} innerText={quizObj.subject} onClick={()=> {history.push(`quiz/${quizObj.quizID}`)}}/>)}
                <Grid item xs={12} style={{textAlign: 'center',marginTop:'5vh'}}>
                    <Box p={2} boxShadow={5} borderBottom={1}>
                        Practicals
                    </Box>
                </Grid>
                {(poes.length === 0)?<Grid  item xs={12}><Alert severity="error" >Nothing Here</Alert></Grid>
                :poes.map((poeObj)=> <CustomBox key={poeObj.poeID} innerText={poeObj.title} onClick={()=> {history.push(`/student/poe/${poeObj.poeID}`)}}/>)}

            </Grid>
        </div>
    );
}

export default CourseHome;



import {AppBar, Box, Grid, Toolbar} from '@material-ui/core'
import { useSelector } from 'react-redux';
// import CustomBox from '../../Helper/CustomBox'
import {Alert} from '@material-ui/lab'
const CourseHome = (props) => {
    const courseID = props.match.params.courseName;
    const courses =  useSelector(state => state.course);
    const course = courses.filter((e)=> e._id === courseID)[0]
    const quizes = course.quizes;
    const poes = course.poes;
    const oes = course.oes;
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
            <Grid style={{marginTop: 60}} container spacing={2}>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                    <Box p={2} boxShadow={3} bgcolor="background.paper" borderBottom={1}>
                        Quizes
                    </Box>
                </Grid>
                {(quizes.length === 0)?<Grid  item xs={12}><Alert severity="error" >Nothing Here</Alert></Grid>:<></>}
                <Grid item xs={12} style={{textAlign: 'center'}}>
                    <Box p={2} boxShadow={3} bgcolor="background.paper" borderBottom={1}>
                        Practicals
                    </Box>
                </Grid>
                {(poes.length === 0)?<Grid  item xs={12}><Alert severity="error" >Nothing Here</Alert></Grid>:<></>}
            </Grid>
        </div>
    );
}

export default CourseHome;
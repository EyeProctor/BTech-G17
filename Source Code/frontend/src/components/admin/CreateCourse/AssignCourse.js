import {FormControl,Select, MenuItem, InputLabel, Grid, Button, Box, CircularProgress, Container, AppBar} from '@material-ui/core'
import {useEffect, useState} from 'react';
import {Alert, AlertTitle} from '@material-ui/lab'
const AssignCourse = () => {

    const [teacherID, setTeacherID] = useState("");
    const [courseID, setCourseID] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [branchCourses, setBranchCourses] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isBad,setBad] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    useEffect(()=>{
        fetch('/admin/allTeachers').then(data => data.json().then(teachers => {setTeachers(teachers);})).catch(err => console.log(err))
        fetch('/admin/allCourses').then(data => data.json().then(courses => {setCourses(courses);})).catch(err => console.log(err))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setBad(false);
        setLoading(true);
        setSuccess(false);
        setErrMessage("");

        const reqBody = {
            teacherID,courseID
        }

        fetch(
            "/admin/assignTeacher",
            {
                method: "POST",
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            }
        ).then(
            response => response.json().then( data => {
                console.log(JSON.stringify(data));
                setLoading(false);
                if(data.msg){
                    setBad(true);
                    setErrMessage(data.msg);
                }else
                    setSuccess(true);
            })
        ).catch((err) => {
            console.error(err); 
            setLoading(false);
            setBad(true);
            setErrMessage("Bad Request");
        }
            );
        
    }

    const changeCourseList = (e) => {
        const t_id = e.target.value;
        setTeacherID(t_id);
        const selectedBranch = teachers.filter((e)=> t_id===e._id)[0].branch;
        const newCourses = courses.filter((e)=> e.branch === selectedBranch)
        setBranchCourses(newCourses);
    }

    return(
        <Container maxWidth="xlg">
            <AppBar position='static' className='Appbar'>
                <Grid container style={{justifyContent:'center',position:'relative'}}>
                    <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                        Assign Course
                    </Grid>
                </Grid>
            </AppBar>
            <div>
                <form onSubmit={handleSubmit}>
                    <Grid container style={ { marginTop: 25, padding: 10} } spacing={2}>
                        <Grid item md={6} xs={12}>
                            <FormControl required fullWidth variant="outlined">
                                <InputLabel id="teacher" >Teacher</InputLabel>
                                <Select value={teacherID} onChange={changeCourseList} labelId="teacher" label="Teacher">
                                    {
                                        teachers.map((val)=>{
                                            const nametoDisplay = `${val.firstName} ${val.middleName[0]} ${val.lastName} (${val.branch})`
                                            return(
                                                <MenuItem key={val._id} value={val._id}>{nametoDisplay}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item md={6} xs={12}>
                            <FormControl required fullWidth variant="outlined">
                                <InputLabel id="course">Course</InputLabel>
                                <Select value={courseID} onChange={(e)=>{setCourseID(e.target.value)}} labelId="course" label="Course">
                                {
                                        branchCourses.map((val)=>{
                                            
                                            return(
                                                <MenuItem key={val._id} value={val._id}>{val.courseName}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid container item justify="center" alignItems="center">
                            <Box p={5}>
                            {isLoading ?<CircularProgress />:<Button type="submit" variant="contained" color="primary">Assign</Button>}
                            </Box>
                        </Grid>
                        <Grid container item xs={12} justify="center" alignItems="center">
                                {isBad ?<Alert severity="error"><AlertTitle>Error</AlertTitle>{errMessage}</Alert>:<></>}
                        </Grid>
                        <Grid container item justify="center" alignItems="center">
                                {isSuccess ?<Alert variant="filled" severity="success">Assigned!</Alert>:<></>}
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default AssignCourse;
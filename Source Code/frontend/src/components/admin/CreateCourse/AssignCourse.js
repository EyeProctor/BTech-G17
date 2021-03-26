import {FormControl,Select, MenuItem, InputLabel, Grid, Button, Box} from '@material-ui/core'
import {useEffect, useState} from 'react';
const AssignCourse = () => {

    const [teacherID, setTeacherID] = useState("");
    const [courseID, setCourseID] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [branchCourses, setBranchCourses] = useState([]);

    useEffect(()=>{
        fetch('/admin/allTeachers').then(data => data.json().then(teachers => {setTeachers(teachers);})).catch(err => console.log(err))
        fetch('/admin/allCourses').then(data => data.json().then(courses => {setCourses(courses);})).catch(err => console.log(err))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const reqBody = {
            teacherID,courseID
        }

        console.log(JSON.stringify(reqBody));
        
    }

    const changeCourseList = (e) => {
        const t_id = e.target.value;
        setTeacherID(t_id);
        const selectedBranch = teachers.filter((e)=> t_id===e._id)[0].branch;
        const newCourses = courses.filter((e)=> e.branch === selectedBranch)
        setBranchCourses(newCourses);
    }

    return(
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
                        <Button type="submit" variant="contained" color="primary">Assign</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default AssignCourse;
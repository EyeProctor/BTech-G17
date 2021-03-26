import { AppBar, Toolbar, Card, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router";
import CustomBox from '../../Helper/CustomBox';

const TeacherHome = () => {
    const user = useSelector(state => state.auth.user)
    const[courseList, setCourseList] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        const teacherID = user.teacherData;
        console.log(JSON.stringify(user))
        fetch('/teacher/getAllCourses',{
           method: "POST",
           mode: 'cors',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({teacherID})
        }).then(data => data.json().then(newData => {setCourseList(newData); dispatch({type: "SET_COURSES", payload: newData})})).catch(err => console.log(err))
    },[]);

    return(
        <>
                <AppBar>
                    <Toolbar stype={{backgroundColor: "black" }}>
                    </Toolbar>
                </AppBar>
                <Grid style={{marginTop: 100}} container spacing={2}>
                {
                    courseList.map((val,idx) => {
                        return(
                            <Grid item xs={4} key={idx}>
                                <CustomBox innerText={val.courseName} onClick={()=>{
                                    history.push(`/course/teacher/${val._id}`)
                                }}/>
                            </Grid>
                        );
                    })
                }
                
                </Grid>
        </>
    );
}

export default TeacherHome;
import { AppBar, Toolbar, Grid } from "@material-ui/core";
import CustomBox from '../../Helper/CustomBox';
import {useDispatch} from 'react-redux'

import {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom'

const StudentHome = () => {
    const branch = "cse"
    const dispatch = useDispatch();
    const history = useHistory();
    const sem = "Sem 8"
    const Class = "Btech"
    const[courseList, setCourseList] = useState([])
    useEffect(()=>{
        fetch('/course/student/getAll',{
           method: "POST",
           mode: 'cors',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({branch,Class,sem})
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
                                    history.push(`/course/${val._id}`)
                                }}/>
                            </Grid>
                        );
                    })
                }
                
            </Grid>
        </>
    );
}

export default StudentHome;
import { AppBar, Toolbar, Card, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router";
import CustomBox from '../../Helper/CustomBox';
import ProfileMenu from "../../Login/profile_menu.js";


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
            <div className='ch-container'>
                <div style={{padding:'5px'}}>
                    <AppBar position='static' className='Appbar'>
                        <Grid container style={{justifyContent:'space-between',position:'relative'}}>
                            <Grid item style={{display:'flex',justifyContent:'space-between'}}>
                                <img src='logo_trans.png' className='logo'></img>
                                <div style={{display:'inline-block',verticalAlign:'middle',textAlign:'center',color:'#fec14e'}}>
                                    <h1 style={{position:'relative',top:'50%',transform: 'translateY(-50%)'}}>Proctor</h1>
                                </div>
                            </Grid>
                            <Grid item style={{justifyContent:'space-between',position:'relative'}}>
                                <ProfileMenu />
                            </Grid>
                        </Grid>
                    </AppBar>
                </div>
                <Grid style={{marginTop: '10vh'}} container>
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
            </div>
        </>
    );
}

export default TeacherHome;
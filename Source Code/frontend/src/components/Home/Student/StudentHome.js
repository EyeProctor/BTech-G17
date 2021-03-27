import { AppBar, Grid } from "@material-ui/core";
import React from 'react';
import CustomBox from '../../Helper/CustomBox';
import {useDispatch} from 'react-redux'

import {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom'
import ProfileMenu from "../../Login/profile_menu.js";

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
                                        history.push(`/course/${val._id}`)
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

export default StudentHome;
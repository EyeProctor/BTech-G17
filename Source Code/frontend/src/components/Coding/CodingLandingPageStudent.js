import { AppBar, Button, Container, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

const CodingLandingPageStudent = (props) => {
    const codeID = props.match.params.codeID;
    const userID = useSelector(state => state.auth.user.id);
    const [codeAssignment,setCodeAssignment] = useState({});
    const [startDate, setStartDate]= useState("");
    const [endDate, setEndDate]= useState("");
    const [isAvailable, setAvailable] = useState(false);
    const [isProctored, setProctored] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        fetch(`/code/getCodingAssignment/${codeID}`).then(data => data.json().then(resData =>{
            setCodeAssignment(resData);
            dispatch({type: "SET_CODING", payload: resData});
            setStartDate(new Date(resData.startDate));
            setEndDate(new Date(resData.endDate));

            // Check StartDate and EndDate and then SetAvailable
            
            setAvailable(true);
        }
        ))
    },[])
    return(
        <Container maxWidth="xlg">
            <AppBar position='static' className='Appbar'>
                <Grid container style={{justifyContent:'center',position:'relative'}}>
                    <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                        {codeAssignment.title}
                    </Grid>
                </Grid>
            </AppBar>
            <Grid container spacing={3}  style={{marginTop: 10}} justify="center" alignContent="center" direction='column'>
                <Grid item xs={6}>
                    <strong>Start Date:</strong> {startDate.toString()}
                </Grid>
                <Grid item xs={6}>
                    <strong>End Date:</strong> {endDate.toString()}
                </Grid>
                <Grid item xs={12}>
                    <strong>Number of Questions:</strong> {codeAssignment.problems ?codeAssignment.problems.length:0}
                </Grid>
                <Grid item xs={12}> 
                    {isAvailable?<Button onClick={()=>{ history.replace(`/student/poe/${codeID}/${userID}`) }} variant="contained" color="primary">Take Test</Button>:<Typography>Not Available</Typography>}
                </Grid>
            </Grid>
        </Container>
    );
}


export default CodingLandingPageStudent;
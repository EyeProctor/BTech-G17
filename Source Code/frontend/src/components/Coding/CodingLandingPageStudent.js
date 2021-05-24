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
            const tempSD = new Date(resData.startDate);
            const tempED = new Date(resData.endDate);
            const totalTestcases = resData.problems[0].testcases.length;
            setStartDate(tempSD);
            setEndDate(tempED);

            // Check StartDate and EndDate and then SetAvailable
            if(tempSD.getTime() > Date.now() || tempED.getTime() > Date.now())
            {   
                // Check Submission Status
                fetch(`/code/submitStatus/${codeID}/${userID}`).then(
                    resData => resData.json().then(
                        data => {
                            if(data.msg){
                                console.log("error Fetching Results");
                            }
                            else{
                                if(!data.found){

                                    fetch(`/code/getUserCode/${codeID}/${userID}`).then(
                                        resData => resData.json().then(data => {
                                            if(data.msg){
                                                dispatch({type: "RESET_CODESOLUTION"})
                                                dispatch({type: "SET_TOTALTESTCASE", payload: totalTestcases})
                                                setAvailable(true);
                                            }else{
                                                dispatch({type:"LOAD_CODESOLUTION", payload: data});
                                                dispatch({type: "SET_TOTALTESTCASE", payload: totalTestcases})
                                                setAvailable(true);
                                            }
                                        })
                                    )
                                }
                            }
                            
                        }
                    )
                )
                
            }
            
        }
        ))
    },[])
    return(
        <Container className="grid-container" maxWidth="xl">
            <AppBar position='static' className='Appbar'>
                <Grid container style={{justifyContent:'center',position:'relative'}}>
                    <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                        {codeAssignment.title}
                    </Grid>
                </Grid>
            </AppBar>
            <Grid  container spacing={3}  style={{marginTop: 10}} justify="center" alignContent="center" direction='column'>
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
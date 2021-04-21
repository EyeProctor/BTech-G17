import {useState, useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux';
import {TextField,Grid,Button,Checkbox,FormControlLabel, CircularProgress, AppBar, Container} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab'
import {useHistory} from 'react-router-dom'

const Practice = (props) => {
    const dispatch = useDispatch();
	const history = useHistory();
    const state = useSelector(state => state.quizCreator);
	const courseID = props.match.params.courseID;
	const [isLoading, setLoading] = useState(false);
    const [isBad,setBad] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [errMessage, setErrMessage] = useState("");
	console.log(courseID);

    const handleSubmit = (e) => {
        e.preventDefault();
		setBad(false);
		setSuccess(false);
		setLoading(true);
		setErrMessage("");
		// Do Simple form Check

		dispatch({type: "SET_QUIZCOURSE", payload: courseID})

		console.log(JSON.stringify(state));

		fetch("/quiz/addQuiz", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(state)
		}).then(data => data.json().then( (newData)=>
			{
				console.log(JSON.stringify(newData));
				if(newData.msg){
					setBad(true);
					setLoading(false);
					setErrMessage(newData.msg);
				}
				else{
					setSuccess(true);
					setLoading(false);
					history.go(-1);
				}
			}
		)).catch(err => console.log(err))

    }

    const addQuestion = () => {
        dispatch({type: "ADD_QUESTION_TEMPLATE"});
    }
    const addOption = (QIndex) => {
        dispatch({type: "ADD_OPTION_TEMPLATE", payload:{QIndex}});
    }
    return(
        <>
            <div style={{padding:'12px'}}>
                <AppBar position='static' className='Appbar'>
                    <Grid container style={{justifyContent:'center',position:'relative'}}>
                        <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                            Quiz Creation
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
            <Container maxWidth="xlg">
                <form  onSubmit={handleSubmit} noValidate autoComplete="off" center="true">
                        <Grid container spacing={3} alignItems="center" style={{padding:50 ,backgroundColor:"beige"}}>
                            <Grid item xs={12}>
                                <TextField onChange = {(e)=> {dispatch({type:"SET_QUIZ_SUBJECT", payload: e.target.value})}} id="quizsub" label="Quiz Subject" variant="outlined" fullWidth/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth
                                    id="datetime-start"
                                    label="Start Date Time"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T00:00"
                                    onChange = {(e)=> {dispatch({type:"SET_STARTDATE", payload: new Date(e.target.value)})}}
                                    InputLabelProps={{
                                    shrink: true,}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth
                                    id="datetime-end"
                                    label="End Date Time"
                                    type="datetime-local"
                                    defaultValue="2020-01-24T00:00"
                                    onChange = {(e)=> {dispatch({type:"SET_ENDDATE", payload: new Date(e.target.value)})}}
                                    InputLabelProps={{
                                    shrink: true,}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onChange = {(e)=> {dispatch({type:"SET_DURATION", payload: e.target.value})}} type="number" id="dur" label="Duration" variant="outlined" fullWidth helperText="Quiz Duration in Minutes"/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onChange = {(e)=> {dispatch({type:"SET_THRESHOLD", payload: e.target.value})}} type="number" id="threshold" label="Threshold" variant="outlined" fullWidth helperText="Threshold is Number of Warnings allowed for Students"/>
                            </Grid>
                                {
                                    state.questions.map((val, idx)=> {
                                        let queId = `que-${idx+1}`
                                        return (
                                            <Grid item xs={10}>
                                            <div key={idx}>
                                            <Grid container spacing={3} alignItems="center">
                                                <Grid item xs={10}><TextField fullWidth
                                                label={"Question#"+idx}
                                                type="text"
                                                name={queId}
                                                data-id={idx}
                                                id={queId}
                                                value= {val.question}
                                                onChange = {(e)=> dispatch({type: "ADD_QUESTION", payload: {QIndex: idx, question: e.target.value}})}
                                                className="question-text"
                                                variant="outlined"
                                                />
                                                </Grid>
                                                <Grid item xs={2}>
                                                <Button label="+Add Option" variant="outlined" onClick={()=>addOption(idx)}>+ Add Option</Button>
                                                </Grid>
                                            </Grid>
                                            </div>
                                            {
                                    state.questions[idx].options.map((val, oIdx)=> {
                                        
                                        return (
                                            <div key={oIdx}>
                                                <Grid item xs={2}>
                                                <FormControlLabel control={
                                                <Checkbox checked={val.ans} onChange={()=> dispatch({type: "SET_ANSWER", payload: {QIndex: idx, OIndex: oIdx}})} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />
                                                
                                                } label={
                                                    <TextField fullWidth label={`Option No.${oIdx+1}`} value={val.qs} onChange={(e)=> {dispatch({type:"ADD_OPTION", payload:{QIndex: idx, OIndex: oIdx, option: e.target.value}})}}/>
                                                } />
                                                    
                                                </Grid>
                                            </div>
                                        )
                                    })
                                }
                                            </Grid>
                                        )
                                    })
                                }
                                
                                <Button variant="outlined" onClick={addQuestion}>+ Add Question</Button>
                            <Grid item xs={12}>
                            {isLoading ?<CircularProgress />:<Button type="submit" variant="contained" color="primary">Create Quiz</Button>}
                            </Grid>
                            <Grid container item xs={12} justify="center" alignItems="center">
                                    {isBad ?<Alert severity="error"><AlertTitle>Error</AlertTitle>{errMessage}</Alert>:<></>}
                            </Grid>
                            <Grid container item justify="center" alignItems="center">
                                    {isSuccess ?<Alert variant="filled" severity="success">Quiz Created!</Alert>:<></>}
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </>
    );
}

export default Practice;
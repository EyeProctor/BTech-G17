import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Grid, Button, Box, FormControl, CircularProgress } from '@material-ui/core';
import { border } from '@material-ui/system';
import { Alert, AlertTitle } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
/**
 * Question
 */
const CreateCodingQuetion = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state.quizCreator);
    const courseID = props.match.params.courseID;
    const [isLoading, setLoading] = useState(false);
    const [isBad, setBad] = useState(false);
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

        dispatch({ type: "SET_QUIZCOURSE", payload: courseID })

        console.log(JSON.stringify(state));

        fetch("/quiz/addQuiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state)
        }).then(data => data.json().then((newData) => {
            console.log(JSON.stringify(newData));
            if (newData.msg) {
                setBad(true);
                setLoading(false);
                setErrMessage(newData.msg);
            }
            else {
                setSuccess(true);
                setLoading(false);
                history.go(-1);
            }
        }
        )).catch(err => console.log(err))

    }

    const addQuestion = () => {
        dispatch({ type: "ADD_QUESTION_TEMPLATE" });
    }
    const addOption = (QIndex) => {
        dispatch({ type: "ADD_OPTION_TEMPLATE", payload: { QIndex } });
    }
    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off" center="true" margin="20px">
            <Grid container spacing={3} alignItems="center" style={{ padding: 50, backgroundColor: "beige" }} xs={12}>
                <Grid item xs={12}>
                    <TextField onChange={(e) => { dispatch({ type: "SET_QUIZ_SUBJECT", payload: e.target.value }) }} id="quizsub" label="Assignment Title" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth
                        id="datetime-start"
                        label="Start Date Time"
                        type="datetime-local"
                        defaultValue="2017-05-24T00:00"
                        onChange={(e) => { dispatch({ type: "SET_STARTDATE", payload: new Date(e.target.value) }) }}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth
                        id="datetime-end"
                        label="End Date Time"
                        type="datetime-local"
                        defaultValue="2020-01-24T00:00"
                        onChange={(e) => { dispatch({ type: "SET_ENDDATE", payload: new Date(e.target.value) }) }}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={(e) => { dispatch({ type: "SET_DURATION", payload: e.target.value }) }} type="number" id="dur" label="Duration in minutes" variant="outlined" fullWidth />
                </Grid>
                {
                    state.questions.map((val, idx) => {
                        let queId = `que-${idx + 1}`
                        return (
                            <Grid item xs={12}>
                                
                                <Box border={1} padding={3}>
                                <div key={idx}>
                                    <Grid container spacing={3} alignItems="center" border={1}>
                                        
                                        <Grid item xs={12}>
                                            <TextField onChange={(e) => { dispatch({ type: "SET_QUIZ_SUBJECT", payload: e.target.value }) }} id="quizsub" label="Problem title" variant="outlined" fullWidth />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField onChange={(e) => { dispatch({ type: "SET_QUIZ_SUBJECT", payload: e.target.value }) }} id="quizsub" label="Problem Statement" variant="outlined" fullWidth />
                                        </Grid>
                                        <Grid item xs={10}><TextField fullWidth
                                            label={"Languages" + idx}
                                            type="text"
                                            name={queId}
                                            data-id={idx}
                                            id={queId}
                                            value={val.question}
                                            onChange={(e) => dispatch({ type: "ADD_QUESTION", payload: { QIndex: idx, question: e.target.value } })}
                                            className="question-text"
                                            variant="outlined"
                                        />
                                        </Grid>
                                        
                                    </Grid>
                               
                                {
                                    state.questions[idx].options.map((val, oIdx) => {

                                        return (
                                                <Grid container spacing={3} alignItems="center" border={1}>
                                                    <Grid item xs={12}  spacing={3} key={oIdx}>
                                                            <TextField fullWidth label={`Input: ${oIdx+1}`} value={val.qs} variant='outlined' onChange={(e) => { dispatch({ type: "ADD_INPUT", payload: { QIndex: idx, OIndex: oIdx, option: e.target.value } }) }} /><br/><br/>
                                                            <TextField fullWidth label={`Output: ${oIdx+1}`} value={val.qs} variant='outlined' onChange={(e) => { dispatch({ type: "ADD_OUTPUT", payload: { QIndex: idx, OIndex: oIdx, option: e.target.value } }) }} />
                                                    </Grid>
                                                </Grid>
                                        
                                        )
                                    })
                                }
                                </div>
                                < br />
                                <Grid item xs={12}>
                                            <Button label="+Add Option" variant="outlined"   onClick={() => addOption(idx)}>+ Add Test Case</Button>
                                        </Grid>
                                    </Box>
                            </Grid>
                        )
                    })
                }


                <Grid item xs={12}>
                    <Button variant="contained"  color="secondary" onClick={addQuestion}>+ Add Question</Button>
                    {isLoading ? <CircularProgress /> : <Button type="submit" variant="contained" color="primary">Create Quiz</Button>}
                </Grid>
                <Grid container item xs={12} justify="center" alignItems="center">
                    {isBad ? <Alert severity="error"><AlertTitle>Error</AlertTitle>{errMessage}</Alert> : <></>}
                </Grid>
                <Grid container item justify="center" alignItems="center">
                    {isSuccess ? <Alert variant="filled" severity="success">Quiz Created!</Alert> : <></>}
                </Grid>
            </Grid>
        </form >
    );
}

export default CreateCodingQuetion;
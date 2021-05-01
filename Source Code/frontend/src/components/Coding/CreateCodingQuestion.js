import { useState, useEffect, React } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Grid, Button, Box, FormControl, CircularProgress,
         Checkbox, FormControlLabel, FormLabel, FormGroup } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';


const CreateCodingQuetion = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state.CodingCreator);
    const courseID = props.match.params.courseID;
    const [isLoading, setLoading] = useState(false);
    const [isBad, setBad] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    console.log(courseID);

    useEffect(() => {
        //dispatch({ type: "RESET_CODING_CREATION" })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setBad(false);
        setSuccess(false);
        setLoading(true);
        setErrMessage("");
        // Do Simple form Check

        dispatch({ type: "SET_CODING_COURSE", payload: courseID })

        console.log(JSON.stringify(state));

        fetch("/code/addCodingAssignment", {
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


    const addProblem = () => {
        dispatch({ type: "ADD_PROBLEM_TEMPLATE" });
    }
    const addTestcase = (PIndex) => {
        dispatch({ type: "ADD_TESTCASE_TEMPLATE", payload: { PIndex } });
    }


    const handleLangChange = (event, idx) => {
        dispatch({ type: "SET_PROBLEM_LANGUAGES", payload: { PIndex: idx, lang: [event.target.name], flag: event.target.checked} })
        // setLanguages({ ...language, [event.target.name]: event.target.checked });
    };

    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off" center="true" margin="20px">
            <Grid container spacing={3} alignItems="center" style={{ padding: 50, backgroundColor: "beige" }} xs={12}>
                <Grid item xs={12}>
                    <TextField onChange={(e) => { dispatch({ type: "SET_ASSIGNMENT_TITLE", payload: e.target.value }) }} value={state.title} id="a_title" label="Assignment Title" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth
                        id="datetime-start"
                        label="Start Date Time"
                        type="datetime-local"
                        // defaultValue="2017-05-24T00:00"
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
                        // defaultValue="2020-01-24T00:00"
                        onChange={(e) => { dispatch({ type: "SET_ENDDATE", payload: new Date(e.target.value) }) }}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={(e) => { dispatch({ type: "SET_DURATION", payload: e.target.value }) }} value={state.duration} type="number" id="dur" label="Duration in minutes" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}>
                <TextField onChange={(e) => { dispatch({ type: "SET_CODETHRESHOLD", payload: e.target.value }) }} value={state.threshold} type="number" id="dur" label="Warnings Threshold Value" variant="outlined" fullWidth />
                    
                </Grid>
                {
                    state.problems.map((val, idx) => {
                        let probId = `prob-${idx + 1}`
                        return (
                            <Grid item xs={12}>

                                <Box border={1} padding={3}>
                                    <div key={idx}>
                                        <Grid container spacing={3} alignItems="center" border={1}>

                                            <Grid item xs={12}>
                                                <TextField onChange={(e) => { dispatch({ type: "ADD_PROBLEM_TITLE", payload: { PIndex: idx, title: e.target.value } }) }} value={val.title} id="probtitle" label="Problem title" variant="outlined" fullWidth />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField multiline onChange={(e) => { dispatch({ type: "ADD_STATEMENT", payload: { PIndex: idx, statement: e.target.value } }) }} value={val.statement} id="probsub" label="Problem Statement" variant="outlined" fullWidth />
                                            </Grid>
                                            {/* <Grid item xs={10}><TextField fullWidth
                                            label={"Languages" + idx}
                                            type="text"
                                            name={queId}
                                            data-id={idx}
                                            id={queId}
                                            value={val.question}
                                            onChange={(e) => dispatch({ type: "ADD_QUESTION", payload: { QIndex: idx, question: e.target.value } })}
                                            className="question-text"
                                            variant="outlined"
                                        /> */}
                                            <Grid item xs={12}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Pick Languages</FormLabel>
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                                control={
                                                                <Checkbox
                                                                    checked={state.problems[idx].languages.c}
                                                                    onChange={ (event) => { dispatch({ type: "SET_PROBLEM_LANGUAGES", payload: { PIndex: idx, lang: event.target.name, flag: event.target.checked} }) } }
                                                                    name="c"
                                                                />
                                                                }
                                                                label="c"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={state.problems[idx].languages.cpp}
                                                                    onChange={ (event) => { dispatch({ type: "SET_PROBLEM_LANGUAGES", payload: { PIndex: idx, lang: event.target.name, flag: event.target.checked} }) } }
                                                                    name="cpp"
                                                                />
                                                            }
                                                            label="cpp"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={state.problems[idx].languages.java}
                                                                    onChange={ (event) => { dispatch({ type: "SET_PROBLEM_LANGUAGES", payload: { PIndex: idx, lang: event.target.name, flag: event.target.checked} }) } }
                                                                    name="java"
                                                                />
                                                            }
                                                            label="java"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={state.problems[idx].languages.python}
                                                                    onChange={ (event) => { dispatch({ type: "SET_PROBLEM_LANGUAGES", payload: { PIndex: idx, lang: event.target.name, flag: event.target.checked} }) } }
                                                                    name="python"
                                                                />
                                                            }
                                                            label="python"
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        {
                                            state.problems[idx].testcases.map((v, TIdx) => {

                                                return (
                                                    <Grid container spacing={3} alignItems="center" border={1}>
                                                        <Grid item xs={12} spacing={3} key={TIdx}>
                                                            <TextField multiline fullWidth label={`Input: ${TIdx + 1}`} value={v.input} variant='outlined' onChange={(e) => { dispatch({ type: "ADD_TESTCASE_INPUT", payload: { PIndex: idx, TIndex: TIdx, input: e.target.value } }) }} /><br /><br />
                                                            <TextField multiline fullWidth label={`Output: ${TIdx + 1}`} value={v.output} variant='outlined' onChange={(e) => { dispatch({ type: "ADD_TESTCASE_OUTPUT", payload: { PIndex: idx, TIndex: TIdx, output: e.target.value } }) }} />
                                                        </Grid>
                                                    </Grid>

                                                )
                                            })
                                        }
                                    </div>
                                    < br />
                                    <Grid item xs={12}>
                                        <Button label="+Add TestCase" variant="outlined" onClick={() => addTestcase(idx)}>+ Add Test Case</Button>
                                    </Grid>
                                </Box>
                            </Grid>
                        )
                    })
                }


                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={addProblem}>+ Add Problem</Button>
                    {isLoading ? <CircularProgress /> : <Button type="submit" variant="contained" color="primary">Create Assignment</Button>}
                </Grid>
                <Grid container item xs={12} justify="center" alignItems="center">
                    {isBad ? <Alert severity="error"><AlertTitle>Error</AlertTitle>{errMessage}</Alert> : <></>}
                </Grid>
                <Grid container item justify="center" alignItems="center">
                    {isSuccess ? <Alert variant="filled" severity="success">POE Created!</Alert> : <></>}
                </Grid>
            </Grid>
        </form >
    );
}

export default CreateCodingQuetion;
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux';
import {TextField,Grid,Button,Checkbox,FormControlLabel} from '@material-ui/core';

const QuizCreator = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.quizCreator);

    const handleSubmit = (e) => {
        e.preventDefault();
		// Do Simple for Check

		// Sending Request to backend

		fetch("/quiz/addQuiz", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(state)
		}).then(data => data.json().then(
			console.log(data)
		)).catch(err => console.log(err))

    }

    const addQuestion = () => {
        dispatch({type: "ADD_QUESTION_TEMPLATE"});
    }
    const addOption = (QIndex) => {
        dispatch({type: "ADD_OPTION_TEMPLATE", payload:{QIndex}});
    }
    return(
        <form  onSubmit={handleSubmit} noValidate autoComplete="off" center="true" margin="20px">
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
						<TextField onChange = {(e)=> {dispatch({type:"SET_DURATION", payload: e.target.value})}} type="number" id="dur" label="Duration in minutes" variant="outlined" fullWidth/>
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
						<Button variant="outlined" type="submit">Submit</Button>
					</Grid>
				</Grid>
			</form>
    );
}

export default QuizCreator;
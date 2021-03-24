import React from "react"
import {TextField,Grid,Button,Checkbox} from '@material-ui/core';

class Quiz extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			quiz:{
				quizId: 0,
				subject: "",
				proctored: false,
				startDate: "01-01-21-12:00",
				endDate: "01-01-21-12:30",
				duration: 600000
			},
			questions:[{
						qNo: 0,
						qtype: 1,
						question: "Question?",
						options: [{op: "",ans: false}]
			}]
			
		}
		this.addOption = this.addOption.bind(this);
    }	

    addQuestion = (e) => {
		this.setState((prevState) => ({
			questions:[...prevState.questions,{qNo: 0,
                qtype: 1,
                question: "Question",
                options: [{qs: "",ans: false}]}]
		}));
	console.log(this.state);
	}

	addOption = (e,idx) => {
		// this.setState((idx,prevState) => ({
		// 	options:[...prevState.questions[0].options,{qs: "",ans: false}]
		// }));
	console.log("",this.state,idx,e);
	}
	
	handleSubmit = (e) => { e.preventDefault() }

    render() {
		let {questions}= this.state;
		let {options}=this.state.questions[0];
		return (
			<form  onSubmit={this.handleSubmit} noValidate autoComplete="off" center="true" margin="20px">
				<Grid container spacing={3} alignItems="center" style={{padding:50 ,backgroundColor:"beige"}}>
					<Grid item xs={12}>
						<TextField id="quizsub" label="Quiz Subject" variant="outlined" fullWidth/>
					</Grid>
					<Grid item xs={6}>
						<TextField fullWidth
							id="datetime-start"
							label="Start Date Time"
							type="datetime-local"
							defaultValue="2017-05-24T00:00"
							InputLabelProps={{
							shrink: true,}}/>
					</Grid>
					<Grid item xs={6}>
						<TextField fullWidth
							id="datetime-end"
							label="End Date Time"
							type="datetime-local"
							defaultValue="2020-01-24T00:00"
							InputLabelProps={{
							shrink: true,}}/>
					</Grid>
					<Grid item xs={6}>
						<TextField type="number" id="dur" label="Duration in minutes" variant="outlined" fullWidth/>
					</Grid>
						{
							questions.map((val, idx)=> {
								let queId = `que-${idx++}`
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
										className="question-text"
										variant="outlined"
										/>
										</Grid>
										<Grid item xs={2}>
										<Button label="+Add Option" variant="outlined" onClick={(e)=>{this.addOption(e,idx)}}>+ Add Option</Button>
										</Grid>
									</Grid>
									</div>
									</Grid>
								)
							})
						}
						{
							options.map((val, idx)=> {
								let optId = `opt-${++idx}`
								return (
									<div key={idx}>
										<Grid item xs={2}>
											<Checkbox
												label={"Option"+{idx}}
												color="primary"
												inputProps={{ 'aria-label': 'secondary checkbox' }}
											/>
										</Grid>
									</div>
								)
							})
						}
						<Button variant="outlined" onClick={this.addQuestion}>+ Add Question</Button>
					<Grid item xs={12}>
						<Button variant="outlined" type="submit">Submit</Button>
					</Grid>
				</Grid>
			</form>
		)
	}
}

export default Quiz
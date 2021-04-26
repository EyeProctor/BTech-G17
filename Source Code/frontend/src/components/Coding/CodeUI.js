import {useState, React} from 'react';
import {Typography, Grid, CircularProgress, AppBar, Modal, makeStyles, Divider } from '@material-ui/core';
import Editor from "@monaco-editor/react";
import Button from '@material-ui/core/Button';
import Run from '@material-ui/icons/PlayArrowRounded';
import Submit from '@material-ui/icons/PublishRounded';
import Note from '@material-ui/icons/NotesRounded';
import { useSelector } from 'react-redux';


const CodeUI = () => {
    const codeAssignmentQuestions = useSelector(state => state.coding);
    const [Code, setCode] = useState("print('Hi')");
    const [language, setLanguage] = useState("Python3");
    const [Output, setOutput] = useState("Type and Click on Run");
    const [isLoading, setLoading] = useState(false);

	// Use this for Changing Question Number later
	const totalQuestions = codeAssignmentQuestions.problems.length;
	const [currentQ,setCurrentQ] = useState(0);

    function fetchResult(sid) {
        fetch("/code/fetchResult",
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({sid})
            }
        ).then(
            (res) => res.json().then(resData => {
                if (resData.status === 'IN-QUEUE') {
                    return fetchResult(sid);
                }
                else if(resData.rntError){
					setOutput(resData.rntError);
				}
                else if(resData.cmpError){
					setOutput(resData.cmpError);
				}else{
                // setOutput(resData.output);
				if(codeAssignmentQuestions.problems[0].testcases[0].output === resData.output){
					setOutput("Test Case Passed");
				}else{
					setOutput("Test Case Failed");
				}
				}
                setLoading(false);
                return;
            })
        ).catch(err => console.log(err)).catch(err => { setLoading(false); setOutput("Server Error"); console.log(err)});
    }
    function SubmitForm(e) {
        setLoading(true);
        e.preventDefault();
        fetch("/code/compile",
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lang: language,
                    code: Code,
                    input: codeAssignmentQuestions.problems[0].testcases[0].input,
                    save: false
                })
            }
        ).then(
            (res) => res.json().then(resData => fetchResult(resData.sid))
        ).catch(err => console.log(err)).catch(err => console.log(err));
    }

	const useStyles = makeStyles((theme) => ({
		paper: {
			display: 'block',
			marginTop: '5vw',
			margin: 'auto',
			width: '55%',
			backgroundColor: '#182835',
			border: '2px solid #000',
			boxShadow: '0px 3px 1px #fec14e',
			padding: theme.spacing(2, 4, 3),
			color: '#fec14e',
			border: '3px solid white',
			borderRadius: '5pt',
			maxHeight: '500px',
			overflowY: 'auto',
		},
	}));

	const classes = useStyles();
	const [open, setOpen] = useState(false);
  
	const handleOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};

	// {/* Problem statement Stored here*/}
	// const pStitle = "Problem Statement Title"
	// const pSdesc = "This is the problem statement description\n*This text is just a placeholher";

	const body = (
		<div className={classes.paper}>
			<h2 id="title"><Note fontSize='medium'/>
				{codeAssignmentQuestions.title}
			</h2>
			<hr/><br/>

			<textarea className='PSBody' readOnly>
			{/* Problem statement description*/}
			{codeAssignmentQuestions.problems[0].statement + "\nSample Input: \n" + codeAssignmentQuestions.problems[0].testcases[0].input + "\nOutput: " + codeAssignmentQuestions.problems[0].testcases[0].output}
			</textarea>
		</div>
	);
	
    document.oncontextmenu = new Function("return false;");
    return (
        <div className='ch-container' style={{height:'auto'}}>
            <div style={{padding:'5px'}}>
				<AppBar position='static' className='Appbar'>
					<Grid container style={{justifyContent:'space-between',position:'relative'}}>
						<Grid item style={{display:'flex',justifyContent:'space-between'}}>
							<img src='logo_trans.png' className='logo' alt="Logo"/>
							<div style={{display:'inline-block',verticalAlign:'middle',textAlign:'center',color:'#fec14e'}}>
								<h1 style={{position:'relative',top:'50%',transform: 'translateY(-50%)'}}>Proctor</h1>
							</div>
						</Grid>
						<Grid item style={{display:'flex',justifyContent:'space-between'}}>
							<div style={{display:'block',color:'#fec14e'}}>
									<h3 style={{position:'relative',top:'50%',transform: 'translateY(-50%)',marginRight:'5px'}}>
										CODING GROUND v0.5
									</h3>
							</div>
						</Grid>
					</Grid>
					<Divider variant='inset'/>
					<div>
						<div class='options-btns'>
							<div className='buttonWrap'>
								<Button onClick={handleOpen}><Note fontSize='small' color='white'/> Problem Statement </Button>
							</div>

							<div style={{textAlign:'center'}}>
								<h5>Language</h5>
								<select style={{minWidth:'70px'}}
										value={language}
										onChange={(e)=>{setLanguage(e.target.value)}}
										label="Language">
									<option value={"C"}>C</option>
									<option value={"Cpp"}>C++</option>
									<option value={"Java"}>Java</option>
									<option value={"Python3"}>Python</option>
								</select>
							</div>

							<div className='buttonWrap'>
								{isLoading? <CircularProgress />:<Button type="submit" form='code' color="primary"><Run/>Run</Button>}
							</div>

							<div className='buttonWrap'>
								<Button form='code' color="primary"><Submit/>Submit</Button>
							</div>

							<Modal
								open={open}
								onClose={handleClose}
								aria-labelledby="simple-modal-title"
								aria-describedby="simple-modal-description">
								{body}
							</Modal>
						</div>
					</div>
				</AppBar >
			</div>
            
			<div style={{padding:'5px',display:'flex',textAlign:'center'}}>
				<div style={{height:'100%',flex:'1 0 60%'}}>
					<Typography variant='h5'style={{color:'#fec14e'}}> Code </Typography>
					<form id='code' onSubmit={SubmitForm}>
						<Editor
							value = {Code}
							onChange ={(e)=> {setCode(e)}}
							height='80vh'
							theme='vs-dark'
							defaultLanguage="java"
							fontSize = '30px'
							margin = 'auto'
							options = {{"fontSize": "19",autoIndent:"advanced"}}
						/>
					</form>
				</div>
				
				<div style={{height:'100%',flex:'1 1 40%',display:'flex',flexDirection:'column'}}>
					<Typography variant='h5' style={{color:'#00ff00'}}> Output </Typography>
					<div style={{display:'block',height:'max',flex:'1 0 100%'}}>
						<textarea
						onChange={(e) => setOutput(e.target.value)}
						value={Output}
						readOnly
						className = 'terminal-textArea'
						style = {{height:'530px', width:'100%',boxSizing:'border-box',flex:'1 1 100%'}}
						/>
					</div>
				</div>
			</div>
        </div>
    );
}

export default CodeUI;
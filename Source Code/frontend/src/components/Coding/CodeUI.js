import {useState, React, useEffect} from 'react';
import {Typography, Grid, CircularProgress, AppBar, Modal, makeStyles, Divider } from '@material-ui/core';
import Editor from "@monaco-editor/react";
import Button from '@material-ui/core/Button';
import Run from '@material-ui/icons/PlayArrowRounded';
import Submit from '@material-ui/icons/PublishRounded';
import Note from '@material-ui/icons/NotesRounded';
import { useDispatch, useSelector } from 'react-redux';
import Capture from '../quiz/Capture';
import blankProfile from '../quiz/blankProfile';
import * as faceapi from 'face-api.js';
import { confirmAlert } from 'react-confirm-alert';
import Countdown from 'react-countdown';
import {saveCodeSolution,submitCodeSolution} from '../../reducer/coding/codingSolution';

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
	
userIcon:{
	width: theme.spacing(12),
	height: theme.spacing(12),
	marginTop: theme.spacing(2),
	borderRadius: '3rem'
  }
}));


var remaining = 0;
const CodeUI = () => {
    const codeAssignmentQuestions = useSelector(state => state.coding);
	const codeSolution = useSelector(state => state.codeSolution);
	remaining = codeAssignmentQuestions.threshold - codeSolution.warnings;
    const [Code, setCode] = useState(codeSolution.solution[0]);
    const [language, setLanguage] = useState(codeSolution.language);
    const [Output, setOutput] = useState("Type and Click on Run \n1. Choose your language from DropDown\n2. For Java Use Class Name as Solution");
    const [isLoading, setLoading] = useState(false);
	const [testcaseCount, setTestCaseCount] = useState(0);
	const [failedCases, setFailedCases] = useState("");
	const endDate = codeSolution.startedAt + parseInt(codeAssignmentQuestions.duration)*60000;
	var gTC = 0;
	var inQueueCount = 0;
	const dispatch = useDispatch();

	useEffect(()=>{
		document.documentElement.requestFullscreen().catch((e) => {console.log(e)})
	},[])

	const handleCode = (e) => {
		dispatch({type: "SET_SOLUTION", payload: {pNO: currentQ, code: e}});
		setCode(e);
	}
	// Use this for Changing Question Number later
	const totalQuestions = codeAssignmentQuestions.problems.length;
	const [currentQ,setCurrentQ] = useState(0);

    function fetchResult(sid,i,tIn) {
		console.log("Index", i);
		setOutput("");
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
					inQueueCount += 1;
					if(inQueueCount < 20)
                    	return fetchResult(sid,i,tIn);
					else{
						setOutput("Error: Time Out");
					}
                }
                else if(resData.rntError){
					setOutput(resData.rntError);
				}
                else if(resData.cmpError){
					setOutput(resData.cmpError);
				}else{
                // setOutput(resData.output);
				if(codeAssignmentQuestions.problems[0].testcases[i].output === resData.output){
					gTC += 1;
					if(i===0)
						setOutput(`Case Passed\nYour Output: ${resData.output}`);
					else
						setOutput(Output + `\nCase Passed\nYour Output: ${resData.output}` + `\n ${gTC} / ${codeSolution.totalTestcases} Cases Passed`);
					setTestCaseCount(testcaseCount+1);
					dispatch({type: "SET_CORRECTTESTCASE", payload:gTC});
				}else{
					setOutput(Output + "\nTest Case Failed\nYour Output: "+ JSON.stringify({Output: resData.output}) + " for input: "+ codeAssignmentQuestions.problems[0].testcases[i].input);
					
				}
				}
                setLoading(false);
                return;
            })
        ).catch(err => console.log(err)).catch(err => { setLoading(false); setOutput("Server Error"); console.log(err)});
    }
    function SubmitForm(e) {
		setTestCaseCount(0);
        setLoading(true);
		setOutput("");
        e.preventDefault();
		gTC = 0;
		inQueueCount = 0;
        for (let index = 0; index < codeSolution.totalTestcases; index++) {
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
                    input: codeAssignmentQuestions.problems[0].testcases[index].input,
                    save: false
                })
            }
        ).then(
            (res) => res.json().then(resData => {fetchResult(resData.sid,index,gTC,codeAssignmentQuestions.problems[0].testcases[index].input)})
        ).catch(err => console.log(err)).catch(err => console.log(err));
			
		}
    }

	

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
	useEffect(()=>{
		dispatch(saveCodeSolution());
	},[Code,language,Output,language,dispatch])
	const submitCode = () => {
		if (window.confirm('Confirm Submission'))
			dispatch(submitCodeSolution());
		else{
			document.documentElement.requestFullscreen().catch((e) => {console.log(e); window.history.go(-1)})
		}
	}

	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
		  return <>Completed</>;
		} else {
		  // Render a countdown
		  return <span>{hours}:{minutes}:{seconds}</span>;
		}
	  };
    
    return (
        <div className='ch-container' style={{height:'auto'}}>
            <div style={{padding:'5px'}}>
				<AppBar position='static' className='Appbar'>
					<Grid container style={{justifyContent:'space-between',position:'relative'}}>
						<Grid item style={{display:'flex',justifyContent:'space-between'}}>
							<img src='/logo_trans.png' className='code-logo' alt="Logo"/>
							<div style={{display:'inline-block',verticalAlign:'middle',textAlign:'center',color:'#fec14e'}}>
								<h1 style={{position:'relative',top:'50%',transform: 'translateY(-50%)'}}>Proctor</h1>
							</div>
						</Grid>
						<Grid item style={{display:'flex',justifyContent:'space-between'}}>
							<div style={{display:'block',color:'#fec14e'}}>
									<h3 style={{position:'relative',top:'50%',transform: 'translateY(-50%)',marginRight:'5px'}}>
										Warnings : {codeSolution.warnings + ` Remaining: ${remaining} `} 
										<Countdown date={endDate} onComplete={()=> {dispatch(submitCodeSolution())}} />
									</h3>
							</div>
							<CodeCapture />
							
						</Grid>
					</Grid>
					<Divider variant='inset'/>
					<div>
						<div className='options-btns'>
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
								<Button onClick={submitCode} form='code' color="primary"><Submit/>Submit</Button>
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
							onChange ={handleCode}
							height='75vh'
							theme='vs-dark'
							defaultLanguage="java"
							fontSize = '30px'
							margin = 'auto'
							options = {{"fontSize": "19","autoIndent":"advanced","fontFamily":"dank mono"}}
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

const CodeCapture = () => {
	const classes = useStyles();
	const [imgSrc, setImgSrc] = useState(blankProfile);
	const userID = useSelector(state => state.auth.user.id);
	const quizID = useSelector(state => state.coding._id);
	const dispatch = useDispatch();
	const [Proctor, setProctor] = useState(false);

	function saveLog(img){
		const reqBody = {
		  image: img,
		  userID,
		  quizID
		}
  
		fetch('/quiz/malpracticeLog', {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(reqBody)
		}).then( data => {
		  console.log("Malpractice uploaded");
		}).catch(err => {
		  console.error(err);
		})
  
	  }


	function warn(message){
		confirmAlert({
		  title: 'Warning',
		  message: message,
		  buttons: [
			{
			  label: 'OK',
			  onClick: () => document.documentElement.requestFullscreen().catch((e) => {console.log(e); window.history.go(-1)})
			}
		  ]
		});
	  };
	const faceProcessingFunction = (faceData,img) => {
		if(faceData.length === 0){
		  warn("No Face Detected")
		  dispatch({type:"INCREMENT_CODEWARNING"});
		  dispatch(saveCodeSolution());
		  saveLog(img);
		  if(remaining < 1){
			dispatch(submitCodeSolution());
		  }
		}
		else if(faceData.length > 1){
		  warn("Multiple Face Detected");
		  dispatch({type:"INCREMENT_CODEWARNING"});
		  saveLog(img);
		  if(remaining < 1){
			dispatch(submitCodeSolution());
		  }
		}
	  }

	  const updateImgSrc = (img) => {
		setImgSrc(img);
		faceapi.detectAllFaces("codeImg", new faceapi.TinyFaceDetectorOptions()).then((data) => faceProcessingFunction(data,img)).catch((err)=> console.error(err))
	  }

	useEffect(()=>{
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
			faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
			faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
		]).then(()=> {
			setProctor(true);
			console.log(
			"Face API Started"
		  )}).catch((err) => console.log("Error Starting FACE API", err.message));
	},[])
	if(Proctor)
		return(
			<>
				<Capture setImgSrc={updateImgSrc}/>
				<img id="codeImg" src={imgSrc} className={classes.userIcon}/>
			</>

		);
	else
		return(<></>)
}


export default CodeUI;
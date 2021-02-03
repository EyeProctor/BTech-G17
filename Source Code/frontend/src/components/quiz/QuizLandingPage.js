import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {Component, createRef} from 'react';
import App from '../../App';
import {Button, CardContent} from '@material-ui/core'
import {Grid} from '@material-ui/core'
import Webcam from "react-webcam";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';




const QuizLandingPage = () => {

    return(
        <Router>
            <Switch>
                <Route path="/" exact component={WebCamScreen} />
                <Route path="/quiz" exact component={App} />
            </Switch>
        </Router>
        
    );
}




class WebCamScreen extends Component {
    // webcamRef: React.useRef(null),
    constructor(props) {
        super(props);
        this.state = {  webcamRef: createRef(null),
            videoConstraints: {facingMode: "user"},
        }
    }
    

    render() {
      return (
        <>
    <Grid container spacing={2}>

            <Grid item xs={6} style={{marginTop:100}}>
                <Card style={{marginLeft:150,marginRight:100,background:'#1e88e5'}}>
                    <CardContent style={{marginTop:15,color:'white'}}>
                    <Typography display="inline" variant="h5" style={{fontWeight:800}}>
                        Subject :
                    </Typography>

                    <Typography display="inline" variant="h5" style={{fontWeight:500,marginLeft:10}}>
                        Operating System
                    </Typography>
                    <br/>
                    <Typography display="inline" variant="h5" style={{fontWeight:800}}>
                        Time :
                    </Typography>

                    <Typography display="inline" variant="h5" style={{fontWeight:500,marginLeft:10}}>
                        10 Minutes
                    </Typography>
                    </CardContent>
                    </Card>
            </Grid>

            <Grid item xs={6}>
                    <Webcam  style={{width:550,marginTop:20}}
                    audio={false}
                    ref={this.state.webcamRef}
                    videoConstraints={this.state.videoConstraints}
                    />
                    <br/>
                    <Link style={{}} to="/quiz"><Button style={{background:'#03A9F4',color:'white',marginTop:10}}>Take Quiz</Button></Link>
                    {/* Capture Button can be triggered in Attempt quiz Button
                    <button onClick={capture}>Capture photo</button> */}
            
            </Grid>
            <hr/>
            <Grid item xs={12} style={{background:'#274056',paddingBottom:'25%'}}>
                <br/>

                    <Typography display="inline" variant="h5" style={{fontWeight:600,marginLeft:200,color:'white'}}>
                        Instructions :
                    </Typography>
                    <Typography style={{fontWeight:300,marginLeft:215,color:'white'}}>
                        <ul>
                        <li>Select an answer for every question. Unanswered questions will be scored as incorrect.</li>
                        <li>Timing - You will need to complete each of your attempts in one sitting, as you are allotted 10 minutes to complete each attempt.</li>
                        <li>Answers - You may review your answer-choices and compare them to the correct answers after your final attempt.</li>
                        <li>To start, click the "Take the Quiz" button. When finished, click the "Submit Quiz" button.</li>
                        <li>Click on the Submit button at the bottom of the page to have your answers graded.</li>
                        </ul>
                    </Typography>

            </Grid>

        </Grid>
        </>
      );
    }
}

export default QuizLandingPage;
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {Alert, AlertTitle} from '@material-ui/lab'
import Quiz from "./Quiz";
import { Button, Container, Grid } from "@material-ui/core";


const QuizWrapper = (props) => {
    const userID = props.match.params.userID;
	const quizID = props.match.params.quizID;
    const { finished } = useSelector(state => state.quizExtra)
    useEffect(
        () => {

            // FetCh QuizResult for UserID and QuizID
        }, []
    );
    if(finished)
        return(
            <QuizNotAvailable />
        );
    else
            return(
                <Quiz userID={userID} quizID={quizID} />
            )
}

const QuizNotAvailable = () => {

    useEffect(()=>{
    },[])
    
    return(
    <div className="center">
    <Container>
        <Grid container>
            <Grid item xs={12}>
                <Alert severity="warning">
                    <AlertTitle> Info </AlertTitle>
                    Quiz is already Submitted
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={()=>{ document.exitFullscreen(); window.history.go(-3)}}>
                    Click Here
                </Button>
            </Grid>
        </Grid>
    </Container>
    
</div>);
    }

export default QuizWrapper;
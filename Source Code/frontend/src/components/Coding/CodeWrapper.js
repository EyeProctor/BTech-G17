import { useEffect } from "react";
import { useSelector } from "react-redux";
import {Alert, AlertTitle} from '@material-ui/lab'
import CodeUI from './CodeUI';
import { Button, Container, Grid } from "@material-ui/core";


const CodeWrapper = () => {
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
                <CodeUI />
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
                    Test is already Submitted
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

export default CodeWrapper;
import { CircularProgress, Grid } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const MalpracticeGallary = (props) => {
    const quizID =  props.match.params.quizID;
    const userID =  props.match.params.userID;
    const [images, setImages] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [err,setErr] = useState(false);
    const history = useHistory();
    useEffect(()=>{
        // Query Data base for Images
        fetch(`/quiz/malpracticeLog/${userID}/${quizID}`).then(
            data => {
                data.json().then(resData =>{
                    setLoading(false);
                    if(data.msg){
                        setErr(true);
                    }else{
                        setImages(resData);
                        console.log(JSON.stringify(resData))
                    }
                })
            }
        ).catch(err => {
            setLoading(false);
            setErr(true);
            console.error(err);
        })
    },[]);
    if(isLoading)
        return(
            <div className="center">
                <CircularProgress />
            </div>
        );
    else if(err)
            return(
                <Alert onClose={()=>{history.go(-1)}} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Unauthorized Access or Server Error
                </Alert>
            );
    else
    return(
        <Grid container>
            {
                images.length === 0? <Alert severity="info" ><AlertTitle>Info</AlertTitle>No Images Present</Alert>:
                images.map((img) => {
                    const imgBuffer = Buffer.from(img.image.data);
                    return(
                        <Grid item xs={4}>
                            <img src={imgBuffer} alt="mal"/>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

export default MalpracticeGallary;
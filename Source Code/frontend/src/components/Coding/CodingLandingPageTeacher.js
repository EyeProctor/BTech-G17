import { AppBar, Grid } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import CustomBox from '../Helper/CustomBox';
import QuizDownload from '../quiz/QuizDownload';

const CodingLandingPageTeacher = (props) => {
    const codeID = props.match.params.codeID;
    const [codeData, setCodeData] = useState([]);
    useEffect( () => {
        fetch(`/code/getAll/${codeID}`)
         .then(data =>  data.json().then(res => {setCodeData(res);
         }))
         .catch(err => console.log(err));
     },[]);

    const poeObj =  useSelector(state => state.currentCourse.poes);
    console.log(poeObj);
    return(
        <>
            <div className='ch-container'>
            <div style={{padding:'5px'}}>
                <AppBar position='static' className='Appbar'>
                    <Grid container style={{justifyContent:'center',position:'relative'}}>
                        <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                            {poeObj[0].title}
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
                <Grid style={{marginTop: '10vh'}} container>
                    <Grid item xs={2}>
                        <QuizDownload codeData={codeData} subject={""} />
                    </Grid>
                    <Grid>
                        <CustomBox innerText="Delete POE" />
                    </Grid>
                    
                </Grid>
            </div>
        </>
    );
}

export default CodingLandingPageTeacher;
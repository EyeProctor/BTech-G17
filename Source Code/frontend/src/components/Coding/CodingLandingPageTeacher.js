import { AppBar, Container, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

const CodingLandingPageTeacher = (props) => {
    const codeID = props.match.params.codeID;
    console.log(codeID);
    const [codeAssignment, setCodeAssignment] = useState({});
    useEffect(()=>{
        fetch(`/code/getCodingAssignment/${codeID}`).then(data => data.json().then(resData =>{
            setCodeAssignment(resData);
        }


        ))

    },[])
    return(
        <Container maxWidth="xlg">
            <AppBar position='static' className='Appbar'>
                <Grid container style={{justifyContent:'center',position:'relative'}}>
                    <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                        {codeID}
                    </Grid>
                </Grid>
            </AppBar>
            <Grid container  style={{marginTop: "200"}}>
                <Grid item xs={12}>
                    {JSON.stringify(codeAssignment)}
                </Grid>
            </Grid>
        </Container>
    );
}


export default CodingLandingPageTeacher;
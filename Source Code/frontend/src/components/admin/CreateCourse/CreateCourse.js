import {TextField, FormControl, Select, MenuItem, InputLabel, Grid, Button, Box, CircularProgress, Container, AppBar} from '@material-ui/core'
import {Alert, AlertTitle} from '@material-ui/lab'
import {useState} from 'react';

const CreateCourse = () => {
    const [title, setTitle] = useState("");
    const [branch, setBranch] = useState("None");
    const [Class, setClass] = useState("None");
    const [sem, setSem] = useState("None");
    const [semInputList, setList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isBad,setBad] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const changeClass = (e) =>{
        const selectedVal = e.target.value;
        setClass(e.target.value);
        switch(selectedVal){
            case "FY":
                setList(["Sem 1", "Sem 2"]);
                break;
            
            case "SY":
                setList(["Sem 3", "Sem 4"]);
                break;
            
            case "TY":
                setList(["Sem 5", "Sem 6"]);
                break;
            
            case "Btech":
                setList(["Sem 7", "Sem 8"]);
                break;
            
            default:
                setList(["None"]);
                break;
            
        }
    }
    
    
    const handleSubmit = (e) => {
        setLoading(true);
        setErrMessage(false);
        setSuccess(false);
        e.preventDefault();
        const reqBody = {
            courseName: title,branch,Class,sem
        }

        console.log(JSON.stringify(reqBody))

        fetch(
            "/admin/createCourse",
            {
                method: "POST",
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            }
        ).then(
            response => response.json().then( data => {
                console.log(JSON.stringify(data));
                setLoading(false);
                if(data.msg){
                    setBad(true);
                    setErrMessage(data.msg);
                }else
                    setSuccess(true);
            })
        ).catch((err) => {
            console.error(err); 
            setLoading(false);
            setBad(true);
            setErrMessage("Bad Request");
        }
            );
    }
    return(
        <Container maxWidth="xlg">
            <AppBar position='static' className='Appbar'>
                <Grid container style={{justifyContent:'center',position:'relative'}}>
                    <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                        Create Course
                    </Grid>
                </Grid>
            </AppBar>
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container style={ {flexGrow: 1, marginTop: 25, padding: 10} } spacing={2}>
                    <Grid item xs={12} >
                        <TextField value={title} onChange={(e)=> setTitle(e.target.value)} fullWidth required label="Course Name" variant="outlined"/>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl required fullWidth variant="outlined">
                            <InputLabel id="branchDD" >Branch</InputLabel>
                            <Select value={branch} onChange={(e)=>{setBranch(e.target.value)}} labelId="branchDD" label="Branch">
                                <MenuItem value={"biotech"}>BioTech</MenuItem>
                                <MenuItem value={"civil"}>Civil</MenuItem>
                                <MenuItem value={"cse"}>CSE</MenuItem>
                                <MenuItem value={"electronics"}>Electronics</MenuItem>
                                <MenuItem value={"mech"}>Mechanical</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={4}>
                        <FormControl required fullWidth variant="outlined">
                            <InputLabel id="classDD">Class</InputLabel>
                            <Select value={Class} onChange={changeClass} labelId="classDD" label="Class">
                                <MenuItem value={"FY"}>First Year</MenuItem>
                                <MenuItem value={"SY"}>Second Year</MenuItem>
                                <MenuItem value={"TY"}>Third Year</MenuItem>
                                <MenuItem value={"Btech"}>Final Year</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl required fullWidth variant="outlined">
                            <InputLabel id="sem">Semester</InputLabel>
                            <Select value={sem} onChange={(e)=>{setSem(e.target.value)}} labelId="sem" label="Semester">
                            {
                                semInputList.map((option, key) => {
                                return (
                                    <MenuItem value={option} key={key}>
                                    {option}
                                    </MenuItem>
                                )
                                })
                            }
                            </Select>
                        </FormControl>
                        
                    </Grid>

                    <Grid container item justify="center" alignItems="center">
                        <Box mt={5}>
                        {isLoading ?<CircularProgress />:<Button type="submit" variant="contained" color="primary">Create Course</Button>}
                        </Box>
                    </Grid>
                    <Grid container item xs={12} justify="center" alignItems="center">
                            {isBad ?<Alert severity="error"><AlertTitle>Error</AlertTitle>{errMessage}</Alert>:<></>}
                    </Grid>
                    <Grid container item justify="center" alignItems="center">
                            {isSuccess ?<Alert variant="filled" severity="success">Course Created!</Alert>:<></>}
                    </Grid>


                </Grid>
            </form>
        </div>
        </Container>
    );
}

export default CreateCourse;
import {TextField, FormControl, Select, MenuItem, InputLabel, Grid, Button, Box, CircularProgress, Container, AppBar} from '@material-ui/core'
import {Alert, AlertTitle} from '@material-ui/lab'
import {useState} from 'react';

const CreateTeacher = () => {
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [middleName, setMName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [branch, setBranch] = useState("None");
    const [Class, setClass] = useState("None");
    const [isLoading, setLoading] = useState(false);
    const [isBad,setBad] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const handleSubmit = (e) => {
        setLoading(true);
        setErrMessage(false);
        setSuccess(false);
        e.preventDefault();

        const userName = lastName.toLowerCase() + "." + middleName.toLowerCase() + "." + firstName.toLowerCase();
        const password = "changeme";
        const userType = "Teacher";
        const teacherData = {
            firstName,middleName,lastName,branch
        }
        const studentData = {}
        const reqBody = {
            userName, email, password , userType, studentData , teacherData
        }

        console.log(JSON.stringify(reqBody));

        fetch(
            "/user/register",
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
            setErrMessage(JSON.stringify(err));
        }
            );

        
        
    }
    return(
        <Container maxWidth="xlg">
            <AppBar position='static' className='Appbar'>
                <Grid container style={{justifyContent:'center',position:'relative'}}>
                    <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                        Create Teacher
                    </Grid>
                </Grid>
            </AppBar>
            <div>
                <form onSubmit={handleSubmit}>
                    <Grid container style={ {flexGrow: 1, marginTop: 25, padding: 10} } spacing={2}>
                        <Grid item xs={4} >
                            <TextField value={firstName} onChange={(e)=> setFName(e.target.value)} fullWidth required label="First Name" variant="outlined"/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField value={middleName} onChange={(e)=>setMName(e.target.value)} fullWidth required label="Middle Name" variant="outlined"/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField value={lastName} onChange={(e)=> setLName(e.target.value) } fullWidth required label="Last Name" variant="outlined"/>
                        </Grid>
                    
                        <Grid item xs={4}>
                            <TextField value={email} onChange={(e)=>{setEmail(e.target.value)}} fullWidth required label="Email" variant="outlined"/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="number" fullWidth required label="Phone Number" variant="outlined"/>
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

                        <Grid container item justify="center" alignItems="center">
                            <Box mt={5}>
                            {isLoading ?<CircularProgress />:<Button type="submit" variant="contained" color="primary">Create Teacher</Button>}
                            </Box>
                        </Grid>
                        <Grid container item xs={12} justify="center" alignItems="center">
                                {isBad ?<Alert severity="error"><AlertTitle>Error</AlertTitle>{errMessage}</Alert>:<></>}
                        </Grid>
                        <Grid container item justify="center" alignItems="center">
                                {isSuccess ?<Alert variant="filled" severity="success">Teacher Created!</Alert>:<></>}
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default CreateTeacher;
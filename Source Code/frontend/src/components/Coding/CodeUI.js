import {useState,useEffect} from 'react';
import {Typography, FormControl, Select, MenuItem, InputLabel, Grid, CircularProgress, AppBar } from '@material-ui/core';
import Editor from "@monaco-editor/react";
import Button from '@material-ui/core/Button';


const CodeUI = () => {

    const [Code, setCode] = useState("print('Hi')");
    const [language, setLanguage] = useState("Java");
    const [Output, setOutput] = useState("Type and Click on Run");
    const [isLoading, setLoading] = useState(false);

    

    useEffect(() => {
        document.documentElement.requestFullscreen().catch((e) => {console.log(e)})
        
        //setStartDate( );
}, []);
    function fetchResult(sid) {
        fetch("/code/fetchResult",
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sid
                })
            }
        ).then(
            (res) => res.json().then(resData => {
                if (resData.status === 'IN-QUEUE') {
                    return fetchResult(sid);
                }
                
                setOutput(resData.output);
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
                    input: "",
                    save: false
                })
            }
        ).then(
            (res) => res.json().then(resData => fetchResult(resData.sid))
        ).catch(err => console.log(err)).catch(err => console.log(err));



    }
    document.oncontextmenu = new Function("return false;");
    return (
        <div className='ch-container'>
            <div style={{padding:'5px'}}>
                    <AppBar position='static' className='Appbar' style={{width:'98vw'}}>
                        <Grid container style={{justifyContent:'space-between',position:'relative'}}>
                            <Grid item style={{display:'flex',justifyContent:'space-between'}}>
                                <img src='logo_trans.png' className='logo'></img>
                                <div style={{display:'inline-block',verticalAlign:'middle',textAlign:'center',color:'#fec14e'}}>
                                    <h1 style={{position:'relative',top:'50%',transform: 'translateY(-50%)'}}>Proctor</h1>
                                </div>
                            </Grid>
                        </Grid>
                    </AppBar>
                </div>
        
            <form  onSubmit={SubmitForm}>
                <Grid style={{marginTop: '15vh'}} className="ch-container" container >
                    <Grid item xs={8}>
                        <Editor
                        value = {Code}
                        onChange ={(e)=> {setCode(e)}}
                        marginLeft='100px'
                        height='80vh'
                        theme='vs-dark'
                        defaultLanguage="Java"
                        fontSize = '30px'
                        options = {{"fontSize": "19"}}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Grid  container item direction="column" justify="center" alignItems="center">
                            <Grid item xs={12} fullWidth>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="language" style={{color:'white'}}>Language</InputLabel>
                                    <Select style={{color:'white',backgroundColor:'#4c5f7a',height:40}} value={language} onChange={(e)=>{setLanguage(e.target.value)}} labelId="language" label="Language">
                                        <MenuItem value={"C"}>C</MenuItem>
                                        <MenuItem value={"Cpp"}>Cpp</MenuItem>
                                        <MenuItem value={"Java"}>Java</MenuItem>
                                        <MenuItem value={"Python3"}>Python</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                 <Typography variant='subtitle1' style={{fontWeight:'bold'}} color="primary"> Problem Statement </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body1' style={{color:'white'}}> Write a Program to add 2 Numbers </Typography>
                            </Grid>
                            <Grid container item alignContents="center" alignItems="center" justify="center" >
                                <Grid item xs={12}>
                                    {isLoading? <CircularProgress />:<Button type="submit" color="primary">Run</Button>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button color="primary">Submit</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='subtitle1' color="secondary"> Output </Typography>
                            </Grid>
                            <Grid item >
                                <textarea onChange={(e) => setOutput(e.target.value)} value={Output}
                                readOnly
                                className = 'terminal-textArea'
                                rows="24"
                                cols = "40"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default CodeUI;
import {TextField,Grid,Button,Checkbox,FormControlLabel,Paper, CircularProgress} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Alert, AlertTitle} from '@material-ui/lab'


const style = {
                maxWidth:'40%',
                minWidth:'400px',
                padding:'30px' ,
                margin:'auto',
                marginTop:"5vh",
                // backgroundColor:'#4c5f7a',
                backgroundColor:'white',
                color:'black',
                textAlign:'center',
                borderRadius:'10pt',
                fontWeight:'bold'
            };

const Login = () =>  {
    
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isBad,setBad] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({ type:"RESET_STORE"});
    },[])

    function onSuccess(resData){
        setLoading(false);
        if(resData.msg){
            setBad(true);
            setErrMessage(resData.msg);
        }
        else{
            dispatch({type: "AUTHENTICATE", payload: resData});
            history.replace("/home");
        }
    }

    const handleSubmit = (e) => {
        setBad(false);
        setLoading(true);
        e.preventDefault();
        // alert(userName + " " + password);
        if(userName === "" || password === ""){
            setLoading(false);
            setBad(true);
            setErrMessage("Please Enter all the fields");
            return;
        }
        else{
            fetch(
                "/user/login",
                {
                    method: "POST",
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            userName,
                            password,
                        }
                    )
                }
            ).then(
                response => response.json().then( data => onSuccess(data))
            ).catch((err) => {console.error(err)});
        }
    }

    return(
        <form onSubmit={handleSubmit} style={{height:'100vh',width:'100vw', background: 'linear-gradient(135deg, #364755 50%, #182835 50%)',position:'absolute',top:'0',left:'0'}}>
            <img src="logo_trans.png" style={{maxWidth:'100px'}} />
            <div style={{display:'inline-block',position:'absolute',top:'30px',textAlign:'center',color:'#fec14e'}}>
                <h1>Proctor</h1>
            </div>
            <div style={style}>
                <Grid container spacing={8} alignItems="center">
                    <Grid item md={2} sm={true} xs={true}>
                        <h1>Login</h1>
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    {/* <Grid item md={3}>Username</Grid> */}
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField onChange={(e)=> {setUserName(e.target.value)}} value={userName} id="usrn" margin="normal" variant="outlined" label="Username" type="text" fullWidth required />

                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    {/* <Grid item md={3}>Password</Grid> */}
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField onChange={(e)=> {setPassword(e.target.value)}} value={password} id="pswd" margin="normal" variant="outlined" label="Password" type="password" fullWidth required />
     </Grid>
                </Grid>
                <Grid container alignItems="center" justify="space-between" style={{marginTop:'5vh'}}>
                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                color="secondary"
                            />
                        } label="Remember me" />
                    </Grid>
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '2%' }}>
                    <Grid item md={4} fullWidth>
                        {isLoading ?
                        <CircularProgress />
                        :<Button  type="submit" variant="contained" style={{ textTransform: "none", backgroundColor:"#fec14e",color:"white",minWidth:"100px",fontWeight:'bolder',fontSize:'medium',borderRadius:'5pt'}}>Login</Button>}
                        
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '2%' }}>
                    <Grid item md={4} fullWidth>
                        {isBad ?<Alert severity="error"><AlertTitle>Error</AlertTitle>{errMessage}</Alert>:<></>}
                    </Grid>
                </Grid>
                
            </div>
        </form>
    );
}

export default Login;
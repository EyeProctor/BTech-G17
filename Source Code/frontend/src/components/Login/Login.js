import {TextField,Grid,Button,Checkbox,FormControlLabel,Paper} from '@material-ui/core';
import logo from './logo_trans.png';

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
    return(
        <div style={{height:'100vh',width:'100vw', background: 'linear-gradient(135deg, #364755 50%, #182835 50%)',position:'absolute',top:'0',left:'0'}}>
            <img src={logo} style={{maxWidth:'100px'}} />
            <div style={style}>
                <Grid container spacing={8} alignItems="center">
                    <Grid item md={2} sm={true} xs={true}>
                        <h1>Login</h1>
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    {/* <Grid item md={3}>Username</Grid> */}
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField id="usrn" margin="normal" variant="outlined" label="Username" type="text" fullWidth required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    {/* <Grid item md={3}>Password</Grid> */}
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField id="pswd" margin="normal" variant="outlined" label="Password" type="password" fullWidth required />
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
                        <Button variant="contained" style={{ textTransform: "none", backgroundColor:"#fec14e",color:"white",minWidth:"100px",fontWeight:'bolder',fontSize:'medium',borderRadius:'5pt'}}>Login</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Login;
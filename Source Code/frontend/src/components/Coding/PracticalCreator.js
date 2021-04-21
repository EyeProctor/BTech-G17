import { AppBar, Button, Container, Grid, TextField } from "@material-ui/core";

const PracticalCreator = () => {
    return(
        <div className="primaryColor">
            <div style={{padding:'5px'}}>
                <AppBar position='static' className='Appbar'>
                    <Grid container style={{justifyContent:'center',position:'relative'}}>
                        <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                            Programming Question Creation
                        </Grid>
                    </Grid>
                </AppBar>
            </div>

            <form style={{marginTop: 10}}>
                <Container>
                    <Grid container spacing={2} >
                        <Grid item xs={12}> 
                            <TextField error={false} fullWidth variant="outlined" label="Title" onChange={(e)=>{console.log(e.target.value)}}/>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <TextField fullWidth variant="outlined" type="datetime-local" label="Start Date" InputLabelProps={{shrink: true,}}/>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <TextField fullWidth variant="outlined" type="datetime-local" label="End Date" InputLabelProps={{shrink: true,}}/>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <TextField fullWidth variant="outlined" type="number" label="Duration in Minutes" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant="outlined"  label="Problem Statement" multiline/>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField fullWidth variant="outlined"  label="Inputs" multiline/>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField fullWidth variant="outlined"  label="Outputs" multiline/>
                        </Grid>
                        <Grid item container xs={12} justify='center' alignContent="center" alignItems="center">
                            <Button  type="submit" variant="contained" color="primary">Create Practical</Button>
                        </Grid>
                    </Grid>
                </Container>
            </form>

        </div>
    );
}

export default PracticalCreator;
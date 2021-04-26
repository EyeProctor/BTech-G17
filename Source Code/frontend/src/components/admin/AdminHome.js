import {Button,Grid, Box, Container, AppBar} from '@material-ui/core'
import { useHistory } from "react-router-dom";
const AdminHome = () => {
    const history = useHistory();
    return(
        <Container maxWidth="xlg">
            <AppBar position='static' className='Appbar'>
                <Grid container style={{justifyContent:'center',position:'relative'}}>
                    <Grid item style={{fontSize:'30px',fontWeight:'bold',padding:'20px'}}>
                        Admin Home
                    </Grid>
                </Grid>
            </AppBar>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={6}>
                    <Box boxShadow={3} bgcolor="background.paper" onClick={() =>{history.push("/createStudent");}} m={2} p={3} style={{textAlign: "center"}}>
                        <Button>Create Student</Button>
                    </Box>
                </Grid>  
                <Grid item xs={6}>
                    <Box boxShadow={3} bgcolor="background.paper" onClick={() =>{history.push("/createTeacher");}} m={2} p={3}  style={{textAlign: "center"}}>
                        <Button>Create Teacher</Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box boxShadow={3} bgcolor="background.paper" onClick={() =>{history.push("/createCourse");}} m={2} p={3}  style={{textAlign: "center"}}>
                        <Button >Create Course</Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box boxShadow={3} bgcolor="background.paper" onClick={() =>{history.push("/assignCourse");}} m={2} p={3}  style={{textAlign: "center"}}>
                        <Button >Assign Course</Button>
                    </Box>
                </Grid>
                
            </Grid>
        </Container>
    );
}


export default AdminHome;
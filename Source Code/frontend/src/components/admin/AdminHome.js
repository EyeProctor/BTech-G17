import {Button,Grid, Box} from '@material-ui/core'
const AdminHome = () => {

    return(
        <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4}>
                <Box border={1} m={2} p={3}>
                    <Button onClick={() =>{
                        
                    }    
                    }>Create Student</Button>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box border={1} m={2} p={3}>
                    <Button>Create Teacher</Button>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box border={1} m={2} p={3}>
                    <Button>Create Course</Button>
                </Box>
            </Grid>
        </Grid>
    );
}


export default AdminHome;
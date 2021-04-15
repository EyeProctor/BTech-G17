import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import {Button} from '@material-ui/core';
import { useSelector } from 'react-redux';

const style = {
    maxWidth:'40%',
    minWidth:'400px',
    padding:'30px' ,
    margin:'auto',
    marginTop:"5vh",
    // backgroundColor:'#4c5f7a',
    backgroundColor:'white',
    color:'black',
    borderRadius:'10pt',
    fontWeight:'bold'
};

function StudentProfile(){

    const userData = useSelector(state => state.auth)
    const studentData = userData.studentDoc;

return (
    <form  style={{height:'100vh',width:'100vw', background: '#182835',position:'absolute',top:'0',left:'0'}}>
        <div style={style}>
        <h3>Profile</h3>    
        <Avatar style={{height:'12vh',width:'12vh',marginTop:'15px',marginLeft:'15vw'}}></Avatar>
        <br/>
        <Typography style={{marginLeft:'1vw',marginTop:'10px',fontSize:'20px',fontWeight:'bold'}} display='inline'>Name :</Typography>

        <Typography style={{ textTransform: 'capitalize', marginLeft:'1vw',marginTop:'10px',fontSize:'20px',fontWeight:'400'}} display='inline'>{`${studentData.firstName} ${studentData.middleName} ${studentData.lastName}`}</Typography>
        <br/>


        <Typography style={{marginLeft:'1vw',marginTop:'10px',fontSize:'20px',fontWeight:'bold'}} display='inline'>Email :</Typography>

        <Typography style={{  marginLeft:'1vw',marginTop:'10px',fontSize:'20px',fontWeight:'400'}} display='inline'>{userData.user.email}</Typography>

        <br/>


        <Typography style={{marginLeft:'1vw',marginTop:'10px',fontSize:'20px',fontWeight:'bold'}} display='inline'>Phone :</Typography>

        <Typography style={{marginLeft:'1vw',marginTop:'10px',fontSize:'20px',fontWeight:'400'}} display='inline'>1234567890</Typography>
        <br/>


        <Typography style={{marginLeft:'1vw',marginTop:'10px',fontSize:'20px',fontWeight:'bold'}} display='inline'>Branch :</Typography>

        <Typography style={{marginLeft:'1vw',marginTop:'10px',fontSize:'20px',fontWeight:'400'}} display='inline'>{studentData.branch.toUpperCase()}</Typography>

        <br/>


        <Typography style={{marginLeft:'1vw',marginTop:'10px',fontSize:'20px',fontWeight:'bold'}} display='inline'>Semester :</Typography>

        <Typography style={{marginLeft:'1vw',marginTop:'10px',fontSize:'20px',fontWeight:'400'}} display='inline'>{studentData.sem}</Typography>


        <br/>
        <br/>
        <Button variant="contained" style={{backgroundColor:"#fec14e",color:'white',textTransform: 'none',marginLeft:'12vw'}}>Change Password</Button>

        
    
            
        


    

    </div>
</form>
);
}
export default StudentProfile;
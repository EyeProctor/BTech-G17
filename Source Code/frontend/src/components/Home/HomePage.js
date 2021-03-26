import StudentHome from './Student/StudentHome';
import TeacherHome from './Teacher/TeacherHome';
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

const HomePage = () => {
    const history = useHistory();
    const user =  useSelector(state => state.auth.user);
    if(user === null)
    {   history.replace('/');
        return(<></>);
    }
    if(user.userType === "Student")
        return <StudentHome />
    else 
        return <TeacherHome />
}


export default HomePage;
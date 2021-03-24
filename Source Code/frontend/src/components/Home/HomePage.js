import StudentHome from './Student/StudentHome';
import TeacherHome from './Teacher/TeacherHome';
import { useSelector } from 'react-redux'

const HomePage = () => {
    const userType =  useSelector(state => state.auth.user.userType);
    if(userType === "Student")
        return <StudentHome />
    else 
        return <TeacherHome />
}


export default HomePage;
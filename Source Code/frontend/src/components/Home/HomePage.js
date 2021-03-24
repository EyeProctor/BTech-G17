import StudentHome from './Student/StudentHome';
import TeacherHome from './Teacher/TeacherHome';

const HomePage = (props) => {
    const userType = props;
    if(userType === "Student")
        return <StudentHome />
    else 
        return <TeacherHome />
}


export default HomePage;
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import QuizWrapper from "./components/quiz/QuizWrapper";
import HomePage from './components/Home/HomePage'
import CodeUI from './components/Coding/CodeUI';
import CreateCodingQuestion from './components/Coding/CreateCodingQuestion';
import Creator from './components/quiz/QuizCreation/QuizCreator'
import CreateRoom from './components/OE/CreateRoom'
import Room from "./components/OE/Room";
import AdminHome from "./components/admin/AdminHome"
import CreateStudent from './components/admin/CreateStudent/CreateStudent'
import CreateTeacher from './components/admin/CreateTeacher/CreateTeacher'
import CreateCourse from './components/admin/CreateCourse/CreateCourse'
import AssignCourse from './components/admin/CreateCourse/AssignCourse'
import Login from './components/Login/Login'
import CourseHome from './components/Home/Student/CourseHome'
import TeacherCourseHome from './components/Home/Teacher/TeacherCourse'
import QuizLandingPage from './components/quiz/QuizLandingPage';
import TempLanding from './components/quiz/TempLanding';
import TeacherQuizLanding from './components/quiz/TeacherQuizLanding';
import StudentProfile from './components/Profile/StudentProfile';
import TeacherProfile from './components/Profile/TeacherProfile';
import { Alert } from '@material-ui/lab';
import MalpracticeGallary from './components/quiz/MalpracticeGallary';
import CodingLandingPageStudent from './components/Coding/CodingLandingPageStudent';
import CodingLandingPageTeacher from './components/Coding/CodingLandingPageTeacher';

import Practice from './components/practice/practice';
function App() {
	return(
		<Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={HomePage} />

                {/* QUIZ */}
                <Route path="/course/quiz/:quizID" exact component={QuizLandingPage} />
                <Route path="/course/quiz/:quizID/:userID" exact component={TempLanding} />
                <Route path="/quiz/:quizID/:userID" exact component={QuizWrapper} />
                <Route path="/teacher/quiz/:quizID" exact component={TeacherQuizLanding} />
                <Route path="/teacher/quiz/malpractices/:quizID/:userID" exact component={MalpracticeGallary} />

                {/* Student */}
                <Route path="/student/profile" exact component={StudentProfile}/>
                <Route path="/course/:courseName" exact component={CourseHome} />
                <Route path="/student/poe/:codeID" exact component={CodingLandingPageStudent} />
                <Route path="/student/poe/:codeID/:userID" exact component={CodeUI} />

                {/* Video Calling */}
                <Route path="/OE" exact component={CreateRoom}/>
                <Route path="/room/:roomID" component={Room}/>

                {/* Create POE */}
                <Route path="/teacher/createPOE/:courseID" exact component={CreateCodingQuestion} />
                <Route path="/code" exact component={CodeUI} />
                <Route path="/test" exact component={Practice} />

                {/* Admin */}
                <Route path="/admin" exact component={AdminHome} />
                <Route path="/createStudent" exact component={CreateStudent} />
                <Route path="/createTeacher" exact component={CreateTeacher} />
                <Route path="/createCourse" exact component={CreateCourse} />
                <Route path="/assignCourse" exact component={AssignCourse} />

                {/* Teacher */}
                <Route path="/teacher/profile" exact component={TeacherProfile}/>
                <Route path="/course/teacher/:courseName" exact component={TeacherCourseHome} />
                <Route path="/teacher/createQuiz/:courseID" exact component={Creator} />
                <Route path="/teacher/poe/:codeID" exact component={CodingLandingPageTeacher} />
            </Switch>
        </Router>
	);
}

const CommingSoon = () => {
    return(
        <div className="ch-container">
    <Alert style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }} severity="error" > 404 Not Found </Alert>
  </div>
            
    );
}
export default App;

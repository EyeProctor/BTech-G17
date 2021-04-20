import quizReducer from './quiz/quiz';
import authReducer from './auth/authReducers';
import uiReducer from './UI/uiReducers';
import quizCreatorReducer from './quiz/quizCreator';
import courseReducer from './course/courseReducer';
import currentCourseReducer from './course/currentCourseReducer';
import createCodingReducer from './coding/createCodingQuestion';

import {combineReducers} from 'redux';


const appReducer = combineReducers({
    quiz: quizReducer,
    auth: authReducer,
    ui: uiReducer,
    quizCreator: quizCreatorReducer,
    CodingCreator: createCodingReducer,
    course: courseReducer,
    currentCourse: currentCourseReducer,
});

const allReducer = (state, action) => {
    if (action.type === "RESET_STORE") {
      state = undefined;
    }
    return appReducer(state, action)
  }

export default allReducer;
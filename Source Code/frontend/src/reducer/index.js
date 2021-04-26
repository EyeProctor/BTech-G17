import quizReducer from './quiz/quiz';
import authReducer from './auth/authReducers';
import uiReducer from './UI/uiReducers';
import quizCreatorReducer from './quiz/quizCreator';
import quizExtraReducer from './quiz/quizExtra';
import courseReducer from './course/courseReducer';
import currentCourseReducer from './course/currentCourseReducer';
import createCodingReducer from './coding/createCodingQuestion';
import codingReducer from './coding/codingReducer';

import {combineReducers} from 'redux';


const appReducer = combineReducers({
    quiz: quizReducer,
    auth: authReducer,
    ui: uiReducer,
    quizCreator: quizCreatorReducer,
    CodingCreator: createCodingReducer,
    course: courseReducer,
    currentCourse: currentCourseReducer,
    quizExtra: quizExtraReducer,
    coding: codingReducer,
});

const allReducer = (state, action) => {
    if (action.type === "RESET_STORE") {
      state = undefined;
    }
    return appReducer(state, action)
  }

export default allReducer;
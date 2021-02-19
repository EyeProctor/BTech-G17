import quizReducer from './quiz/quiz';
import authReducer from './auth/authReducers';

import {combineReducers} from 'redux';


const allReducer = combineReducers({
    quiz: quizReducer,
    auth: authReducer,

});

export default allReducer;
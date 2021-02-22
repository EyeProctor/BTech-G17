import quizReducer from './quiz/quiz';
import authReducer from './auth/authReducers';
import uiReducer from './UI/uiReducers';

import {combineReducers} from 'redux';


const allReducer = combineReducers({
    quiz: quizReducer,
    auth: authReducer,
    ui: uiReducer,

});

export default allReducer;
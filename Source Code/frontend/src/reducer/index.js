import quizReducer from './quiz/quiz';
import authReducer from './auth/authReducers';
import uiReducer from './UI/uiReducers';
import quizCreatorReducer from './quiz/quizCreator';

import {combineReducers} from 'redux';


const allReducer = combineReducers({
    quiz: quizReducer,
    auth: authReducer,
    ui: uiReducer,
    quizCreator: quizCreatorReducer,

});

export default allReducer;
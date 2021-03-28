import { StaticRouter } from "react-router";

var initialState = {
    quizID: null,
    userID: null,
    attempted: [],
    flagged: [],
    userChoices: null,
    startedAt: null,
    questions: null,

}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_USERCHOICES":
            return action.payload;
        case "SET_QUIZDATA":
            return {...state, questions: {...action.payload}}
        case "SET_STARTDATE":
            return {...state, startedAt: action.payload}
        case "QUIZ_RESET":
            return initialState;
        default:
           return state;
    }
}


export const saveUserChoices = () => async (dispatch, getState) => {
    const {userID, attempted,flagged, userChoices, startedAt, quizID , questions} = getState().quiz;
    const userData = {userID, quizID, attempted,flagged,userChoices,startedAt , questions};

    await fetch("/quiz/saveUserChoices", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });


}

export const fetchQuiz = ()=> async (dispatch, getState) => {
    const quizQuestions = await fetch("/user/getQuiz").then(data => data.json);
    dispatch({type: "SET_QUIZ", payload: quizQuestions});
}

export default quizReducer;
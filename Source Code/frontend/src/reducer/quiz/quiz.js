
var initialState = {
    quizID: null,
    userID: null,
    attempted: [],
    flagged: [],
    userChoices: null,
    startedAt: null,
    questions: null,
    warnings: 0,

}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_USERCHOICES":
            return action.payload;
        case "SET_QUIZDATA":
            return {...state, questions: {...action.payload}}
        case "SET_STARTDATE":
            return {...state, startedAt: action.payload}
        case "INCREMENT_WARNING":
            return {...state, warnings: state.warnings+1}
        case "QUIZ_RESET":
            return initialState;
        default:
           return state;
    }
}


export const saveUserChoices = () => async (dispatch, getState) => {
    const {userID, attempted,flagged, userChoices, startedAt, quizID , questions, warnings} = getState().quiz;
    const userData = {userID, quizID, attempted,flagged,userChoices,startedAt , questions, warnings};

    await fetch("/quiz/saveUserChoices", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });


}

export const autoSubmitQuiz = () => async (dispatch,getState) => {
    const {firstName, lastName, middleName} = getState().auth.studentDoc;
    const {userID, quizID, userChoices, questions} = getState().quiz;
		const quizName = getState().quiz.questions.subject;
		const startedAt = getState().quiz.startedAt;
		console.log("Auto Submitting");
		fetch('/quiz/submitQuiz',{
			method: "POST",
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({userID, qID: quizID, userChoices, questions: questions.questions, firstName, middleName, lastName, startedAt, quizName})
		 }).then(data => data.json().then(newData => {
			 if(newData.msg){
				 alert("Error");
			 }else{
				dispatch({type: "SET_QUIZAFINISHEDSTATUS",payload: true});
			 }
		 })).catch(err => console.log(err))
}

export const fetchQuiz = ()=> async (dispatch, getState) => {
    const quizQuestions = await fetch("/user/getQuiz").then(data => data.json);
    dispatch({type: "SET_QUIZ", payload: quizQuestions});
}

export default quizReducer;
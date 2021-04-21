const initialState = {
    available: true,
    attempting: false,
    finished: false
}
const quizExtraReducer = (state= initialState, action) => {

    switch (action.type) {
        case "SET_QUIZAVIALBLESTATUS":
            return {...state, available: action.payload};
        case "SET_QUIZATTEMPTINGSTATUS":
            return {...state, attempting: action.payload};
        case "SET_QUIZAFINISHEDSTATUS":
            return {...state, finished: action.payload};
        case "RESET_QUIZEXTRA":
            return initialState;
        default:
            return state;
    }
}

export default quizExtraReducer;
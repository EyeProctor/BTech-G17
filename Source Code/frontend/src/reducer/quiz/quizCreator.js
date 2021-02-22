const initialState = {
    subject: null,
    proctored: false,
    startDate: null,
    endData: null,
    duration: null,
    questions: []
}

var questionState = {
    qNo: null,
    qType: 1,
    question: null,
    options: []
}

var optionsState = {
    qs: null,
    ans: false
}

var QIndex, OIndex, QArray;

const quizCreatorReducer = (state= initialState, action) => {

    switch (action.type) {
        case "ADD_QUESTION_TEMPLATE":
            QArray = state.questions;
            const newQuestionState = {...questionState, qNo: QArray.length+1 }
            QArray.push(newQuestionState)
            return {...state, questions: QArray}

        case 'ADD_QUESTION':
            QArray = state.questions;
            QIndex = action.payload.QIndex;
            QArray[QIndex].question = action.payload.question;
            return {...state, questions: QArray}

        case "ADD_OPTION_TEMPLATE":
            QArray = state.questions;
            QIndex = action.payload.QIndex;
            QArray[QIndex].options.push({...optionsState})
            return {...state, questions: QArray}

        case 'ADD_OPTION':
            QArray = state.questions;
            QIndex = action.payload.QIndex;
            OIndex = action.payload.OIndex;
            QArray[QIndex].options[OIndex] = {...optionsState, qs: action.payload.option}
            return {...state, questions: QArray}
        
        case 'SET_ANSWER':
            QArray = state.questions;
            QIndex = action.payload.QIndex;
            OIndex = action.payload.OIndex;
            QArray[QIndex].options[OIndex] = {...optionsState, ans: true}
            return {...state, questions: QArray}
        default:
            return state;
    }
}

export default quizCreatorReducer;
const initialState = {
    subject: null,
    proctored: false,
    startDate: null,
    endDate: null,
    duration: null,
    questions: []
}

var questionState = {
    qNo: null,
    qType: 1,
    question: "",
    options: []
}

const optionsState = {
    qs: "",
    ans: false
};



var QIndex, OIndex, QArray;

const quizCreatorReducer = (state= initialState, action) => {

    switch (action.type) {
        case "ADD_QUESTION_TEMPLATE":
            QArray = [...state.questions];
            const newQuestionState = {...questionState, qNo: QArray.length+1 }
            QArray.push(newQuestionState)
            return {...state, questions: QArray}

        case 'ADD_QUESTION':
            QArray = [...state.questions];
            QIndex = action.payload.QIndex;
            QArray[QIndex].question = action.payload.question;
            return {...state, questions: QArray}

        case "ADD_OPTION_TEMPLATE":
            QArray = [...state.questions];
            var op = QArray[action.payload.QIndex]
            op.options = [...op.options, {qs: "",ans: false}]
            return {...state, questions: QArray}

        case 'ADD_OPTION':
            QArray = [...state.questions];
            QIndex = action.payload.QIndex;
            OIndex = action.payload.OIndex;
            QArray[QIndex].options[OIndex] = {...optionsState, qs: action.payload.option}
            return {...state, questions: QArray}
        
        case 'SET_ANSWER':
            QArray = [...state.questions];
            QIndex = action.payload.QIndex;
            OIndex = action.payload.OIndex;
            var op = QArray[QIndex]
            
            if(op.options[OIndex].ans){
                
                QArray[QIndex].options[OIndex].ans = false;
                return {...state, questions: QArray}
            }
            op.options.forEach(O => {
                if(O.ans){
                    O.ans = false;
                }
            });
            
            QArray[QIndex].options[OIndex] = {...op.options[OIndex], ans: true}
            return {...state, questions: QArray}
        
        case "SET_QUIZ_SUBJECT":
            return {...state, subject: action.payload}
        case "SET_STARTDATE":
            return {...state, startDate: action.payload}
        case "SET_ENDDATE":
            return {...state, endDate: action.payload}
        case "SET_DURATION":
            return {...state, duration: action.payload}
        default:
            return state;
    }
}

export default quizCreatorReducer;
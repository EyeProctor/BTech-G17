const initialState = {
    subject: "",
    problemStatement: "",
    startDate: "",
    endDate: "",
    duration: 10,
    inputs: "",
    outputs: "",
    
}


const codeCreatorReducer = (state=initialState, action) => {
    switch (action.type) {
        case "ADD_CODE_SUBJECT":
            return {...state, subject: action.payload}
        case "ADD_CODE_STATEMENT":
            return {...state, problemStatement: action.payload}
        case "ADD_CODE_STARTDATE":
            return {...state, startDate: action.payload}
        case "ADD_CODE_ENDDATE":
            return {...state, endDate: action.payload}
        case "ADD_CODE_DURATION":
            return {...state, endDate: action.payload}
        case "ADD_CODE_INPUTS":
            return {...state, inputs: action.payload}
        case "ADD_CODE_OUTPUTS":
            return {...state, outputs: action.payload}
    
        default:
            break;
    }
}
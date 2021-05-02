const initialState = {
    courseID: "",
    title: null,
    threshold: 0,
    startDate: null,
    endDate: null,
    duration: null,
    problems: []
}

var problemState = {
    title: "",
    statement: "",
    testcases: [],
    languages: {
        c: true,
        cpp: true,
        java: true,
        python: true
    }
}

const codingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CODING":
            return action.payload;
        default:
            return state;
    }
}

export default codingReducer;
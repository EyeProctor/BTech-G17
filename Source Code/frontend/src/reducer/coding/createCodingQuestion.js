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
        C: true,
        Cpp: true,
        Java: true,
        Python3: true
    }
}

const testState = {
    input: "",
    output: ""
}

var PIndex, TIndex, PArray;

const createCodingReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_CODING_COURSE":
            return { ...state, courseID: action.payload }

        case "ADD_PROBLEM_TEMPLATE":
            PArray = [...state.problems];
            const newProblemState = { ...problemState }
            PArray.push(newProblemState)
            return { ...state, problems: PArray }

        
        case "ADD_PROBLEM_TITLE":
            PArray = [...state.problems];
            PIndex = action.payload.PIndex;
            PArray[PIndex].title = action.payload.title;
            return { ...state, problems: PArray }

        case 'ADD_STATEMENT':
            PArray = [...state.problems];
            PIndex = action.payload.PIndex;
            PArray[PIndex].statement = action.payload.statement;
            return { ...state, problems: PArray }

        case "SET_PROBLEM_LANGUAGES":
            PArray = [...state.problems];
            PIndex = action.payload.PIndex;
            var key = action.payload.lang;
            PArray[PIndex].languages[key] = action.payload.flag;
            return { ...state, problems: PArray }

        case "ADD_TESTCASE_TEMPLATE":
            PArray = [...state.problems];
            var test = PArray[action.payload.PIndex]
            test.testcases = [...test.testcases, { input: "", output: "" }]
            return { ...state, problems: PArray }

        case 'ADD_TESTCASE_INPUT':
            PArray = [...state.problems];
            PIndex = action.payload.PIndex;
            TIndex = action.payload.TIndex;
            // PArray[PIndex].testcases[TIndex] = { ...testState, input: action.payload.input }
            PArray[PIndex].testcases[TIndex].input = action.payload.input;
            return { ...state, problems: PArray }

        case 'ADD_TESTCASE_OUTPUT':
            PArray = [...state.problems];
            PIndex = action.payload.PIndex;
            TIndex = action.payload.TIndex;
            // PArray[PIndex].testcases[TIndex] = { ...testState, output: action.payload.output }
            PArray[PIndex].testcases[TIndex].output = action.payload.output;
            return { ...state, problems: PArray }

        case "SET_ASSIGNMENT_TITLE":
            return { ...state, title: action.payload }
        case "SET_CODETHRESHOLD":
            return { ...state, threshold: action.payload }
        case "SET_STARTDATE":
            return { ...state, startDate: action.payload }
        case "SET_ENDDATE":
            return { ...state, endDate: action.payload }
        case "SET_DURATION":
            return { ...state, duration: action.payload }
        case "RESET_CODING_CREATION":
            return initialState;
        default:
            return state;
    }
}

export default createCodingReducer;
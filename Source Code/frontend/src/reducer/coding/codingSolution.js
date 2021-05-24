const initialState = {
    solution: [""],
    correctTestcases: 0,
    totalTestcases: 0,
    language: "Python3",
    startedAt: Date.now(),
    warnings: 0,
    startedAt: Date.now(),
    warnings: 0
}
const codingSolutionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SOLUTION":
            const problemNo = action.payload.pNO;
            const temp_Solution = state.solution;
            
            if(problemNo === 0)
                temp_Solution[0] = action.payload.code;

            else if(temp_Solution.length === (problemNo))
                temp_Solution.push(action.payload.code);

            else{
                for (let index = 0; index < temp_Solution.length - 1; index++)
                    temp_Solution.push("");
                temp_Solution[problemNo] = action.payload.code;
            }
            return {...state, solution: temp_Solution};
        case "SET_TOTALTESTCASE":
            return {...state, totalTestcases: action.payload};
        case "SET_CORRECTTESTCASE":
            return {...state, correctTestcases: action.payload};
        case "SET_SOLUTION_LANGUAGE":
            return {...state, language: action.payload};
        case "SET_STARTEDAT":
            return {...state, startedAt: action.payload};
        case "LOAD_CODESOLUTION":
            return action.payload;
        case "RESET_CODESOLUTION":
            return initialState;
        case "INCREMENT_CODEWARNING":
            const temp = state.warnings + 1;
            return {...state, warnings: temp}
        default:
            return state;
    }
}

export const saveCodeSolution = () => async (dispatch, getState) => {
    
    // Get Data 
    const userID = getState().auth.user.id;
    const codeID = getState().coding._id;
    const temp = getState().codeSolution;
    const solution = {...temp, userID,codeID};
    await fetch("/code/saveUserCode", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(solution)
    });


}

export const submitCodeSolution = () => async (dispatch, getState) => {
    
    // Get Data 
    const userID = getState().auth.user.id;
    const codeID = getState().coding._id;
    // const courseID = getState().coding.courseID;
    const finishedAt = Date().toString();
    const temp = getState().codeSolution;
    const solution = {...temp, userID,codeID, finishedAt};

    await fetch("/code/submitCodeSolution", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(solution)
    }).then((resData) =>{
        document.exitFullscreen();
        window.location.replace("/home");
    })


}

export default codingSolutionReducer;
const initialState = {
    solution: [],
    correctTestcases: null,
    totalTestcases: null,
    language: "",
    startedAt: null,
    warnings: 0,
    
}
const codingSolutionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SOLUTION":
            const problemNo = action.payload.pNO;
            const temp_Solution = state.solution;
            if(temp_Solution.length === (problemNo -1))
                temp_Solution.push(action.payload);
            else{
                for (let index = 0; index < temp_Solution.length - 1; index++)
                    temp_Solution.push({});
                temp_Solution[problemNo] = action.payload;
            }
            return {...state, solution: temp_Solution};
        case "SET_TOTALTESTCASE":
            return {...state, totalTestcases: action.payload};
        case "SET_CORRECTTESTCASE":
            return {...state, correctTestcases: action.payload};
        case "SET_SOLUTION_LANGUAGE":
            return {...state, language: action.payload};
        case "SET_STARTEDAT":
            return state;
        default:
            return initialState;
    }
}

export default codingSolutionReducer;
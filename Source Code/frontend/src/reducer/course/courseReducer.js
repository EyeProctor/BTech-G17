

const courseReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COURSES':
            return action.payload;
        default:
            return state;
    }
}

export default courseReducer;
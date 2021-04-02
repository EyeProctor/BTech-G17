

const currentCourseReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_COURSE':
            return action.payload;
        default:
            return state;
    }
}

export default currentCourseReducer;
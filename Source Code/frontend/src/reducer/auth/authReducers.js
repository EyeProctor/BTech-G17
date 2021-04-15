
var initialState = {
    user: null,
    token: null,
    isAutheticated: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            state = {...state, user: action.payload.user, token: action.payload.token, isAutheticated: true, teacherDoc: action.payload.teacherDoc , studentDoc: action.payload.studentDoc}
            localStorage.setItem("token", state.token);
            return state;
        default:
            return state;
    }
}

export default authReducer;

var initialState = {
    loading: true,
    fetching: false,
    fetched: false,
    err: null,
    fetch_err: false,
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_FETCHING':
            state = {...state, loading: true, fetching: true}
            return state;
        case 'FETCHED':
            return {...state, loading: false, fetching: false, fetched: true}
        case 'ERR_FETCHING':
            return {...state, loading: false, fetching: false, fetched: false, err: action.payload, fetch_err: true}
        case 'RESET_UI':
            return initialState;
        default:
            return state;
    }
}

export default uiReducer;
// HEADER CONFIG FUNCTION
export const  configFunction = (contentType, Authorization) => {
    const config = {
        headers: {
            "Content-type": contentType,
            "Authorization": Authorization,
        },
    };
    return config;
}
// REDUCER FUNCTION
export const reducerFunction = (state, action, REQUEST, SUCCESS, FAILURE) => {
    switch(action.type) {
        case REQUEST:
            return { ...state, loading: true };
        case SUCCESS:
            return { ...state, loading: false, success: true, data: action.payload };
        case FAILURE:
            return { ...state, loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

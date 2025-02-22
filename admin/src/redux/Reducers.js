import { CREATE_ACCOUNT_FAILURE, CREATE_ACCOUNT_REQUEST, CREATE_ACCOUNT_SUCCESS, CREATE_FIXTURE_FAILURE, CREATE_FIXTURE_REQUEST, CREATE_FIXTURE_SUCCESS, CREATE_TOURNAMENT_FAILURE, CREATE_TOURNAMENT_REQUEST, CREATE_TOURNAMENT_SUCCESS, DELETE_FIXTURE_FAILURE, DELETE_FIXTURE_REQUEST, DELETE_FIXTURE_SUCCESS, DELETE_TOURNAMENT_FAILURE, DELETE_TOURNAMENT_REQUEST, DELETE_TOURNAMENT_SUCCESS, FETCH_FIXTURES_FAILURE, FETCH_FIXTURES_REQUEST, FETCH_FIXTURES_ROUNDS_FAILURE, FETCH_FIXTURES_ROUNDS_REQUEST, FETCH_FIXTURES_ROUNDS_SUCCESS, FETCH_FIXTURES_SUCCESS, FETCH_TOURNAMENT_FAILURE, FETCH_TOURNAMENT_REQUEST, FETCH_TOURNAMENT_SUCCESS, FIXTURE_RESULTS_FAILURE, FIXTURE_RESULTS_REQUEST, FIXTURE_RESULTS_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, PROFILE_DETAILS_FAILURE, PROFILE_DETAILS_REQUEST, PROFILE_DETAILS_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SEND_EMAIL_FAILURE, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS, UPDATE_FIXTURE_FAILURE, UPDATE_FIXTURE_REQUEST, UPDATE_FIXTURE_SUCCESS, UPDATE_TOURNAMENT_FAILURE, UPDATE_TOURNAMENT_REQUEST, UPDATE_TOURNAMENT_SUCCESS } from "./Constants";
import { reducerFunction } from "../components/reusables/Functions";
// LOGIN
export const loginReducer = (state = { data: [] }, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, success: true, data: action.payload };
        case LOGIN_FAILURE:
            return { ...state, loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};
// LOGOUT
export const logoutReducer = (state = { data: [] }, action) => {
    switch(action.type) {
        case LOGOUT_REQUEST:
            return { ...state, loading: true };
        case LOGOUT_SUCCESS:
            return { ...state, loading: false, success: true, data: null };
        case LOGOUT_FAILURE:
            return { ...state, loading: false, success: false, data: null };
        default:
            return state;
    }
};
// CREATE ADMIN ACCOUNT 
export const createAdminAccountReducer = (state = { data: [] }, action) => {
   return reducerFunction(state, action, CREATE_ACCOUNT_REQUEST, CREATE_ACCOUNT_SUCCESS, CREATE_ACCOUNT_FAILURE);
};
// FORGOT PASSWORD
export const forgotPasswordReducer = (state = { data: [] }, action) => {
   return reducerFunction(state, action, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE );
};
// RESET PASSWORD
export const resetPasswordReducer = (state = { data: [] }, action) => {
    return reducerFunction( state, action, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE );
};
// PROFILE DETAILS
export const profileDetailsReducer = (state = { data: [] }, action) => {
    switch(action.type) {
        case PROFILE_DETAILS_REQUEST:
            return { ...state, loading: true };
        case PROFILE_DETAILS_SUCCESS:
            return { ...state, loading: false, success: true, data: action.payload };
        case PROFILE_DETAILS_FAILURE:
            return { ...state, loading: false, success: false, error: action.payload };
        default:
            return state;
    }
    // return reducerFunction( state, action, PROFILE_DETAILS_REQUEST, PROFILE_DETAILS_SUCCESS, PROFILE_DETAILS_FAILURE );
};
// FETCH TOURNAMENTS
export const fetchTournamentsReducer = (state = { data: [] }, action) => {
    return reducerFunction( state, action, FETCH_TOURNAMENT_REQUEST, FETCH_TOURNAMENT_SUCCESS, FETCH_TOURNAMENT_FAILURE );
};
// CREATE TOURNAMENT
export const createTournamentReducer = (state = { data: [] }, action) => {
    return reducerFunction( state, action, CREATE_TOURNAMENT_REQUEST, CREATE_TOURNAMENT_SUCCESS, CREATE_TOURNAMENT_FAILURE );
};
// UPDATE TOURNAMENT
export const updateTournamentReducer = (state = { data: [] }, action) => {
    return reducerFunction( state, action, UPDATE_TOURNAMENT_REQUEST, UPDATE_TOURNAMENT_SUCCESS, UPDATE_TOURNAMENT_FAILURE );
};
// DELETE TOURNAMENT
export const deleteTournamentReducer = (state = { data: [] }, action) => {
    return reducerFunction( state, action, DELETE_TOURNAMENT_REQUEST, DELETE_TOURNAMENT_SUCCESS, DELETE_TOURNAMENT_FAILURE );
};
// FETCH TOURNAMENT FIXTURES
export const fetchFixturesReducer = (state = { data: [] }, action) => {
    return reducerFunction( state, action, FETCH_FIXTURES_REQUEST, FETCH_FIXTURES_SUCCESS, FETCH_FIXTURES_FAILURE );
};
// FETCH TOURNAMENT FIXTURES ROUNDS
export const fetchFixturesRoundsReducer = (state = { data: [] }, action) => {
    return reducerFunction( state, action, FETCH_FIXTURES_ROUNDS_REQUEST, FETCH_FIXTURES_ROUNDS_SUCCESS, FETCH_FIXTURES_ROUNDS_FAILURE );
};
// CREATE TOURNAMENT FIXTURE
export const createFixtureReducer = (state = { data: [] }, action) => {
    return reducerFunction( state, action, CREATE_FIXTURE_REQUEST, CREATE_FIXTURE_SUCCESS, CREATE_FIXTURE_FAILURE );
};
// UPDATE TOURNAMENT FIXTURE
export const updateFixtureReducer = (state = { data: [] }, action) => {
    return reducerFunction( state, action, UPDATE_FIXTURE_REQUEST, UPDATE_FIXTURE_SUCCESS, UPDATE_FIXTURE_FAILURE );
};
// DELETE TOURNAMENT FIXTURE
export const deleteFixtureReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, DELETE_FIXTURE_REQUEST, DELETE_FIXTURE_SUCCESS, DELETE_FIXTURE_FAILURE );
};
// ADD TOURNAMENT FIXTURE RESULTS
export const addFixtureResultsReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, FIXTURE_RESULTS_REQUEST, FIXTURE_RESULTS_SUCCESS, FIXTURE_RESULTS_FAILURE );
};
// SEND EMAIL
export const sendEmailReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS, SEND_EMAIL_FAILURE );
};
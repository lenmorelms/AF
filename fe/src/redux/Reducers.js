import { reducerFunction } from "../components/reusables/Functions";
import { CREATE_LEAGUE_FAILURE, CREATE_LEAGUE_REQUEST, CREATE_LEAGUE_SUCCESS, DELETE_LEAGUE_FAILURE, DELETE_LEAGUE_REQUEST, DELETE_LEAGUE_SUCCESS, DELETE_PROFILE_FAILURE, DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, EDIT_LEAGUE_FAILURE, EDIT_LEAGUE_REQUEST, EDIT_LEAGUE_SUCCESS, EDIT_PREDICTION_FAILURE, EDIT_PREDICTION_REQUEST, EDIT_PREDICTION_SUCCESS, FINALS_FIXTURE_FAILURE, FINALS_FIXTURE_REQUEST, FINALS_FIXTURE_SUCCESS, FINALS_POINTS_FAILURE, FINALS_POINTS_REQUEST, FINALS_POINTS_SUCCESS, FINALS_PREDICT_FAILURE, FINALS_PREDICT_REQUEST, FINALS_PREDICT_SUCCESS, FIXTURES_FAILURE, FIXTURES_REQUEST, FIXTURES_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, JOIN_FINALS_TOURNAMENT_FAILURE, JOIN_FINALS_TOURNAMENT_REQUEST, JOIN_FINALS_TOURNAMENT_SUCCESS, JOIN_LEAGUE_FAILURE, JOIN_LEAGUE_REQUEST, JOIN_LEAGUE_SUCCESS, JOIN_TOURNAMENT_FAILURE, JOIN_TOURNAMENT_REQUEST, JOIN_TOURNAMENT_SUCCESS, LEAGUE_RANKS_FAILURE, LEAGUE_RANKS_REQUEST, LEAGUE_RANKS_SUCCESS, LEAGUES_FAILURE, LEAGUES_REQUEST, LEAGUES_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, OPT_OUT_FAILURE, OPT_OUT_LEAGUE_FAILURE, OPT_OUT_LEAGUE_REQUEST, OPT_OUT_LEAGUE_SUCCESS, OPT_OUT_REQUEST, OPT_OUT_SUCCESS, PREDICT_FAILURE, PREDICT_REQUEST, PREDICT_SUCCESS, PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESEND_CODE_FAILURE, RESEND_CODE_REQUEST, RESEND_CODE_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, TOURNAMENT_FAILURE, TOURNAMENT_POINTS_FAILURE, TOURNAMENT_POINTS_REQUEST, TOURNAMENT_POINTS_SUCCESS, TOURNAMENT_REQUEST, TOURNAMENT_ROUNDS_FAILURE, TOURNAMENT_ROUNDS_REQUEST, TOURNAMENT_ROUNDS_SUCCESS, TOURNAMENT_SUCCESS, TOURNAMENT_TABLE_FAILURE, TOURNAMENT_TABLE_REQUEST, TOURNAMENT_TABLE_SUCCESS, TOURNAMENTS_FAILURE, TOURNAMENTS_REQUEST, TOURNAMENTS_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, USERDATA_FAILURE, USERDATA_REQUEST, USERDATA_SUCCESS, VERIFY_FAILURE, VERIFY_REQUEST, VERIFY_SUCCESS } from "./Constants";

// USERDATA
export const getUserDataReducer = (state = { data: [] }, action) => {
    switch(action.type) {
        case USERDATA_REQUEST:
            return { ...state, loading: true, error: null };
        case USERDATA_SUCCESS:
            return { ...state, loading: false, success: true, data: action.payload };
        case USERDATA_FAILURE:
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
// PROFILE
export const profileReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE);
};
// UPDATE PROFILE
export const updateProfileReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE);
};
// DELETE PROFILE
export const deleteProfileReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, DELETE_PROFILE_FAILURE);
};
// REGISTER
export const registerReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE);
};
// FORGOT PASSWORD
export const forgotPasswordReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE);
};
// RESET PASSWORD
export const resetPasswordReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE);
};
// RESEND VERIFICATION CODE
export const resendCodeReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, RESEND_CODE_REQUEST, RESEND_CODE_SUCCESS, RESEND_CODE_FAILURE);
};
// VERIFY ACCOUNT
export const verifyReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, VERIFY_REQUEST, VERIFY_SUCCESS,VERIFY_FAILURE);
};
// TOURNAMENTS
export const tournamentsReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, TOURNAMENTS_REQUEST, TOURNAMENTS_SUCCESS, TOURNAMENTS_FAILURE);
};
export const tournamentReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, TOURNAMENT_REQUEST, TOURNAMENT_SUCCESS, TOURNAMENT_FAILURE);
};
// JOIN TOURNAMENT
export const joinTournamentReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, JOIN_TOURNAMENT_REQUEST, JOIN_TOURNAMENT_SUCCESS, JOIN_TOURNAMENT_FAILURE);
};
export const joinFinalsTournamentReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, JOIN_FINALS_TOURNAMENT_REQUEST, JOIN_FINALS_TOURNAMENT_SUCCESS, JOIN_FINALS_TOURNAMENT_FAILURE);
};
// OPT OUT OF TOURNAMENT
export const optOutTournamentReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, OPT_OUT_REQUEST, OPT_OUT_SUCCESS, OPT_OUT_FAILURE);
};
// PLAYER POINTS
export const playerPointsReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, TOURNAMENT_POINTS_REQUEST, TOURNAMENT_POINTS_SUCCESS, TOURNAMENT_POINTS_FAILURE);
}
// TOURNAMENT POINTS
export const tournamentPointsReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, TOURNAMENT_POINTS_REQUEST, TOURNAMENT_POINTS_SUCCESS, TOURNAMENT_POINTS_FAILURE);
};
export const finalsPointsReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, FINALS_POINTS_REQUEST, FINALS_POINTS_SUCCESS, FINALS_POINTS_FAILURE);
};
// TOURNAMENT TABLE
export const tournamentTableReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, TOURNAMENT_TABLE_REQUEST, TOURNAMENT_TABLE_SUCCESS, TOURNAMENT_TABLE_FAILURE);
};
// TOURNAMENT ROUNDS
export const tournamentRoundsReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, TOURNAMENT_ROUNDS_REQUEST, TOURNAMENT_ROUNDS_SUCCESS, TOURNAMENT_ROUNDS_FAILURE);
};
// FIXTURES
export const fixturesReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, FIXTURES_REQUEST, FIXTURES_SUCCESS, FIXTURES_FAILURE);
};
export const finalsFixtureReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, FINALS_FIXTURE_REQUEST, FINALS_FIXTURE_SUCCESS, FINALS_FIXTURE_FAILURE);
};
// PREDICT
export const predictReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, PREDICT_REQUEST, PREDICT_SUCCESS, PREDICT_FAILURE);
};
export const finalsPredictReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, FINALS_PREDICT_REQUEST, FINALS_PREDICT_SUCCESS, FINALS_PREDICT_FAILURE);
};
// EDIT PREDICTION
export const editPredictionReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, EDIT_PREDICTION_REQUEST, EDIT_PREDICTION_SUCCESS, EDIT_PREDICTION_FAILURE);
};
// LEAGUES
export const leaguesReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, LEAGUES_REQUEST, LEAGUES_SUCCESS, LEAGUES_FAILURE);
};
// LEAGUE RANKS
export const leagueRanksReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, LEAGUE_RANKS_REQUEST, LEAGUE_RANKS_SUCCESS, LEAGUE_RANKS_FAILURE);
};
// CREATE LEAGUE
export const createLeagueReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, CREATE_LEAGUE_REQUEST, CREATE_LEAGUE_SUCCESS, CREATE_LEAGUE_FAILURE);
};
// EDIT LEAGUE
export const editLeagueReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, EDIT_LEAGUE_REQUEST, EDIT_LEAGUE_SUCCESS, EDIT_LEAGUE_FAILURE);
};
// DELETE LEAGUE
export const deleteLeagueReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, DELETE_LEAGUE_REQUEST, DELETE_LEAGUE_SUCCESS, DELETE_LEAGUE_FAILURE);
};
// JOIN LEAGUE
export const joinLeagueReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, JOIN_LEAGUE_REQUEST, JOIN_LEAGUE_SUCCESS, JOIN_LEAGUE_FAILURE);
};
// OPT OUT OF LEAGUE
export const optOutLeagueReducer = (state = { data: [] }, action) => {
    return reducerFunction(state, action, OPT_OUT_LEAGUE_REQUEST, OPT_OUT_LEAGUE_SUCCESS, OPT_OUT_LEAGUE_FAILURE);
};
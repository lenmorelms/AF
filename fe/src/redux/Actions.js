import axios from "axios";
import { configFunction } from "../components/reusables/Functions";
import { CREATE_LEAGUE_FAILURE, CREATE_LEAGUE_REQUEST, CREATE_LEAGUE_SUCCESS, DELETE_LEAGUE_FAILURE, DELETE_LEAGUE_REQUEST, DELETE_LEAGUE_SUCCESS, DELETE_PROFILE_FAILURE, DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, FIXTURES_FAILURE, FIXTURES_REQUEST, FIXTURES_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, JOIN_LEAGUE_FAILURE, JOIN_LEAGUE_REQUEST, JOIN_LEAGUE_SUCCESS, JOIN_TOURNAMENT_FAILURE, JOIN_TOURNAMENT_REQUEST, JOIN_TOURNAMENT_SUCCESS, LEAGUE_RANKS_FAILURE, LEAGUE_RANKS_REQUEST, LEAGUE_RANKS_SUCCESS, LEAGUES_FAILURE, LEAGUES_REQUEST, LEAGUES_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, OPT_OUT_FAILURE, OPT_OUT_REQUEST, OPT_OUT_SUCCESS, PREDICT_FAILURE, PREDICT_REQUEST, PREDICT_SUCCESS, PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESEND_CODE_FAILURE, RESEND_CODE_REQUEST, RESEND_CODE_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, TOURNAMENT_FAILURE, TOURNAMENT_POINTS_FAILURE, TOURNAMENT_POINTS_REQUEST, TOURNAMENT_POINTS_SUCCESS, TOURNAMENT_REQUEST, TOURNAMENT_ROUNDS_FAILURE, TOURNAMENT_ROUNDS_REQUEST, TOURNAMENT_ROUNDS_SUCCESS, TOURNAMENT_SUCCESS, TOURNAMENT_TABLE_FAILURE, TOURNAMENT_TABLE_REQUEST, TOURNAMENT_TABLE_SUCCESS, TOURNAMENTS_FAILURE, TOURNAMENTS_REQUEST, TOURNAMENTS_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, VERIFY_FAILURE, VERIFY_REQUEST, VERIFY_SUCCESS } from "./Constants"
const serverUrl = "https://afripredictor-server.onrender.com";
// const serverUrl = "http://127.0.0.1:5000";
// PROFILE
export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({ type: LOGIN_REQUEST });
        const config = configFunction("application/json");
        const response = await axios.post(`${serverUrl}/api/users/login`, {email, password}, config);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user)); 
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};
// export const logout = () => async(dispatch) => {
//     try {
//         dispatch({ type: LOGOUT_REQUEST });
//         const token = localStorage.getItem("token");
//         const config = configFunction("application/json", `Bearer ${token}`);
//         const response = await axios.post(`${serverUrl}/api/users/logout`, config);
//         localStorage.clear();
//         dispatch({ type: LOGOUT_SUCCESS, payload: response.data });
//     } catch (error) {
//         dispatch({ type: LOGOUT_FAILURE, payload: error.message });
//     }
// };
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_REQUEST });
        
        // Clear local storage first
        localStorage.clear();

        // Get the token from local storage (though it's already cleared above)
        const token = localStorage.getItem("token");

        // Config for the axios request
        const config = configFunction("application/json", `Bearer ${token}`);

        // Call the API with the correct parameters
        const response = await axios.post(`${serverUrl}/api/users/logout`, {}, config);

        // Dispatch the success action
        dispatch({ type: LOGOUT_SUCCESS, payload: response.data });

    } catch (error) {
        // Dispatch the failure action
        dispatch({ type: LOGOUT_FAILURE, payload: error.message });
    }
};
export const register = (email, username, country, password, isAdmin) => async(dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST});
        const config = configFunction("application/json", "");
        const response = await axios.post(`${serverUrl}/api/users/register`, {email, username, country, password, isAdmin}, config);
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
};
export const forgotPassword = (email) => async(dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const config = configFunction("application/json");
        const response = await axios.patch(`${serverUrl}/api/users/forgot-password`, {email}, config);
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
    }
};
export const resetPassword = (vToken, password) => async(dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = configFunction("application/json");
        const response = await axios.patch(`${serverUrl}/api/users/reset-password/${vToken}`, {password}, config);
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
    }
};
export const verify = (verificationToken) => async(dispatch) => {
    try {
        dispatch({ type: VERIFY_REQUEST });
        const config = configFunction("application/json");
        console.log('Sending verification token:', verificationToken);
        const response = await axios.put(`${serverUrl}/api/users/verify`, {verificationToken}, config);
        console.log('Sending verification token:', serverUrl);
        dispatch({ type: VERIFY_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: VERIFY_FAILURE, payload: error.message });
    }
};
export const resendCode = (id) => async(dispatch) => {
    try {
        dispatch({ type: RESEND_CODE_REQUEST });
        const config = configFunction("application/json");
        const response = await axios.get(`${serverUrl}/api/users/resend-code/${id}`, config);
        dispatch({ type: RESEND_CODE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: RESEND_CODE_FAILURE, payload: error.message });
    }
};
export const profile = () => async(dispatch) => {
    try {
        dispatch({ type: PROFILE_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/users/profile`, config);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        dispatch({ type: PROFILE_SUCCESS, payload: response.data.user });
    } catch (error) {
        dispatch({ type: PROFILE_FAILURE, payload: error.message });
    }
};
export const updateProfile = (id, password) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.put(`${serverUrl}/api/users/profile/${id}`, {password}, config);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
    }
};
export const deleteProfile = (id) => async(dispatch) => {
    try {
        dispatch({ type: DELETE_PROFILE_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.delete(`${serverUrl}/api/users/profile/${id}`, config);
        localStorage.clear();
        dispatch({ type: DELETE_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DELETE_PROFILE_FAILURE, payload: error.message });
    }
};
// LEAGUE
export const leagues = () => async(dispatch) => {
    try {
        dispatch({ type: LEAGUES_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/leagues`, config);
        dispatch({ type: LEAGUES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAGUES_FAILURE, payload: error.message });
    }
};
export const tournamentLeagues = (id) => async(dispatch) => {
    try {
        dispatch({ type: LEAGUES_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/leagues/tournament/${id}`, config);
        dispatch({ type: LEAGUES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAGUES_FAILURE, payload: error.message });
    }
};
export const playerTournamentLeagues = (tournamentId) => async(dispatch) => {
    try {
        dispatch({ type: LEAGUES_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/leagues/tournament/${tournamentId}/player`, config);
        dispatch({ type: LEAGUES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAGUES_FAILURE, payload: error.message });
    } 
}
export const playerTournamentLeagueRanks = (tournamentId, playerTeam, leagues) => async(dispatch) => {
    try {
        dispatch({ type: LEAGUE_RANKS_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.post(`${serverUrl}/api/leagues/ranks/${tournamentId}/player`, {playerTeam, leagues}, config);
        dispatch({ type: LEAGUE_RANKS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAGUE_RANKS_FAILURE, payload: error.message });
    } 
}
export const league = (id) => async(dispatch) => {
    try {
        dispatch({ type: LEAGUES_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/leagues/${id}`, config);
        dispatch({ type: LEAGUES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAGUES_FAILURE, payload: error.message });
    }
};
export const deleteLeagues = (id) => async(dispatch) => {
    try {
        dispatch({ type: DELETE_LEAGUE_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.delete(`${serverUrl}/api/leagues/${id}`, config);
        dispatch({ type: DELETE_LEAGUE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DELETE_LEAGUE_FAILURE, payload: error.message });
    }
};
export const createLeague = (tournamentId, userId, name) => async(dispatch) => {
    try {
        dispatch({ type: CREATE_LEAGUE_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.post(`${serverUrl}/api/leagues/${tournamentId}/${userId}`, { name }, config);
        dispatch({ type: CREATE_LEAGUE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_LEAGUE_FAILURE, payload: error.message });
    }
};
export const joinLeague = (leagueCode) => async(dispatch) => {
    try {
        dispatch({ type: JOIN_LEAGUE_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.put(`${serverUrl}/api/leagues/${leagueCode}/join`, config);
        dispatch({ type: JOIN_LEAGUE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: JOIN_LEAGUE_FAILURE, payload: error.message });
    }
};
// TOURNAMENTS
export const tournament = (id) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments/${id}`, config);
        dispatch({ type: TOURNAMENT_SUCCESS, payload: response.data.tournament });
    } catch (error) {
        dispatch({ type: TOURNAMENT_FAILURE, payload: error.message });
    }
};
export const tournaments = () => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENTS_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments`, config);
        dispatch({ type: TOURNAMENTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: TOURNAMENTS_FAILURE, payload: error.message });
    }
};
export const joinTournament = (id, userId, username, tournament, team) => async(dispatch) => {
    try {
        dispatch({ type: JOIN_TOURNAMENT_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.put(`${serverUrl}/api/tournaments/player/join/${id}`, { userId, username, tournament, team}, config);
        localStorage.setItem('userData', JSON.stringify(response.data.updatedUser));
        dispatch({ type: JOIN_TOURNAMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: JOIN_TOURNAMENT_FAILURE, payload: error.message });
    }
};
export const optOutTournament = (id) => async(dispatch) => {
    try {
        dispatch({ type:  OPT_OUT_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.put(`${serverUrl}/api/tournaments/player/${id}`, config);
        dispatch({ type: OPT_OUT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: OPT_OUT_FAILURE, payload: error.message });
    }
};
export const playerPoints = (id) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_POINTS_REQUEST});
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments/player/points/${id}`, config);
        dispatch({ type: TOURNAMENT_POINTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: TOURNAMENT_POINTS_FAILURE, payload: error.message });
    }
};
export const tournamentTable = (id) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_TABLE_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments/player/table/${id}`, config);
        dispatch({ type: TOURNAMENT_TABLE_SUCCESS, payload: response.data.tournamentLeaderboard });
    } catch (error) {
        dispatch({ type: TOURNAMENT_TABLE_FAILURE, payload: error.message });
    }
};
export const tournamentTeamTable = (id, team) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_TABLE_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments/player/team/table/${id}/${team}`, config);
        dispatch({ type: TOURNAMENT_TABLE_SUCCESS, payload: response.data.tournamentLeaderboard });
    } catch (error) {
        dispatch({ type: TOURNAMENT_TABLE_FAILURE, payload: error.message });
    }
};
export const tournamentLeagueTable = (id, leagueId) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_TABLE_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments/player/league/table/${id}/${leagueId}`, config);
        dispatch({ type: TOURNAMENT_TABLE_SUCCESS, payload: response.data.tournamentLeaderboard });
    } catch (error) {
        dispatch({ type: TOURNAMENT_TABLE_FAILURE, payload: error.message });
    }
};
// PREDICTIONS
export const tournamentRounds = (id) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_ROUNDS_REQUEST  });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/predictions/${id}/rounds`, config);
        dispatch({ type: TOURNAMENT_ROUNDS_SUCCESS, payload: response.data.tournamentRounds });
    } catch (error) {
        dispatch({ type: TOURNAMENT_ROUNDS_FAILURE, payload: error.message });
    }
};
export const tournamentFixtures = (id, userId) => async(dispatch) => {
    try {
        dispatch({ type: FIXTURES_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/predictions/${id}/${userId}`, config);
        dispatch({ type: FIXTURES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FIXTURES_FAILURE, payload: error.message });
    }
};
export const tournamentRoundFixtures = (id, userId, round) => async(dispatch) => {
    try {
        dispatch({ type: FIXTURES_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/predictions/${id}/${userId}/${round}`, config);
        dispatch({ type: FIXTURES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FIXTURES_FAILURE, payload: error.message });
    }
};
export const playerPredictions = (id, userId, fixtureId, round, predictedHomeScore, predictedAwayScore) => async(dispatch) => {
    try {
        dispatch({ type: PREDICT_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.post(`${serverUrl}/api/predictions/${id}/${userId}`, { fixtureId, round, predictedHomeScore, predictedAwayScore }, config);
        dispatch({ type: PREDICT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: PREDICT_FAILURE, payload: error.message });
    }
};
export const editPlayerPrediction = (id, round, fixtureId, userId) => async(dispatch) => {
    try {
        dispatch({ type: PREDICT_REQUEST });
        const token = localStorage.getItem("token");
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/predictions/${id}/${userId}/${round}/${fixtureId}`, config);
        dispatch({ type: PREDICT_SUCCESS , payload: response.data });
    } catch (error) {
        dispatch({ type: PREDICT_FAILURE, payload: error.message });
    }
};
import axios from "axios";
import { configFunction } from "../components/reusables/Functions";
import { CREATE_LEAGUE_FAILURE, CREATE_LEAGUE_REQUEST, CREATE_LEAGUE_SUCCESS, DELETE_LEAGUE_FAILURE, DELETE_LEAGUE_REQUEST, DELETE_LEAGUE_SUCCESS, DELETE_PROFILE_FAILURE, DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, FINALS_FIXTURE_FAILURE, FINALS_FIXTURE_REQUEST, FINALS_FIXTURE_SUCCESS, FINALS_POINTS_FAILURE, FINALS_POINTS_REQUEST, FINALS_POINTS_SUCCESS, FINALS_PREDICT_FAILURE, FINALS_PREDICT_REQUEST, FINALS_PREDICT_SUCCESS, FIXTURES_FAILURE, FIXTURES_REQUEST, FIXTURES_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, JOIN_FINALS_TOURNAMENT_FAILURE, JOIN_FINALS_TOURNAMENT_REQUEST, JOIN_FINALS_TOURNAMENT_SUCCESS, JOIN_LEAGUE_FAILURE, JOIN_LEAGUE_REQUEST, JOIN_LEAGUE_SUCCESS, JOIN_TOURNAMENT_FAILURE, JOIN_TOURNAMENT_REQUEST, JOIN_TOURNAMENT_SUCCESS, LEAGUE_RANKS_FAILURE, LEAGUE_RANKS_REQUEST, LEAGUE_RANKS_SUCCESS, LEAGUES_FAILURE, LEAGUES_REQUEST, LEAGUES_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, OPT_OUT_FAILURE, OPT_OUT_REQUEST, OPT_OUT_SUCCESS, PREDICT_FAILURE, PREDICT_REQUEST, PREDICT_SUCCESS, PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESEND_CODE_FAILURE, RESEND_CODE_REQUEST, RESEND_CODE_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, TOURNAMENT_FAILURE, TOURNAMENT_POINTS_FAILURE, TOURNAMENT_POINTS_REQUEST, TOURNAMENT_POINTS_SUCCESS, TOURNAMENT_REQUEST, TOURNAMENT_ROUNDS_FAILURE, TOURNAMENT_ROUNDS_REQUEST, TOURNAMENT_ROUNDS_SUCCESS, TOURNAMENT_SUCCESS, TOURNAMENT_TABLE_FAILURE, TOURNAMENT_TABLE_REQUEST, TOURNAMENT_TABLE_SUCCESS, TOURNAMENTS_FAILURE, TOURNAMENTS_REQUEST, TOURNAMENTS_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, USERDATA_FAILURE, USERDATA_REQUEST, USERDATA_SUCCESS, VERIFY_FAILURE, VERIFY_REQUEST, VERIFY_SUCCESS } from "./Constants"
// const serverUrl = "https://afripredictor-server.onrender.com";
const serverUrl = "http://127.0.0.1:5000";
// PROFILE

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
// USERDATA
export const getUserData = (userId, token) => async(dispatch) => {
    try {
        dispatch({ type: USERDATA_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/users/${userId}`, config);
        dispatch({ type: USERDATA_SUCCESS, payload: response.data })
    } catch (error) {
        dispatch({ type: USERDATA_FAILURE, payload: error.message });
    }
};
// LEAGUE
export const leagues = (token) => async(dispatch) => {
    try {
        dispatch({ type: LEAGUES_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/leagues`, config);
        dispatch({ type: LEAGUES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAGUES_FAILURE, payload: error.message });
    }
};
export const tournamentLeagues = (id, token) => async(dispatch) => {
    try {
        dispatch({ type: LEAGUES_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/leagues/tournament/${id}`, config);
        dispatch({ type: LEAGUES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAGUES_FAILURE, payload: error.message });
    }
};
export const playerTournamentLeagues = (tournamentId, token) => async(dispatch) => {
    try {
        dispatch({ type: LEAGUES_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/leagues/tournament/${tournamentId}/player`, config);
        dispatch({ type: LEAGUES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAGUES_FAILURE, payload: error.message });
    } 
}
export const playerTournamentLeagueRanks = (tournamentId, playerTeam, leagues, token) => async(dispatch) => {
    try {
        dispatch({ type: LEAGUE_RANKS_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.post(`${serverUrl}/api/leagues/ranks/${tournamentId}/player`, {playerTeam, leagues}, config);
        dispatch({ type: LEAGUE_RANKS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAGUE_RANKS_FAILURE, payload: error.message });
    } 
}
export const league = (id, token) => async(dispatch) => {
    try {
        dispatch({ type: LEAGUES_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/leagues/${id}`, config);
        dispatch({ type: LEAGUES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LEAGUES_FAILURE, payload: error.message });
    }
};
export const deleteLeagues = (id, token) => async(dispatch) => {
    try {
        dispatch({ type: DELETE_LEAGUE_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.delete(`${serverUrl}/api/leagues/${id}`, config);
        dispatch({ type: DELETE_LEAGUE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DELETE_LEAGUE_FAILURE, payload: error.message });
    }
};
export const createLeague = (tournamentId, userId, name, token) => async(dispatch) => {
    try {
        dispatch({ type: CREATE_LEAGUE_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.post(`${serverUrl}/api/leagues/${tournamentId}/${userId}`, { name }, config);
        dispatch({ type: CREATE_LEAGUE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_LEAGUE_FAILURE, payload: error.message });
    }
};
export const joinLeague = (leagueCode, token) => async(dispatch) => {
    try {
        dispatch({ type: JOIN_LEAGUE_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.put(`${serverUrl}/api/leagues/${leagueCode}/join`, config);
        dispatch({ type: JOIN_LEAGUE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: JOIN_LEAGUE_FAILURE, payload: error.message });
    }
};
// TOURNAMENTS
export const tournament = (id, token) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments/${id}`, config);
        dispatch({ type: TOURNAMENT_SUCCESS, payload: response.data.tournament });
    } catch (error) {
        dispatch({ type: TOURNAMENT_FAILURE, payload: error.message });
    }
};
export const tournaments = (token) => async (dispatch) => {
    try {
      dispatch({ type: TOURNAMENTS_REQUEST });
      const config = configFunction("application/json", `Bearer ${token}`);
      const response = await axios.get(`${serverUrl}/api/tournaments`, config);
      dispatch({ type: TOURNAMENTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: TOURNAMENTS_FAILURE, payload: error.message });
    }
  };
  
export const joinTournament = (id, userId, username, tournament, team, token) => async(dispatch) => {
    try {
        dispatch({ type: JOIN_TOURNAMENT_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.put(`${serverUrl}/api/tournaments/player/join/${id}`, { userId, username, tournament, team}, config);
        localStorage.setItem('userData', JSON.stringify(response.data.updatedUser));
        dispatch({ type: JOIN_TOURNAMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: JOIN_TOURNAMENT_FAILURE, payload: error.message });
    }
};
// export const joinFinalsTournament = (id, userId, username, tournament, team, token) => async(dispatch) => {
//     try {
//         dispatch({ type: JOIN_FINALS_TOURNAMENT_REQUEST });
//         const config = configFunction("application/json", `Bearer ${token}`);
//         const response = await axios.put(`${serverUrl}/api/tournaments/player/join/${id}`, { userId, username, tournament, team}, config);
//         localStorage.setItem('userData', JSON.stringify(response.data.updatedUser));
//         dispatch({ type: JOIN_FINALS_TOURNAMENT_SUCCESS , payload: response.data });
//     } catch (error) {
//         dispatch({ type: JOIN_FINALS_TOURNAMENT_FAILURE, payload: error.message });
//     }
// };
export const optOutTournament = (id, token) => async(dispatch) => {
    try {
        dispatch({ type:  OPT_OUT_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.put(`${serverUrl}/api/tournaments/player/${id}`, config);
        dispatch({ type: OPT_OUT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: OPT_OUT_FAILURE, payload: error.message });
    }
};
export const playerPoints = (id, userId, token) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_POINTS_REQUEST});
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments/player/points/${id}/${userId}`, config);
        dispatch({ type: TOURNAMENT_POINTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: TOURNAMENT_POINTS_FAILURE, payload: error.message });
    }
};
export const tournamentTable = (id, token) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_TABLE_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments/player/table/${id}`, config);
        dispatch({ type: TOURNAMENT_TABLE_SUCCESS, payload: response.data.tournamentLeaderboard });
    } catch (error) {
        dispatch({ type: TOURNAMENT_TABLE_FAILURE, payload: error.message });
    }
};
export const finalsTable = (id, token) => async(dispatch) => {
    try {
        dispatch({ type: FINALS_POINTS_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/finalstournaments/player/table/${id}`, config);
        dispatch({ type: FINALS_POINTS_SUCCESS, payload: response.data.tournamentLeaderboard });
    } catch (error) {
        dispatch({ type: FINALS_POINTS_FAILURE, payload: error.message });
    }
};
export const tournamentTeamTable = (id, team, token) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_TABLE_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments/player/team/table/${id}/${team}`, config);
        dispatch({ type: TOURNAMENT_TABLE_SUCCESS, payload: response.data.tournamentLeaderboard });
    } catch (error) {
        dispatch({ type: TOURNAMENT_TABLE_FAILURE, payload: error.message });
    }
};
export const tournamentLeagueTable = (id, leagueId, token) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_TABLE_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/tournaments/player/league/table/${id}/${leagueId}`, config);
        dispatch({ type: TOURNAMENT_TABLE_SUCCESS, payload: response.data.tournamentLeaderboard });
    } catch (error) {
        dispatch({ type: TOURNAMENT_TABLE_FAILURE, payload: error.message });
    }
};
// PREDICTIONS
export const tournamentRounds = (id, token) => async(dispatch) => {
    try {
        dispatch({ type: TOURNAMENT_ROUNDS_REQUEST  });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/predictions/${id}/rounds`, config);
        dispatch({ type: TOURNAMENT_ROUNDS_SUCCESS, payload: response.data.tournamentRounds });
    } catch (error) {
        dispatch({ type: TOURNAMENT_ROUNDS_FAILURE, payload: error.message });
    }
};
export const tournamentFixtures = (id, userId, token) => async(dispatch) => {
    try {
        dispatch({ type: FIXTURES_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/predictions/${id}/${userId}`, config);
        dispatch({ type: FIXTURES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FIXTURES_FAILURE, payload: error.message });
    }
};

export const finalsTournamentFixture = (id, userId, token) => async(dispatch) => {
    try {
        dispatch({ type: FINALS_FIXTURE_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/finalspredictions/${id}/${userId}`, config);
        dispatch({ type: FINALS_FIXTURE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FINALS_FIXTURE_FAILURE, payload: error.message });
    }
};
export const tournamentRoundFixtures = (id, userId, round, token) => async(dispatch) => {
    try {
        dispatch({ type: FIXTURES_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/predictions/${id}/${userId}/${round}`, config);
        dispatch({ type: FIXTURES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FIXTURES_FAILURE, payload: error.message });
    }
};
export const playerPredictions = (id, userId, fixtureId, round, predictedHomeScore, predictedAwayScore, token) => async(dispatch) => {
    try {
        dispatch({ type: PREDICT_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.post(`${serverUrl}/api/predictions/${id}/${userId}`, { fixtureId, round, predictedHomeScore, predictedAwayScore }, config);
        dispatch({ type: PREDICT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: PREDICT_FAILURE, payload: error.message });
    }
};
export const finalsPlayerPrediction = (id, userId, fixtureId, predictedHalfTimeHomeScore, predictedHalfTimeAwayScore, predictedFullTimeHomeScore,
    predictedFullTimeAwayScore, predictedHomeCornerKicks, predictedAwayCornerKicks, predictedHomeBallPosession, predictedAwayBallPosession,
    predictedFirstGoalMinutes, predictedFirstTeamToScore, token) => async(dispatch) => {
    try {
        dispatch({ type: FINALS_PREDICT_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.post(`${serverUrl}/api/finalspredictions/${id}/${userId}`, 
            { fixtureId, predictedHalfTimeHomeScore, predictedHalfTimeAwayScore, predictedFullTimeHomeScore, predictedFullTimeAwayScore, predictedHomeCornerKicks,
                predictedAwayCornerKicks, predictedHomeBallPosession, predictedAwayBallPosession, predictedFirstGoalMinutes, predictedFirstTeamToScore }, config);
        dispatch({ type: FINALS_PREDICT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FINALS_PREDICT_FAILURE, payload: error.message });
    }
};
export const editPlayerPrediction = (id, round, fixtureId, userId, token) => async(dispatch) => {
    try {
        dispatch({ type: PREDICT_REQUEST });
        const config = configFunction("application/json", `Bearer ${token}`);
        const response = await axios.get(`${serverUrl}/api/predictions/${id}/${userId}/${round}/${fixtureId}`, config);
        dispatch({ type: PREDICT_SUCCESS , payload: response.data });
    } catch (error) {
        dispatch({ type: PREDICT_FAILURE, payload: error.message });
    }
};
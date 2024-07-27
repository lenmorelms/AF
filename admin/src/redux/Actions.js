// LOGIN
import { CREATE_ACCOUNT_FAILURE, CREATE_ACCOUNT_REQUEST, CREATE_ACCOUNT_SUCCESS, CREATE_FIXTURE_FAILURE, CREATE_FIXTURE_REQUEST, CREATE_FIXTURE_SUCCESS, CREATE_TOURNAMENT_FAILURE, CREATE_TOURNAMENT_REQUEST, CREATE_TOURNAMENT_SUCCESS, DELETE_ACCOUNT_FAILURE, DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, DELETE_FIXTURE_FAILURE, DELETE_FIXTURE_REQUEST, DELETE_FIXTURE_SUCCESS, DELETE_TOURNAMENT_REQUEST, EDIT_ACCOUNT_FAILURE, EDIT_ACCOUNT_REQUEST, EDIT_ACCOUNT_SUCCESS, FETCH_FIXTURES_FAILURE, FETCH_FIXTURES_REQUEST, FETCH_FIXTURES_ROUNDS_FAILURE, FETCH_FIXTURES_ROUNDS_REQUEST, FETCH_FIXTURES_ROUNDS_SUCCESS, FETCH_FIXTURES_SUCCESS, FETCH_TOURNAMENT_FAILURE, FETCH_TOURNAMENT_REQUEST, FETCH_TOURNAMENT_SUCCESS, FIXTURE_RESULTS_FAILURE, FIXTURE_RESULTS_REQUEST, FIXTURE_RESULTS_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, UPDATE_FIXTURE_FAILURE, UPDATE_TOURNAMENT_REQUEST, UPDATE_TOURNAMENT_SUCCESS } from "./Constants"
import { configFunction } from "../components/reusables/Functions";
import axios from "axios";

// LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = configFunction("application/json");
        const response = await axios.post(`/api/users/login`, {email, password}, config);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userInfo', response.data.user);
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};
// CREATE ACCOUNR
export const createAdminAccount = (email, username, isAdmin, verified) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ACCOUNT_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction("application/json", `Bearer ${data.token}`);
        const response = await axios.post(`/api/users/admin/register`, {email, username, isAdmin, verified}, config);
        dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_ACCOUNT_FAILURE, payload: error.message });
    }
};
// EDIT PROFILE DETAILS
export const editAdminAccount = (id, email, username, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: EDIT_ACCOUNT_REQUEST });
        const {  _login: { data } } = getState();
        const config = configFunction("application/json", `Bearer ${data.token}`);
        const response = await axios.patch(`/api/users/admin/${id}`, {email, username, password}, config);
        dispatch({ type: EDIT_ACCOUNT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: EDIT_ACCOUNT_FAILURE, payload: error.message });
    }
};
// DELETE USER PROFILE
export const deleteAdminAccount = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_ACCOUNT_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction(`Bearer ${data.token}`);
        const response = await axios.delete(`/api/admin/account/${id}`, config);
        dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DELETE_ACCOUNT_FAILURE, payload: error.message });
    }
};
// LOGOUT
export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
};

// ###TOURNAMENTS###
// CREATE TOURNAMENT
export const createTournament = (name, categoty, country, teams) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_TOURNAMENT_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction("application/json", `Bearer ${data.token}`);
        const response = await axios.post(`/api/tournamnents`, {name, categoty, country, teams}, config);
        dispatch({ type: CREATE_TOURNAMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_TOURNAMENT_FAILURE, payload: error.message });
    }
};
// GET TOURNAMENTS
export const tournaments = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_TOURNAMENT_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction(`Bearer ${data.token}`);
        const response = await axios.get(`/api/tournamnets`, config);
        dispatch({ type: FETCH_TOURNAMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_TOURNAMENT_FAILURE, payload: error.message });
    }
};
// UPDATE TOURNAMENT [***WIP***]
export const updateTournament = (id, name, categoty, country, teams) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_TOURNAMENT_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction("application/json", `Bearer ${data.token}`);
        const response = await axios.put(`/api/tournaments/${id}`, {name, categoty, country, teams}, config);
        dispatch({ type: UPDATE_TOURNAMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_FIXTURE_FAILURE, payload: error.message });
    }
};
// DELETE TOURNAMNET
export const deleteTournament = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_TOURNAMENT_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction(`Bearer ${data.token}`);
        const response = await axios.delete(`/api/admin/account/${id}`, config);
        dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DELETE_ACCOUNT_FAILURE, payload: error.message });
    }
};

// ###FIXTURES###
// CREATE TOURNAMENT FIXTURE
export const createFixture = (id, date, time, round, homeTeamId, awayTeamId) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_FIXTURE_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction("application/json", `Bearer ${data.token}`);
        const response = await axios.post(`/api/fixtures/${id}`, {date, time, round, homeTeamId, awayTeamId}, config);
        dispatch({ type: CREATE_FIXTURE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_FIXTURE_FAILURE, payload: error.meesage });
    }
};
// DELETE TOURNAMENT FIXTURE
export const deleteFixture = (tournamentId, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_FIXTURE_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction(`Bearer ${data.token}`);
        const response = await axios.delete(`/api/fixtures/${tournamentId}/${id}`, config);
        dispatch({ type: DELETE_FIXTURE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DELETE_FIXTURE_FAILURE, payload: error.message });
    }
};
// GET TOURNAMENT FIXTURES
export const fixtures = (tournamentId) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_FIXTURES_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction(`Bearer ${data.token}`);
        const response = await axios.get(`/api/fixtures/${tournamentId}`, config);
        dispatch({ type: FETCH_FIXTURES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_FIXTURES_FAILURE });
    }
};
// GET TOURNAMENT ROUND FIXTURES
export const roundFixtures = (tournamentId, round) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_FIXTURES_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction(`Bearer ${data.token}`);
        const response = await axios.get(`/api/fixtures/${tournamentId}/${round}`, config);
        dispatch({ type: FETCH_FIXTURES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_FIXTURES_FAILURE, payload: error.message });
    }
};
// GET TOURNAMENT FIXTURES ROUND
export const rounds = (tournamentId) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_FIXTURES_ROUNDS_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction(`Bearer ${data.token}`);
        const response = await axios.get(`/api/fixtures/${tournamentId}/fixtures/rounds`, config);
        dispatch({ type: FETCH_FIXTURES_ROUNDS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_FIXTURES_ROUNDS_FAILURE, payload: error.meesage });
    }
};
// ADD TOURNAMENT FIXTURE RESULT
export const addFixtureResults = (tournamentId, fixtureId, actualHomeScore, actualAwayScore) => async (dispatch, getState) => {
    try {
        dispatch({ type: FIXTURE_RESULTS_REQUEST });
        const { _login: { data } } = getState();
        const config = configFunction("application/json", `Bearer ${data.token}`);
        const response = await axios.put(`/api/fixtures/${tournamentId}/${fixtureId}`, config);
        dispatch({ type: FIXTURE_RESULTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FIXTURE_RESULTS_FAILURE, payload: error.meesage });
    }
}; 
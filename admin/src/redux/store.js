import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Use Redux Thunk for async actions
import { addFixtureResultsReducer, createAdminAccountReducer, createFixtureReducer, createTournamentReducer, deleteFixtureReducer, deleteTournamentReducer, fetchFixturesReducer, forgotPasswordReducer, loginReducer, profileDetailsReducer, resetPasswordReducer, sendEmailReducer, updateFixtureReducer, updateTournamentReducer } from './Reducers';

const rootReducer = combineReducers({
    _login: loginReducer,
    _createAdminAccount: createAdminAccountReducer,
    _forgotPassword: forgotPasswordReducer,
    _resetPassword: resetPasswordReducer,
    _profileDetails: profileDetailsReducer,
    _fetchTournaments: fetchFixturesReducer,
    _createTournament: createTournamentReducer,
    _updateTournament: updateTournamentReducer,
    _deleteTournament: deleteTournamentReducer,
    _fetchFixtures: fetchFixturesReducer,
    _createFixture: createFixtureReducer,
    _updateFixture: updateFixtureReducer,
    _deleteFixture: deleteFixtureReducer,
    _addFixtureResults: addFixtureResultsReducer,

    _sendEmail: sendEmailReducer,
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;
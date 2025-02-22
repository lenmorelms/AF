import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Use Redux Thunk for async actions
import { createLeagueReducer, deleteProfileReducer, finalsFixtureReducer, finalsPointsReducer, finalsPredictReducer, fixturesReducer, forgotPasswordReducer, getUserDataReducer, joinFinalsTournamentReducer, joinLeagueReducer, joinTournamentReducer, leagueRanksReducer, leaguesReducer, loginReducer, logoutReducer, playerPointsReducer, predictReducer, profileReducer, registerReducer, resendCodeReducer, resetPasswordReducer, tournamentReducer, tournamentRoundsReducer, tournamentsReducer, tournamentTableReducer, updateProfileReducer, verifyReducer } from './Reducers';

const rootReducer = combineReducers({
    // reducers
    _getUserData: getUserDataReducer,
    _register: registerReducer,
    _resendCode: resendCodeReducer,
    _verify: verifyReducer,
    _forgotPassword: forgotPasswordReducer,
    _resetPassword: resetPasswordReducer,
    _tournaments: tournamentsReducer,
    _tournament: tournamentReducer,
    _profile: profileReducer,
    _updateProfile: updateProfileReducer,
    _deleteProfile: deleteProfileReducer,
    _logout: logoutReducer,
    _joinTournament: joinTournamentReducer,
    _joinFinalsTournament: joinFinalsTournamentReducer,
    _tournamentRounds: tournamentRoundsReducer,
    _playerPoints: playerPointsReducer,
    _fixtures: fixturesReducer,
    _finalsFixture: finalsFixtureReducer,
    _predict: predictReducer,
    _finalsPredict: finalsPredictReducer,
    _tournamentTable: tournamentTableReducer,
    _finalsPoints: finalsPointsReducer,
    _createLeague: createLeagueReducer,
    _joinLeague: joinLeagueReducer,
    _leagues: leaguesReducer,
    _leagueRanks: leagueRanksReducer,
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;
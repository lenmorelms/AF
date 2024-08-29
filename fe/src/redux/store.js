import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Use Redux Thunk for async actions
import { createLeagueReducer, fixturesReducer, joinLeagueReducer, joinTournamentReducer, leagueRanksReducer, leaguesReducer, loginReducer, logoutReducer, playerPointsReducer, predictReducer, profileReducer, tournamentReducer, tournamentRoundsReducer, tournamentsReducer, tournamentTableReducer } from './Reducers';

const rootReducer = combineReducers({
    // reducers
    _login: loginReducer,
    _tournaments: tournamentsReducer,
    _tournament: tournamentReducer,
    _profile: profileReducer,
    _logout: logoutReducer,
    _joinTournament: joinTournamentReducer,
    _tournamentRounds: tournamentRoundsReducer,
    _playerPoints: playerPointsReducer,
    _fixtures: fixturesReducer,
    _predict: predictReducer,
    _tournamentTable: tournamentTableReducer,
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
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import LoginScreen from './screens/Login';
import Home from './screens/Home';
import Tournament from './screens/Tournament';
import TournamentRound from './screens/TournamentRound';
import Fixture from './screens/Fixture';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LoginScreen />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/:id' element={<Tournament />} />
        <Route exact path='/:id/:round' element={<TournamentRound />} />
        <Route exact path='/:id/fixtures' element={<Fixture />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import Verify from './screens/Verify';
import Terms from './screens/Terms';
import Help from './screens/Help';
import Privacy from './screens/Privacy';
import Contact from './screens/Contact';
import HowITWorks from './screens/HowItWorks';
import Learn from './screens/Learn';
import JoinTournament from './screens/JoinTournament';
import ChooseTeam from './screens/ChooseTeam';
import Predictions from './screens/Predictions';
import Leagues from './screens/Leagues';
import Leaderboard from './screens/Leaderboard';
import ProtectedRoute from './components/reusables/ProtectedRoute';
import News from './screens/News';
import RoundPredictions from "./screens/RoundPredictions";
import NotFound from './screens/NotFound';
import Store from './screens/Store';
import Profile from './screens/Profile';
import Results from './screens/Results';

function App() {
  const [deviceType, setDeviceType] = useState("");
  // axios.get(`/device`).then(response => setDeviceType(response.data.deviceType));
  // Fetch device type only when the component mounts
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/device`)
      .then(response => setDeviceType(response.data.deviceType))
      .catch(error => console.error('Error fetching device type:', error));
  }, []); // Empty dependency array ensures it runs only once on mount
  return (
    // <Router>
      <Routes>
        <Route exact path='/' element={<Home deviceType={deviceType} />} />
        <Route exact path='/signup' element={<Register deviceType={deviceType} />} />
        <Route exact path='/signin' element={<Login deviceType={deviceType} />} />
        <Route exact path='/forgot-password' element={<ForgotPasswordScreen deviceType={deviceType} />} />
        <Route exact path='/reset-password/:token' element={<ResetPasswordScreen deviceType={deviceType} />} />
        <Route exact path='/verify/:token' element={<Verify />} />
        <Route exact path='/terms-of-use' element={<Terms deviceType={deviceType} />} />
        <Route exact path='/help' element={<Help deviceType={deviceType} />} />
        <Route exact path='/privacy-policy' element={<Privacy deviceType={deviceType} />} />
        <Route exact path='/contact' element={<Contact deviceType={deviceType} />} />
        <Route exact path='/how-it-works' element={<HowITWorks deviceType={deviceType} />} />
        <Route exact path='/learn' element={<Learn deviceType={deviceType} />} />
        <Route exact path='/news' element={<News deviceType={deviceType} />} />
        <Route exact path='/store' element={<Store deviceType={deviceType} />} />

        <Route 
          exact path='/profile' element={
            <ProtectedRoute>
              <Profile deviceType={deviceType} />
            </ProtectedRoute>
          }
          /> 
        <Route 
          exact path="/tournaments" 
          element={
            <ProtectedRoute>
              <JoinTournament deviceType={deviceType} />
            </ProtectedRoute>
          } 
        />
        <Route 
          exact path='/:id/teams' 
          element={
            <ProtectedRoute>
              <ChooseTeam deviceType={deviceType} />
            </ProtectedRoute>
         } 
        />
        <Route 
          exact path='/:id/predictions' 
          element={
            <ProtectedRoute>
              <Predictions deviceType={deviceType} />
            </ProtectedRoute>
           }
          />
          <Route 
          exact path='/:id/results' 
          element={
            <ProtectedRoute>
              <Results deviceType={deviceType} />
            </ProtectedRoute>
           }
          />
        <Route 
          exact path='/:id/predictions/:round' 
          element={
            <ProtectedRoute>
              <RoundPredictions deviceType={deviceType} />
            </ProtectedRoute>
           }
          />
        {/* <Route exact path='/:id/leagues' element={<Leagues deviceType={deviceType} />} /> */}
        {/* <Route exact path='/:id/leagues/:round' element={<Leagues />} /> */}
        <Route 
          exact path='/:id/leaderboard' 
          element={
            <ProtectedRoute>
              <Leaderboard deviceType={deviceType} />
            </ProtectedRoute>
           }
          />
        {/* <Route exact path='/:id/leaderboard/:team/team' element={<Leaderboard deviceType={deviceType} />} /> */}
        {/* <Route exact path='/:id/leaderboard/:leagueId/league' element={<Leaderboard deviceType={deviceType} />} /> */}
        {/* NOT FOUND */}
        <Route exact path='*' element={<NotFound />} />
      </Routes>
    // </Router>
  );
}

export default App;
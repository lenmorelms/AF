import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import LoginScreen from './screens/big/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LoginScreen />}/>
      </Routes>
    </Router>
  );
}

export default App;

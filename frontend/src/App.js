import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Investigation from './pages/investigation/investigation';
import PublicInvestigation from './pages/investigation/publicResearch';
import Login from './pages/user/login';
import Home from './pages/home';
import Profile from './pages/user/profile';
import Meetings from './pages/meetings/meetings';
import CreateMeetings from './pages/meetings/createMeeting';
import Error from './pages/error404';

function App() {

  const PrivateRoute = function ({ children }) {
    let isAuthenticated = sessionStorage.getItem('auth');
    if (isAuthenticated) {
      return children;
    } else {
      return <Navigate to="/login" replace />;
    }
  };

  return (
    <Router>
      {/* <Container fluid="sm">
          <Forms jsonfield={fieldMeeting} jsonform={jsonMetting} jsonValidation={schemaMetting} submit={(valores, {resetForm}) => {
              resetForm();
              console.log(valores);
          }}/>
      </Container> */}
      <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            }/>
            <Route path="/reuniones" element={
              <PrivateRoute>
                <Meetings/>
              </PrivateRoute>
            }/>
             <Route path="/reuniones/crear" element={
              <PrivateRoute>
                <CreateMeetings/>
              </PrivateRoute>
            }/>
            <Route path="/investigaciones" element={
              <PrivateRoute>
                <Investigation/>
              </PrivateRoute>
            }/>
            <Route path="/investigaciones/publicar" element={
              <PrivateRoute>
                <PublicInvestigation/>
              </PrivateRoute>
            }/>
            <Route path="/perfil" element={
              <PrivateRoute>
                <Profile/>
              </PrivateRoute>
            }/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </Router>
  );
}

export default App;

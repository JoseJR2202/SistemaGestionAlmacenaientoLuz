import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {
  Routes,
  Route,
} from "react-router-dom";
import Investigation from './pages/investigation/investigation';
import Login from './pages/user/login';
import Home from './pages/home';
import Profile from './pages/user/profile';
import Meetings from './pages/meetings/meetings';
import Error from './pages/error404';

function App() {
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
            <Route path="/" element={<Home />}/>
            <Route path="/reuniones" element={<Meetings />}/>
            <Route path="/investigaciones" element={<Investigation />}/>
            <Route path="/perfil" element={<Profile />}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </Router>
  );
}

export default App;

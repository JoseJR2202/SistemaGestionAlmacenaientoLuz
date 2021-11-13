import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
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
       <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/reuniones">reuniones</Link>
            </li>
            <li>
              <Link to="/investigaciones">investigaciones</Link>
            </li>
            <li>
              <Link to="/perfil">perfil</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home />}/>
          <Route path="/reuniones" element={<Meetings />}/>
          <Route path="/investigaciones" element={<Investigation />}/>
          <Route path="/perfil" element={<Profile />}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </div>
  </Router>
  );
}

export default App;

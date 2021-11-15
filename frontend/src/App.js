import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Navbar from './component/navBar'

function App() {
  return (
    <Router>
      <Navbar/>
    </Router>
  );
}

export default App;

import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Navbar from './component/navBar'
import Forms from './component/form'
function App() {
  return (
    <Router>
      <Navbar/>
      <Forms/>
    </Router>
  );
}

export default App;

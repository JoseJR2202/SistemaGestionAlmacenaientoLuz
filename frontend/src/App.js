import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Navbar from './component/navBar'
import Forms from './component/form'
import { fieldMeeting } from './schemas/schemaField';
import { jsonMetting } from './schemas/schemaForm';
import { schemaMetting } from './schemas/schemaValidation';


function App() {
  return (
    <Router>
      <Navbar/>
      <Forms jsonfield={fieldMeeting} jsonform={jsonMetting} jsonValidation={schemaMetting} submit={(valores, {resetForm}) => {
                resetForm();
                console.log(valores);
            }}/>
    </Router>
  );
}

export default App;

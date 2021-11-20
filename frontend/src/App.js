import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Navbar from './component/navBar'
import Forms from './component/form'
import { fieldMeeting } from './schemas/schemaField';
import { jsonMetting } from './schemas/schemaForm';
import { schemaMetting } from './schemas/schemaValidation';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Router>
      <Navbar/>
      <Container fluid>
          <Forms jsonfield={fieldMeeting} jsonform={jsonMetting} jsonValidation={schemaMetting} submit={(valores, {resetForm}) => {
              resetForm();
              console.log(valores);
          }}/>
      </Container>
      
    </Router>
  );
}

export default App;

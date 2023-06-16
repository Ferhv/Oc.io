import logo from './logo.svg';
import ConciertosTable from './pages/ConciertosPage/components/ConciertosTable.component';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <ConciertosTable/>
  )
}

export default App;

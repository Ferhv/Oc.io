import logo from './logo.svg';
import CrucerosTable from './pages/CrucerosPage/components/CrucerosTable.component';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <CrucerosTable/>
  )
}

export default App;

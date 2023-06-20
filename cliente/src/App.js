import logo from './logo.svg';
import CrucerosTable from './pages/CrucerosPage/components/CrucerosTable.component';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<CrucerosTable/>}/>
      </Routes>  
    </Router>
  )
}

export default App;

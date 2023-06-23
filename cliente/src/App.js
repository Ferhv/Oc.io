
import CrucerosTable from './pages/CrucerosPage/components/CrucerosTable.component';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import VistaEmpresas from './pages/AdminPage/VistaEmpresas';
import LoginAdmin from './pages/AdminPage/LoginAdmin';
import RegistroEmpresas from './pages/EmpresasPage/RegistroEmpresas';
import RegistroClientes from './pages/ClientesPage/RegistroClientes';
import RegistroCruceros from './pages/CrucerosPage/RegistroCruceros';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<RegistroEmpresas/>}/>
      </Routes>  
    </Router>
  )
}

export default App;

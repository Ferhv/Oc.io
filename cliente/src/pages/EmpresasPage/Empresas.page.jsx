import {Paper, Typography} from '@mui/material';
import {Header} from '../../components/Header.component';
import { useEffect } from 'react';
import EmpresasTable from './components/EmpresasTable.component';
export const EmpresasPage = () => {
    useEffect(() => {
      document.title = "EMPRESAS";
    }, []);
    return (
      <Paper>
        <Typography variant="h1" color="primary">Empresas</Typography>
        <EmpresasTable/>
      </Paper>
    );
  };
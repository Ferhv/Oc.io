import {Box, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton} from '@mui/material';
//import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
//import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ImageList, ImageListItem} from '@mui/material';
import axios from 'axios';
import { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';


//& Empresas sin Verificar ////////////////////////////////////////////////////////////////////////////////
export const EmpresasSinTable = () => {
    const [empresas, setEmpresas] = useState([]);
  
    useEffect(() => {
      axios({
        url: 'http://localhost:8080/empresasNoVerificadas',
        method: 'GET',
      })
        .then((res) => {
          setEmpresas(res.data);
        })
        .catch((err) => console.log(err));
    }, []);
  
    const handleVerificarEmpresa = (empresaId) => {
      axios
        .post('/verificarEmpresa', { id: empresaId })
        .then((response) => {
          console.log(response.data); // Manejar la respuesta de la solicitud POST según sea necesario
        })
        .catch((error) => {
          console.error(error); // Manejar el error de la solicitud POST según sea necesario
        });
    };
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">CIF</TableCell>
              <TableCell align="right">Verificar</TableCell> {/* Nueva columna para el botón de verificación */}
            </TableRow>
          </TableHead>
          <TableBody>
            {empresas.map((empresa) => (
              <TableRow
                key={empresa.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {empresa.id}
                </TableCell>
                <TableCell align="right">{empresa.nombre}</TableCell>
                <TableCell align="right">{empresa.email}</TableCell>
                <TableCell align="right">{empresa.cif}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleVerificarEmpresa(empresa.id)}
                    variant="outlined">
                    Verificar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  

//& Listado de Empresas //////////////////////////////////////////////////////////
export const EmpresasTable = () => {
    const [empresas, setEmpresas] = useState([]);
  
    useEffect(() => {
      axios({
        url: 'http://localhost:8080/empresasLista',
        method: 'GET',
      })
        .then((res) => {
          setEmpresas(res.data);
        })
        .catch((err) => console.log(err));
    }, []);
  
    const handleEliminarEmpresa = (empresaId) => {
      axios
        .post('/borrarEmpresa', { id: empresaId })
        .then((response) => {
          console.log(response.data); // Manejar la respuesta de la solicitud POST según sea necesario
        })
        .catch((error) => {
          console.error(error); // Manejar el error de la solicitud POST según sea necesario
        });
    };
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">CIF</TableCell>
              <TableCell align="right">Borrar</TableCell> {/* Nueva columna para el botón de eliminación */}
            </TableRow>
          </TableHead>
          <TableBody>
            {empresas.map((empresa) => (
              <TableRow
                key={empresa.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {empresa.id}
                </TableCell>
                <TableCell align="right">{empresa.nombre}</TableCell>
                <TableCell align="right">{empresa.email}</TableCell>
                <TableCell align="right">{empresa.cif}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleEliminarEmpresa(empresa.id)}
                    variant="outlined">
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  

//export { EmpresasSinTable, EmpresasTable };
export default function VistaEmpresas() {
    return (
      <div>
        <h1>Empresas no verificadas</h1>
        <EmpresasSinTable />
        <h1>Listado de Empresas</h1>
        <EmpresasTable />
      </div>
    );
  }
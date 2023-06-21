import {Box, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton} from '@mui/material';
//import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
//import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ImageList, ImageListItem} from '@mui/material';
import axios from 'axios';
import { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as React from 'react';

export const CrucerosTable = () => {
  const [cruceros, setCruceros] = useState([]);
  useEffect(() => {
    axios({
        url: 'http://localhost:8080/crucerosDisponibles',
        method: 'GET',
    })
    .then(res => {
        setCruceros(res.data);
    })
    .catch(err => console.log(err))
}, []);
return <TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell>ID</TableCell>
      <TableCell align="right">Nombre</TableCell>
      <TableCell align="right">Puerto</TableCell>
      <TableCell align="right">Precio)</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {cruceros.map((crucero) => (
      <TableRow
        key={crucero.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {crucero.id}
        </TableCell>
        <TableCell align="right">{crucero.nombre}</TableCell>

        <TableCell align="right">{crucero.puerto}</TableCell>
        <TableCell align="right">{crucero.precio}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
}
export default CrucerosTable;
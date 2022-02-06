import { Container } from '@mui/material';
import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStore } from '../../store/store';

function OrderProducts(props) {
  const { products } = useStore(state => state.currentOrder);

  const totalPrice = products.reduce((rem, prod) => rem + prod.price, 0);

  return (
    <Container sx={{ mt: 10 }}>
      <Paper elevation={20}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='orders table'>
            <TableHead>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell align='right'>Name</TableCell>
                <TableCell align='right'>Rating</TableCell>
                <TableCell align='right'>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.brand}
                  </TableCell>
                  <TableCell align='right'>{row.name}</TableCell>
                  <TableCell align='right'>{row.rating}</TableCell>
                  <TableCell align='right'>{row.price}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'></TableCell>
                <TableCell align='right'></TableCell>
                <TableCell align='right'>TOTAL</TableCell>
                <TableCell align='right'>{totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default OrderProducts;

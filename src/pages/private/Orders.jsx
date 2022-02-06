import { Button, Container } from '@mui/material';
import React from 'react';

import { db } from '../../config/firebase-config';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { useStore } from '../../store/store';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../../components/general/ToastNotification';

function Orders(props) {
  const { email } = useStore(state => state.user);
  const ordersCollection = collection(db, 'orders');
  const [orders, setOrders] = React.useState([]);

  const navigate = useNavigate();

  const setCurrentOrder = useStore(state => state.setCurrentOrder);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      console.log(email);
      const q = query(ordersCollection, where('email', '==', email));
      const data = await getDocs(q);
      setOrders(data.docs.map(doc => doc.data()));
      console.log(orders);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ mt: 10 }}>
      <ToastNotification state='error' message='Something went wrong. Try again.' open={open} setOpen={setOpen} />

      <Paper elevation={20}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='orders table'>
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell align='right'>County</TableCell>
                <TableCell align='right'>Address</TableCell>
                <TableCell align='right'>Nr of products</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.city}
                  </TableCell>
                  <TableCell align='right'>{row.county}</TableCell>
                  <TableCell align='right'>{row.address}</TableCell>
                  <TableCell align='right'>
                    {row.products.length}
                    <Button
                      variant='contained'
                      sx={{ ml: 2 }}
                      onClick={() => {
                        navigate('/orderProducts');
                        setCurrentOrder(row);
                      }}>
                      See
                    </Button>
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      variant='contained'
                      onClick={async () => {
                        try {
                          await addDoc(ordersCollection, { ...row, email: email });
                          navigate('/', { replace: true });
                        } catch (error) {
                          console.log(error);
                          setOpen(true);
                        }
                      }}>
                      Repeat
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default Orders;

import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useStore } from '../../store/store';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';

function Cart(props) {
  const cart = useStore(state => state.cart);
  const clearCart = useStore(state => state.clearCart);
  const navigate = useNavigate();

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography variant='h4' sx={{ margin: 'auto', marginBottom: 3 }} textAlign='center'>
        Shopping Cart {cart.length === 0 && ' is empty. Go add some products'}
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto' }}>
        {cart.map((prod, index) => {
          return (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={prod.brand} secondary={prod.name} />
            </ListItem>
          );
        })}
        {cart.length > 0 && (
          <>
            <Button size='small' variant='contained' sx={{ marginTop: 5 }} onClick={() => clearCart()}>
              <Typography variant='h6'>Clear cart</Typography>
            </Button>
            <Button size='small' variant='contained' sx={{ marginTop: 5, marginLeft: 5 }} onClick={() => navigate('/checkout', { replace: true })}>
              <Typography variant='h6'>Checkout</Typography>
            </Button>
          </>
        )}
      </List>
    </Container>
  );
}

export default Cart;

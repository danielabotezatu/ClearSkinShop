import { Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';

import { db } from '../../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import ToastNotification from '../../components/general/ToastNotification';

function Checkout(props) {
  const cart = useStore(state => state.cart);
  const user = useStore(state => state.user);
  const clearCart = useStore(state => state.clearCart);
  const navigate = useNavigate();

  const ordersCollection = collection(db, 'orders');

  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const { address, city, county, phone } = data;
    const products = cart;

    try {
      await addDoc(ordersCollection, { address, city, county, phone, products, email: user.email });
      clearCart();
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
      setOpen(true);
    }
  };

  if (cart.length === 0)
    return (
      <Container>
        <Typography variant='h4' textAlign='center' sx={{ mt: 5 }}>
          No items in the cart.
        </Typography>
      </Container>
    );

  return (
    <>
      <ToastNotification state='error' message='Something went wrong. Try again.' open={open} setOpen={setOpen} />
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Paper elevation={15} sx={{ width: '50%', margin: 'auto', marginTop: 10 }}>
              <Typography variant='h4' align='center' sx={{ paddingTop: 4 }}>
                Checkout form
              </Typography>
              <Stack spacing={5} sx={{ margin: 3 }}>
                <TextField
                  sx={{ marginTop: 3 }}
                  {...register('city', {
                    required: 'City is required',
                  })}
                  error={!!errors.city}
                  id='outlined-error'
                  label={errors.city ? 'Error' : 'City'}
                  helperText={errors.city?.message}
                />
                <TextField
                  sx={{ marginTop: 3 }}
                  {...register('county', {
                    required: 'County is required',
                  })}
                  error={!!errors.county}
                  id='outlined-error'
                  label={errors.county ? 'Error' : 'County'}
                  helperText={errors.county?.message}
                />
                <TextField
                  sx={{ marginTop: 3 }}
                  {...register('address', {
                    required: 'Address is required',
                  })}
                  error={!!errors.address}
                  id='outlined-error'
                  label={errors.address ? 'Error' : 'Address'}
                  helperText={errors.address?.message}
                />
                <TextField
                  sx={{ marginTop: 3 }}
                  {...register('phone', {
                    required: 'Phone is required',
                    validate: {
                      haveTen: ph => ph.length === 10 || 'Phone must be 10 digits long',
                    },
                  })}
                  error={!!errors.phone}
                  id='outlined-error'
                  label={errors.phone ? 'Error' : 'Phone'}
                  helperText={errors.phone?.message}
                />
                <Button variant='contained' type='submit' sx={{ width: '70%', alignSelf: 'center' }}>
                  Submit
                </Button>
                <Typography variant='h4' align='center'>
                  {' '}
                </Typography>
              </Stack>
            </Paper>
          </Container>
        </form>
      </Container>
    </>
  );
}

export default Checkout;

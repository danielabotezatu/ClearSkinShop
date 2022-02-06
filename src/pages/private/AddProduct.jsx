import { Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { db } from '../../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import ToastNotification from '../../components/general/ToastNotification';

import validator from 'validator';

function AddProduct(props) {
  const navigate = useNavigate();
  const productsCollection = collection(db, 'products');
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const { name, brand, price, imageLink, rating } = data;

    try {
      await addDoc(productsCollection, { name, brand, price: parseInt(price), imageLink, rating: parseFloat(rating) });
      navigate('/products', { replace: true });
    } catch (error) {
      console.log(error);
      setOpen(true);
    }
  };

  return (
    <>
      <ToastNotification state='error' message='Something went wrong. Try again.' open={open} setOpen={setOpen} />
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Paper elevation={15} sx={{ width: '50%', margin: 'auto', marginTop: 10 }}>
              <Typography variant='h4' align='center' sx={{ paddingTop: 4 }}>
                Add new product
              </Typography>
              <Stack spacing={5} sx={{ margin: 3 }}>
                <TextField
                  sx={{ marginTop: 3 }}
                  {...register('brand', {
                    required: 'Brand is required',
                  })}
                  error={!!errors.brand}
                  id='outlined-error'
                  label={errors.brand ? 'Error' : 'Brand'}
                  helperText={errors.brand?.message}
                />
                <TextField
                  sx={{ marginTop: 3 }}
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  error={!!errors.name}
                  id='outlined-error'
                  label={errors.name ? 'Error' : 'Name'}
                  helperText={errors.name?.message}
                />
                <TextField
                  sx={{ marginTop: 3 }}
                  {...register('price', {
                    required: 'Price is required',
                    validate: {
                      between0And5: rt => (validator.isNumeric(rt) && rt > 3 && rt <= 100) || 'This has to be a number between 3 and 100',
                    },
                  })}
                  error={!!errors.price}
                  id='outlined-error'
                  label={errors.price ? 'Error' : 'Price'}
                  helperText={errors.price?.message}
                />
                <TextField
                  sx={{ marginTop: 3 }}
                  {...register('rating', {
                    required: 'Rating is required',
                    validate: {
                      between0And5: rt => (validator.isNumeric(rt) && rt > 0 && rt <= 5) || 'This has to be a number between 0 and 5',
                    },
                  })}
                  error={!!errors.rating}
                  id='outlined-error'
                  label={errors.rating ? 'Error' : 'Rating'}
                  helperText={errors.rating?.message}
                />
                <TextField
                  sx={{ marginTop: 3 }}
                  {...register('imageLink', {
                    required: 'Image link is required',
                    validate: {
                      isLink: link => validator.isURL(link) || 'This has to be an url',
                    },
                  })}
                  error={!!errors.imageLink}
                  id='outlined-error'
                  label={errors.imageLink ? 'Error' : 'Image link'}
                  helperText={errors.imageLink?.message}
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

export default AddProduct;

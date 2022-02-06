import React from 'react';
import { Box, Paper, Grid, Typography, Rating, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useStore } from '../../store/store';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import ToastNotification from '../general/ToastNotification';

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: 'body2',
          },
          style: {
            fontSize: 11,
          },
        },
        {
          props: {
            variant: 'body3',
          },
          style: {
            fontSize: 9,
          },
        },
      ],
    },
  },
});

function SkinProduct({ product, isAdmin }) {
  const { brand, name, price, imageLink, rating } = product;
  const addProduct = useStore(state => state.addProduct);

  const [open, setOpen] = React.useState(false);

  return (
    <Grid item xs={3}>
      <ToastNotification state='error' message='Something went wrong. Try again.' open={open} setOpen={setOpen} />
      <ThemeProvider theme={theme}>
        <Paper elevation={3} className='feedback'>
          <img src={imageLink} alt='' className='img' />
          <Box paddingX={1}>
            <Typography component='h2' variant='subtitle1'>
              {brand}
            </Typography>
            <Typography component='h2' variant='subtitle1'>
              {name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
              marginTop={3}>
              <Rating name='read-only' value={rating} readOnly precision={0.1} size='small' />
              <Typography variant='body2' component='p' marginLeft={0.5}>
                {rating}
              </Typography>
              <Typography variant='body3' component='p' marginLeft={1.5}>
                {/* (655 reviews) */}
              </Typography>
            </Box>
            <Box flexDirection='row'>
              <Typography variant='h6' component='h3'>
                $ {price}
                {!isAdmin && (
                  <IconButton
                    onClick={() => {
                      addProduct(product);
                    }}>
                    <ShoppingCartIcon />
                  </IconButton>
                )}
                {isAdmin && (
                  <IconButton
                    sx={{ ml: '67%' }}
                    onClick={async () => {
                      try {
                        const prodFromDbRef = doc(db, 'products', product.id);
                        await deleteDoc(prodFromDbRef);
                      } catch (error) {
                        console.log(error);
                        setOpen(true);
                      }
                    }}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Grid>
  );
}

export default SkinProduct;

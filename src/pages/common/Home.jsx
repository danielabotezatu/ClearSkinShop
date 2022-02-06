import React from 'react';

import CSLogo from '../../assets/logo.png';
import { makeStyles } from '@mui/styles';

import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  bgImage: {
    marginTop: '10vh',

    height: '50vh',

    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',

    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Home({ loggedIn }) {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <>
      <div
        className={classes.bgImage}
        style={{
          backgroundImage: `url("${CSLogo}")`,
        }}
      />
      <Button color='primary' fullWidth sx={{ marginTop: 5 }} onClick={() => navigate(!loggedIn ? '/signup' : '/products', { replace: true })}>
        <Typography component='p' variant='h6'>
          Find out more
        </Typography>
      </Button>
    </>
  );
}

export default Home;

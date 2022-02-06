import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

function CustomSpinner(props) {
  return (
    <Container sx={{ marginY: 50 }}>
      <Stack alignItems='center'>
        <CircularProgress size={70} />
      </Stack>
    </Container>
  );
}

export default CustomSpinner;

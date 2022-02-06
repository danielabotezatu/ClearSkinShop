import React from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import { Container, Paper, Stack, TextField, Button, Typography } from '@mui/material';

import { useStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../../components/general/ToastNotification';

function SignUp(props) {
  const signup = useStore(state => state.signup);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const { email, password } = data;
    const res = await signup(email, password);
    if (res?.error) {
      if (res.error === 'Email already in use')
        setError('email', {
          type: 'manual',
          message: res.error,
        });
      else setOpen(true);
    } else navigate('/products', { replace: true });
  };

  return (
    <>
      <ToastNotification state='error' message='Something went wrong.' open={open} setOpen={setOpen} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Paper elevation={15} sx={{ width: '50%', margin: 'auto', marginTop: 10 }}>
            <Typography variant='h4' align='center' sx={{ paddingTop: 4 }}>
              SignUp form
            </Typography>
            <Stack spacing={5} sx={{ margin: 3 }}>
              <TextField
                sx={{ marginTop: 3 }}
                {...register('email', {
                  required: 'Email is required',
                  validate: {
                    isEmail: v => validator.isEmail(v) || 'Enter a valid email',
                  },
                })}
                error={!!errors.email}
                id='outlined-error'
                label={errors.email ? 'Error' : 'Email'}
                helperText={errors.email?.message}
              />
              <TextField
                {...register('password', {
                  required: 'Password is required',
                  validate: {
                    min30Chars: pss => validator.isLength(pss, { min: 8, max: 30 }) || 'Password must be between 8 and 30 chars',
                  },
                })}
                error={!!errors.password}
                id='outlined-error-helper-text'
                label={errors.password ? 'Error' : 'Password'}
                helperText={errors.password?.message}
                type='password'
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
    </>
  );
}

export default SignUp;

import React from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import { Container, Paper, Stack, TextField, Button, Typography } from '@mui/material';

import ToastNotification from '../../components/general/ToastNotification';

import { auth } from '../../config/firebase-config';
import { updatePassword } from 'firebase/auth';

function Profile(props) {
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: "Passwords don't match",
      });
      return;
    }

    try {
      const user = auth.currentUser;
      await updatePassword(user, password);
      setOpenSuccess(true);
    } catch (error) {
      setOpenError(true);
    }
  };

  return (
    <>
      <ToastNotification state='error' message='Something went wrong.' open={openError} setOpen={setOpenError} />
      <ToastNotification state='success' message='Password successfuly updated' open={openSuccess} setOpen={setOpenSuccess} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Paper elevation={15} sx={{ width: '50%', margin: 'auto', marginTop: 10 }}>
            <Typography variant='h4' align='center' sx={{ paddingTop: 4 }}>
              Change password
            </Typography>
            <Stack spacing={5} sx={{ margin: 3 }}>
              <TextField
                sx={{ marginTop: 3 }}
                {...register('password', {
                  required: 'This is required',
                  validate: {
                    min30Chars: pss => validator.isLength(pss, { min: 8, max: 30 }) || 'Password must be between 8 and 30 chars',
                  },
                })}
                error={!!errors.password}
                id='outlined-error'
                label={errors.password ? 'Error' : 'Password'}
                helperText={errors.password?.message}
                type='password'
              />
              <TextField
                {...register('confirmPassword', {
                  required: 'This is required',
                  validate: {
                    min30Chars: pss => validator.isLength(pss, { min: 8, max: 30 }) || 'Password must be between 8 and 30 chars',
                  },
                })}
                error={!!errors.confirmPassword}
                id='outlined-error-helper-text'
                label={errors.confirmPassword ? 'Error' : 'Confirm Password'}
                helperText={errors.confirmPassword?.message}
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

export default Profile;

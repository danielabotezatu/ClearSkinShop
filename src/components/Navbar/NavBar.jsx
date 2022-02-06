import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '../../store/store';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { IconButton, Menu, MenuItem } from '@mui/material';

export default function ButtonAppBar({ loggedIn, isAdmin }) {
  const logout = useStore(state => state.logout);
  const navigate = useNavigate();

  const cart = useStore(state => state.cart);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              Clear Skin Shop
            </Link>
          </Typography>
          {loggedIn ? null : (
            <>
              <Button color='inherit'>
                <Link to='login' style={{ textDecoration: 'none', color: 'white' }}>
                  Login
                </Link>
              </Button>
              <Button color='inherit'>
                <Link to='signup' style={{ textDecoration: 'none', color: 'white' }}>
                  Signup
                </Link>
              </Button>
            </>
          )}
          {!loggedIn || isAdmin ? null : (
            <>
              <Button color='inherit'>
                <Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>
                  Products
                </Link>
              </Button>

              <Button
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: 'white' }}>
                Profile
              </Button>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}>
                <MenuItem
                  onClick={() => {
                    navigate('/profile');
                    handleClose();
                  }}>
                  Change Password
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/orders');
                    handleClose();
                  }}>
                  Orders
                </MenuItem>
              </Menu>

              <IconButton
                color='inherit'
                onClick={() => {
                  navigate('cart');
                }}>
                <Badge badgeContent={cart.length} color='primary'>
                  <ShoppingCartCheckoutIcon />
                </Badge>
              </IconButton>
              <Button
                color='inherit'
                onClick={async () => {
                  await logout();
                  navigate('/', { replace: true });
                }}>
                Logout
              </Button>
            </>
          )}
          {isAdmin && (
            <>
              <Button color='inherit'>
                <Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>
                  Products
                </Link>
              </Button>
              <Button color='inherit'>
                <Link to='/addProduct' style={{ textDecoration: 'none', color: 'white' }}>
                  Add product
                </Link>
              </Button>
              <Button
                color='inherit'
                onClick={async () => {
                  await logout();
                  navigate('/', { replace: true });
                }}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar/NavBar';
import LoginPage from './pages/auth/Login';
import SignUpPage from './pages/auth/SignUp';
import Profile from './pages/auth/Profile';
import HomePage from './pages/common/Home';
import NotFoundPage from './pages/common/NotFound';
import Products from './pages/private/Products';
import { useStore } from './store/store';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase-config';
import Cart from './pages/private/Cart';
import Checkout from './pages/private/Checkout';
import Orders from './pages/private/Orders';
import OrderProducts from './pages/private/OrderProducts';
import AddProduct from './pages/private/AddProduct';

function App() {
  const isAdmin = useStore(state => state.isAdmin);
  const loggedIn = useStore(state => state.loggedIn);
  const updateUser = useStore(state => state.updateUser);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        updateUser(user);
      } else {
        updateUser(null);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <NavBar loggedIn={loggedIn} isAdmin={isAdmin} />
      <Routes>
        <Route path='/' element={<HomePage loggedIn={loggedIn} />} />

        {!loggedIn && <Route path='/signup' element={<SignUpPage />} />}
        {!loggedIn && <Route path='/login' element={<LoginPage />} />}

        {loggedIn && !isAdmin && <Route path='/profile' element={<Profile />} />}
        {loggedIn && !isAdmin && <Route path='/cart' element={<Cart />} />}
        {loggedIn && !isAdmin && <Route path='/checkout' element={<Checkout />} />}
        {loggedIn && !isAdmin && <Route path='/orders' element={<Orders />} />}
        {loggedIn && !isAdmin && <Route path='/orderProducts' element={<OrderProducts />} />}

        {loggedIn && <Route path='/products' element={<Products isAdmin={isAdmin} />} />}
        {loggedIn && isAdmin && <Route path='/addProduct' element={<AddProduct />} />}

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

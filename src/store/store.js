import create from 'zustand';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import produce from 'immer';

import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

export const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: {},
        loggedIn: false,
        isAdmin: false,

        updateUser: user => {
          if (user)
            set(
              produce(state => {
                state.user.email = user.email;
                state.user.uid = user.uid;
                state.loggedIn = true;
                state.isAdmin = user.email === 'admin@gmail.com';
              }),
            );
          else
            set(
              produce(state => {
                state.user = {};
                state.loggedIn = false;
                state.isAdmin = false;
              }),
            );
        },

        signup: async (email, password) => {
          const res = await createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
            })
            .catch(error => {
              const errorCode = error.code;
              const errorMessage = error.message;

              console.log(errorCode);
              console.log(errorMessage);

              return {
                error: 'Email already in use',
              };
            });

          return res;
        },

        logout: async () => {
          try {
            await auth.signOut();
            set(
              produce(state => {
                state.currentOrder = {};
                state.cart = [];
              }),
            );
          } catch (error) {
            console.log(error);
          }
        },

        login: async (email, password) => {
          const res = await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
            })
            .catch(error => {
              const errorCode = error.code;
              const errorMessage = error.message;

              console.log({ errorCode });
              console.log({ errorMessage });

              if (errorCode === 'auth/user-not-found')
                return {
                  field: 'email',
                  error: 'No user with this email address',
                };

              if (errorCode === 'auth/wrong-password')
                return {
                  field: 'password',
                  error: 'Wrong password',
                };

              return {
                error: 'Something went wrong',
              };
            });

          return res;
        },

        cart: [],

        addProduct: product => {
          set(
            produce(state => {
              state.cart.push(product);
            }),
          );
        },

        clearCart: () => {
          set(
            produce(state => {
              state.cart = [];
            }),
          );
        },

        currentOrder: {},
        setCurrentOrder: order => {
          set(
            produce(state => {
              state.currentOrder = order;
            }),
          );
        },
        deleteCurrentOrder: () => {
          set(
            produce(state => {
              state.currentOrder = {};
            }),
          );
        },
      }),
      {
        name: 'State storage key',
      },
    ),
    {
      name: 'My devtool store name',
    },
  ),
);

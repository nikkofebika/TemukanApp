import React, {createContext, useMemo, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../config/const/url';
import {authReducer, initialState} from './AuthReducers';

export const AuthContext = createContext();
const AuthContextProvider = ({children}) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        return new Promise((resolve, reject) => {
          fetch(API_URL + 'auth/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
            .then(response => response.json())
            .then(async res => {
              resolve(res);
              if (res.success) {
                await AsyncStorage.setItem('userToken', res.data.token);
                dispatch({
                  type: 'SIGNIN',
                  userToken: res.data.token,
                  loginUserNotFound: false,
                });
              } else {
                dispatch({
                  type: 'SIGNIN',
                  userToken: null,
                  loginUserNotFound: true,
                });
              }
            })
            .catch(error => {
              console.error(error);
              reject(error);
            });
        });
      },
      signUp: async (name, email, password) => {
        return new Promise((resolve, reject) => {
          console.log('sampeeeee', name, email, password);
          fetch(API_URL + 'auth/register', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          })
            .then(response => response.json())
            .then(async res => {
              resolve(res);
              if (res.success) {
                await AsyncStorage.setItem('userToken', res.data.token);
                dispatch({
                  type: 'SIGNUP',
                  userToken: res.data.token,
                });
              } else {
                dispatch({
                  type: 'SIGNUP',
                  userToken: null,
                });
              }
            })
            .catch(error => {
              console.error(error);
              reject(error);
            });
        });
      },
      signOut: async () => {
        await AsyncStorage.removeItem('userToken');
        dispatch({type: 'SIGNOUT'});
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={{authContext, authState, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

import {
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { IUser } from './types';
import { auth } from '../../firebase/firebaseConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkErrorHandler } from '@state/helpers';

export const verifyAuthState = createAsyncThunk('auth/verifyAuthState', async (_, thunkAPI) => {
  try {
    const user: IUser | null = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        } else {
          reject(null);
        }
      });
    });
    return user;
  } catch (error) {
    return thunkErrorHandler(thunkAPI, error);
  }
});

export const signInWithGoogle = createAsyncThunk('user/signInWithGoogle', async (data, thunkAPI) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user: IUser = {
      email: result.user.email,
      uid: result.user.uid,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    };
    return user;
  } catch (error) {
    return thunkErrorHandler(thunkAPI, error);
  }
});

export const signOut = createAsyncThunk('user/signOut', async (data, thunkAPI) => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    return thunkErrorHandler(thunkAPI, error);
  }
});

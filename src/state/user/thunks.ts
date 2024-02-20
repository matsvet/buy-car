// @ts-ignore

// import { auth } from '../../firebase/firebaseConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import firebase from 'firebase/app';

export const signInWithGoogle = createAsyncThunk('user/signInWithGoogle', async (_, { rejectWithValue }) => {
  try {
    // @ts-ignore

    // const provider = new firebase.auth.GoogleAuthProvider();
    // const result = await auth.signInWithPopup(provider);
    // const user = {
    //   email: result.user.email,
    //   uid: result.user.uid,
    //   displayName: result.user.displayName,
    //   photoURL: result.user.photoURL,
    // };
    // return user;
    return {};
  } catch (error) {
    // @ts-ignore

    return rejectWithValue(error.message);
  }
});

export const signOut = createAsyncThunk('user/signOut', async (_, { rejectWithValue }) => {
  try {
    // await auth.signOut();
  } catch (error) {
    // @ts-ignore
    return rejectWithValue(error.message);
  }
});

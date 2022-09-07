import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { User } from '../users/usersSlice';

export interface UsersState {
  info: null | User;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  info: null,
  status: 'idle',
};

export const fetchInfo = createAsyncThunk('info/fetchInfo', async (userId: undefined | string) => {
  const { data } = await axios.get(`https://api.github.com/users/${userId}`);
  return data;
});

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<User>) {
      state.info = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.info = null;
        state.status = 'loading';
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.info = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchInfo.rejected, (state) => {
        state.info = null;
        state.status = 'failed';
      });
  },
});

export const infoData = (state: RootState) => state.info;

export const { setItems } = infoSlice.actions;

export default infoSlice.reducer;

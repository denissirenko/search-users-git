import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { User } from '../users/usersSlice';

export interface AllUsersState {
  allusers: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AllUsersState = {
  allusers: [],
  status: 'idle',
};

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsersStatus', async () => {
  const { data } = await axios.get('https://api.github.com/users');
  return data;
});

export const allUsersSlice = createSlice({
  name: 'allusers',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<User[]>) {
      state.allusers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.allusers = [];
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allusers = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.allusers = [];
        state.status = 'failed';
      });
  },
});

export const searchAllUsersData = (state: RootState) => state.allusers;

export const { setItems } = allUsersSlice.actions;

export default allUsersSlice.reducer;

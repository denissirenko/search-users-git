import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const searchUsersSlice = createSlice({
  name: 'searchUsers',
  initialState,
  reducers: {
    searchUsers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { searchUsers } = searchUsersSlice.actions;

export default searchUsersSlice.reducer;

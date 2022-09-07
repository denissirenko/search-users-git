import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const searchRepoSlice = createSlice({
  name: 'searchRepo',
  initialState,
  reducers: {
    searchRepo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { searchRepo } = searchRepoSlice.actions;

export default searchRepoSlice.reducer;

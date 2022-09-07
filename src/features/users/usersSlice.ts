import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type User = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: null | string;
  blog: string;
  location: null | string;
  email: null | string;
  hireable: null | string;
  bio: null | string;
  twitter_username: null | string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsersStatus',
  async (searchUsersValue: string) => {
    const { data } = await axios.get(
      `https://api.github.com/users${searchUsersValue.length ? '/' + searchUsersValue : ''}`,
    );
    return data;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.users = [];
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.status = 'idle';
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.users = [];
        state.status = 'failed';
      });
  },
});

export const searchUsersData = (state: RootState) => state.users;

export const { setItems } = usersSlice.actions;

export default usersSlice.reducer;

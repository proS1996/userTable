import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.list.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        console.log('Fetch users pending');
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log('Fetch users succeeded', action.payload);
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log('Fetch users failed', action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice;

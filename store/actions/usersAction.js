import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Adjust the API endpoint as necessary
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  return data;
});
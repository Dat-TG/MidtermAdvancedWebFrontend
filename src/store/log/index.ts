import { extraReducers } from './thunkApi';
import { createSlice } from '@reduxjs/toolkit';
import { ILogStore } from '@/types';

export const initialState: ILogStore = {
  data: {
    data: [],
    pageCount: 0,
  },
};
const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {},
  extraReducers,
});

export default logSlice.reducer;

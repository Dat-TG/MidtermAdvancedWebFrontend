import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ILogRespone, ILogSearch, ILogStore } from '@/types';
import { logApi } from '@/api';

export const getAllLog = createAsyncThunk(
  'log/getAllLog',
  async (params: ILogSearch) => {
    const res = await logApi.getAllLog(params);
    return res;
  }
);

export const extraReducers = (builders: ActionReducerMapBuilder<ILogStore>) => {
  builders.addCase(
    getAllLog.fulfilled,
    (state: ILogStore, action: PayloadAction<ILogRespone>) => {
      state.data = action.payload;
    }
  );
};

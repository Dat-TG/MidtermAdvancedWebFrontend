import { AnyAction, combineReducers, Reducer } from 'redux';
import userSlice from '@/store/user';
import globalSlice from '@/store/global';
import logSlice from '@/store/log';
import { AppState } from '@/store/index';

export const DESTROY_ACTION = 'DESTROY_STORE';

export const combinedReducer = combineReducers({
  user: userSlice,
  global: globalSlice,
  log: logSlice,
});

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  if (action.type === DESTROY_ACTION) {
    state = {} as AppState;
  }
  return combinedReducer(state, action);
};

export default rootReducer;

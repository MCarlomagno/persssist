import { combineReducers, configureStore} from '@reduxjs/toolkit';
import accounts from './slices/accounts';
import storage from './slices/storage';

const reducers = {
  accounts,
  storage
}

export function makeStore() {
  return configureStore({
    reducer: reducers
  });
}

export const rootReducer = combineReducers(reducers);

const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
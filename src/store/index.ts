import { combineReducers, configureStore} from '@reduxjs/toolkit';
import accounts from './slices/accounts';
import blockchain from './slices/blockchain';

const reducers = {
  accounts,
  blockchain
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
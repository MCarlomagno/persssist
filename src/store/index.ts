import { combineReducers, configureStore} from '@reduxjs/toolkit';
import accountSlice from './slices/accounts';

export function makeStore() {
  return configureStore({
    reducer: { 
      accountSlice
    },
  });
}

export const rootReducer = combineReducers({
  accounts: accountSlice,
});

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
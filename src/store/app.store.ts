import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../slices/app.slice'

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
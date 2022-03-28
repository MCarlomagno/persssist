import { createSlice } from '@reduxjs/toolkit';
import { ConnectionState } from '../../../enums/connection-state';

declare let window: any;

export const accounts = createSlice({
    name: 'accounts',
    initialState: {
        list: [] as string[],
        connectionState: ConnectionState.DISCONNECTED,
    },
    reducers: {
        setAccounts: (state, action) => {
            state.list = [...action.payload];
        },
        setConnectionstate: (state, action) => {
            if(window.ethereum) {
                state.connectionState = action.payload ;
            }else {
                state.connectionState = ConnectionState.UNAVAILABLE;
            }
        },
    },
    
});

export const { setAccounts, setConnectionstate } = accounts.actions;
export default accounts.reducer;

export const fetchAccounts = () => (dispatch: any) => {
    window.ethereum.request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
            dispatch(setConnectionstate(accounts.length > 0 ? ConnectionState.CONNECTED : ConnectionState.DISCONNECTED))
            return dispatch(setAccounts(accounts));
        })
        .catch((err: any) => console.log(err));
}

export const requestAccounts = () => (dispatch: any) => {
    window.ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
            dispatch(setConnectionstate(accounts.length > 0 ? ConnectionState.CONNECTED : ConnectionState.DISCONNECTED))
            return dispatch(setAccounts(accounts));
        })
        .catch((err: any) => console.log(err));
}
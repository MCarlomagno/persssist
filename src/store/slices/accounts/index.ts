import { createSlice } from '@reduxjs/toolkit';
import { ConnectionState } from '../../../enums/connection-state';
import { AppBlockchain } from '../../../lib/blockchain';

const blockchain = new AppBlockchain();

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
            if(typeof window === "undefined") return;
            if(window.ethereum) {
                state.connectionState = action.payload;
            }else {
                state.connectionState = ConnectionState.UNAVAILABLE;
            }
        },
    },
    
});

export const { setAccounts, setConnectionstate } = accounts.actions;
export default accounts.reducer;

const connectionState = (accounts: string[]) => {
    if(typeof window === "undefined") return;
    if(window.ethereum) {
        return accounts.length > 0 ? ConnectionState.CONNECTED : ConnectionState.DISCONNECTED;
    } else {
        return ConnectionState.UNAVAILABLE;
    }
}

export const checkExistingAccounts = () => (dispatch: any) => {
    blockchain.fetchAccounts().then((acc: string[]) => {
        if(acc && acc.length > 0) {
            dispatch(setAccounts(acc));
            dispatch(setConnectionstate(connectionState(acc)));
        }
    });
}

export const connectAccount = (errorCallback: (e: any) => void) => (dispatch: any) => {
    blockchain.fetchAccounts().then((acc: string[]) => {
        if(acc && acc.length > 0) {
            dispatch(setAccounts(acc));
            dispatch(setConnectionstate(connectionState(acc)));
        } else {
            blockchain.requestAccounts()
                .then((acc: string[]) => {
                    if(!acc || acc.length === 0) {
                        return errorCallback({
                            title: 'No Account detected',
                            msg: 'Please make sure to connect a Metamask account'
                        })
                    }
                    dispatch(setAccounts(acc));
                    dispatch(setConnectionstate(connectionState(acc)));
                });
        }
    });
}
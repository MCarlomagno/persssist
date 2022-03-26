import { createSlice } from '@reduxjs/toolkit';

declare let window: any;

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        list: [] as string[],
    },
    reducers: {
        setAccounts: (state, action) => {
            state.list = [...action.payload];
        },
    },
    
});

export const { setAccounts } = accountSlice.actions;
export default accountSlice.reducer;

export const fetchAccounts = () => (dispatch: any) => {
    window.ethereum.request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
            dispatch(setAccounts(accounts));
        })
        .catch((err: any) => console.log(err));
}
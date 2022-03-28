import { createSlice } from '@reduxjs/toolkit';
import { create, IPFSHTTPClient } from 'ipfs-http-client'

export const storage = createSlice({
    name: 'storage',
    initialState: {
        ipfs: create({
            host: 'ipfs.infura.io', 
            port: 5001, 
            protocol: 'https' 
        }) as IPFSHTTPClient,
    },
    reducers: {
        refresh: (state, action) => {
            state.ipfs = create({ 
                host: 'ipfs.infura.io', 
                port: 5001, 
                protocol: 'https' 
            }) as IPFSHTTPClient;
        }
    },
    
});

export const { refresh } = storage.actions;
export default storage.reducer;

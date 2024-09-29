import { configureStore } from '@reduxjs/toolkit';
import voteReducer from '../features/voter/voterSlice';
import walletReducer from '../features/wallet/walletSlice';
const store = configureStore({
    reducer:{
        wallet:walletReducer,
        vote:voteReducer
    }
})

export default store;
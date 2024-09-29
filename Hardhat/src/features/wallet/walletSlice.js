import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

// Thunk for checking wallet status
export const checkWalletStatus = createAsyncThunk(
  "wallet/checkWalletStatus",
  async (_, { rejectWithValue }) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        const account = accounts.length ? accounts[0].address : null;

        // Return the wallet status
        return {
        account
        };
      } else {
        alert("Metamask not found");
        return { account: null,error:'Metamask not Installed' };
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk for connecting to the wallet
export const connectWallet = createAsyncThunk(
  "wallet/connectWallet",
  async (_, { rejectWithValue }) => {
    try {
      if (!window.ethereum) {
        alert("Metamask not found");
        return {  account: null };
      }

      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await provider.listAccounts();
      const account = accounts[0].address;

      // Return wallet information
      return { account:account };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Wallet slice
const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    account: null,
    isConnected: false,
    loading:true
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      // Handling checkWalletStatus action
      .addCase(checkWalletStatus.pending, (state) => {
        state.status = "loading";
        state.loading = true
      })
      .addCase(checkWalletStatus.fulfilled, (state, action) => {
        state.loading = false
        const {  account , error } = action.payload;
        if(error){
            state.error = error
        }
        else{
            state.account = account;
            state.isConnected = !!account; // Check if account exists
            state.status = "succeeded";
        }
      })
      .addCase(checkWalletStatus.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false
        state.error = action.payload;
      })

      // Handling connectWallet action
      .addCase(connectWallet.pending, (state) => {
        state.status = "loading";
        state.loading = true
      })
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.loading = false
        const { account } = action.payload;
        state.account = account;
        state.isConnected = !!account;
        state.status = "succeeded";
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false
        state.error = action.payload;
      });
  },
});



export default walletSlice.reducer;
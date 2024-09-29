import { createSlice } from "@reduxjs/toolkit";


const voterSlice = createSlice({
    name:'voter',
    initialState:{
        voterDetails:{}
    },reducers:{
        setVotersDetails:(state,action)=>{
            state.voterDetails = action.payload;
        }
    }

})

export const {setVotersDetails} = voterSlice.actions


export default voterSlice
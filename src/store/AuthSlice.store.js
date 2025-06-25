import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:[]
}

const AuthSlice=createSlice({
    name:'AuthSlice',
    initialState,
    reducers:{
        login(state,action){
            state.status=true;
            state.userData=action.payload
        },
        logout(state){
            state.status=false;
            state.userData=null;
        }
    }
})

export const {login,logout}=AuthSlice.actions;
export default AuthSlice.reducer
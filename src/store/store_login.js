const { createSlice } = require("@reduxjs/toolkit");

const uiSlice = createSlice({
    name:'ui',
    initialState:{
        isCheckLogin:false,
        isCheckSideBar:true,
    },
    reducers:{
        toggleLogin:(state)=>{
            state.isCheckLogin=true
        },
        toggleLogout:(state)=>{
            state.isCheckLogin=false
        },
        toggleInSideBar:(state)=>{
            state.isCheckSideBar=true
        },toggleOutSideBar:(state)=>{
            state.isCheckSideBar=false
        }
    }
})
export const uiAction = uiSlice.actions
export default uiSlice.reducer
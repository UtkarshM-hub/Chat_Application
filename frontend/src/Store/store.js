import { createSlice,configureStore } from '@reduxjs/toolkit';

const ChatSlice=createSlice({
    name:"ChatSlice",
    initialState:{
        Friends:[]
    },
    reducers:{
        createMessage(state,actions){
            console.log(actions.payload);
        }
    }
});

const store=configureStore({
    reducer:ChatSlice.reducer
})

export const ChatActions=ChatSlice.actions;
export default store;
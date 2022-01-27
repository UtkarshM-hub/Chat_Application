import { createSlice,configureStore } from '@reduxjs/toolkit';

const chatSlice=createSlice({
    name:"ChatSlice",
    initialState:{
        chat:{
            rooms:[
                
            ],
            js:[]
        }
    },
    reducers:{
        addToChat(state,action){
            const {name}=action.payload;
            if(name==="js"){
                console.log(state.chat.js)
            }
        }
    }
});

const store=configureStore({
    reducer:chatSlice.reducer
});

export const chatAction=chatSlice.actions;
export default store;
import { createSlice,configureStore } from '@reduxjs/toolkit';

const ChatSlice=createSlice({
    name:"ChatSlice",
    initialState:{
        Friends:[],
        Notifications:[],
    },
    reducers:{
        createMessage(state,actions){
            console.log(actions.payload);
        },
        AddNotification(state,actions){
            const {Notifications}=actions.payload;
            console.log(Notifications)
            state.Notifications=[...state.Notifications,Notifications]
            return;
        }
    },
    
});


const store=configureStore({
    reducer:ChatSlice.reducer,
})

export const ChatActions=ChatSlice.actions;
export default store;
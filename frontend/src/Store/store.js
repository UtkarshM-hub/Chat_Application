import { createSlice,configureStore } from '@reduxjs/toolkit';

const ChatSlice=createSlice({
    name:"ChatSlice",
    initialState:{
        Friends:[],
        Notifications:{
            Requests:[],
            notification:[],
            Requested:[]
        },
    },
    reducers:{
        createMessage(state,actions){
            console.log(actions.payload);
        },
        AddNotification(state,actions){
            const {notification,Requests,Requested}=actions.payload;
            // console.log(notification,Requests,Requested);
            state.Notifications.notification=notification===undefined?[]:notification;
            state.Notifications.Requests=Requests===undefined?[]:Requests;
            state.Notifications.Requested=Requested===undefined?[]:Requested;
            return;
        },
        AddRequest(state,actions){
            const {Request}=actions.payload;
            state.Notifications.Requests=[...state.Notifications.Requests,Request]
            return;
        },
        RemoveRequest(state,actions){
            const {id}=actions.payload;
            console.log("Removing")
            state.Notifications.Requests=state.Notifications.Requests.filter((item)=>item.from._id!==id);
            return;
        },
        AddRequested(state,actions){
            const {id}=actions.payload;
            if(state.Notifications.Requested===undefined){
                state.Notifications.Requested=[];
            }
            state.Notifications.Requested=[...state.Notifications.Requested,{To:id}]
            return;
        },
        RemoveRequested(state,actions){
            const {id}=actions.payload;
            console.log(id)
            state.Notifications.Requested=state.Notifications.Requested.filter((item)=>console.log(item));
            return;
        },
        DenyRequest(state,actions){
            const {friendId}=actions.payload;
            console.log(friendId);
            state.Notifications.Requests=state.Notifications.Requests.filter((item)=>item.from._id.toString()!==friendId.toString());
            return;
        },
        DenyRequested(state,actions){
            const {friendId}=actions.payload;
            console.log(friendId);
            state.Notifications.Requested=state.Notifications.Requested.filter((item)=>item.To.toString()!==friendId.toString());
            return;
        },
        AddFriend(state,actions){
            const data=actions.payload;
            console.log(data)
            const exists=state.Friends.find((item)=>item.friend.id===data.id);
            if(!exists){
                state.Friends=[...state.Friends,data];
            }
            return;
        },
        setFriend(state,actions){
            const data=actions.payload;
            state.Friends=data;
            return;
        }
    },
    
});


const store=configureStore({
    reducer:ChatSlice.reducer,
})

export const ChatActions=ChatSlice.actions;
export default store;
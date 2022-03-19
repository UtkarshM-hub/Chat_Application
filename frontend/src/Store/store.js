import { createSlice,configureStore } from '@reduxjs/toolkit';
//{id:of conversation,messages:[]}
const ChatSlice=createSlice({
    name:"ChatSlice",
    initialState:{
        Friends:[],
        Notifications:{
            Requests:[],
            notification:[],
            Requested:[]
        },
        Messages:[]
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
        },
        IsMyFriendOnline(state,actions){
            const {id,socketId}=actions.payload;
            const IsFriend=state.Friends.findIndex((item)=>item.friend.id._id.toString()===id.toString());
            if(IsFriend===-1){
                return;
            }
            let updatedArray=state.Friends;
            updatedArray[IsFriend].friend.id.IsOnline=true;
            updatedArray[IsFriend].friend.id.socketId=socketId;
            state.Friends=updatedArray;
            return;
        },
        IsMyFriendOffline(state,actions){
            const {id}=actions.payload;
            console.log(id);
            const IsFriend=state.Friends.findIndex((item)=>item.friend.id._id===id);
            if(IsFriend===-1){
                return;
            }
            let updatedArray=state.Friends;
            updatedArray[IsFriend].friend.id.IsOnline=false;
            state.Friends=updatedArray;
            return;
        },
        AddMessage(state,actions){
            const {id,message,userId,friendId}=actions.payload;
            let updatedArray=state.Messages;
            const doesExist=state.Messages.findIndex((item)=>item._id===id);
            console.log(doesExist);
            if(doesExist===-1){
                let newObject={_id:id,messages:[{from:userId,to:friendId,message:message}]};
                updatedArray=[...updatedArray,newObject];
                state.Messages=updatedArray;
                return;
            }
            if(doesExist!==-1){
                updatedArray[doesExist].messages=[...updatedArray[doesExist].messages,{from:userId,to:friendId,message:message}];
                state.Messages=updatedArray;
                return;
            }
        },
        SetMessages(state,actions){
            const {messages}=actions.payload;
            state.Messages=messages;
            return;
        }
    },
    
});


const store=configureStore({
    reducer:ChatSlice.reducer,
})

export const ChatActions=ChatSlice.actions;
export default store;
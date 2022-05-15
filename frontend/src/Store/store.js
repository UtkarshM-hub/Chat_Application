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
        Messages:[],
        ActiveContact:{},
        Inventory:[],
        cart:[],
        TotalAmount:0,
        Settings:{
            Profile:{},
            GeneralDetails:{
                SelectedAddress:""
            },
            Payments:{}
        },
        Orders:[],
        Sales:[],
        user:{},
        Analytics:{}
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
                state.Friends=[...state.Friends,{friend:{id:data.friend},conversationId:data.conversationId}];
                
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
            const IsFriend=state.Friends.findIndex((item)=>item.friend.id._id===id);
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
            console.log(actions.payload)
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
        },
        setActiveContact(state,actions){
            const contact=actions.payload;
            state.ActiveContact=contact;
            return;
        },
        setActiveSocket(state,actions){
            const {socketId}=actions.payload;
            let newCt=state.ActiveContact;
            newCt.socketId=socketId;
            state.ActiveContact=newCt;
            return;
        },
        AddSection(state,actions){
            const data=actions.payload;
            state.Inventory=[...state.Inventory,data];
            return;
        },
        setInventory(state,actions){
            const Inventory=actions.payload;
            state.Inventory=Inventory;
            return;
        },
        RemoveSection(state,actions){
            const {id}=actions.payload;
            state.Inventory=state.Inventory.filter((item)=>item._id!==id);
            return;
        },
        UpdateSection(state,actions){
            const {_id,Name,Type,Image}=actions.payload;
            let updateInventory=state.Inventory;
            const index=updateInventory.findIndex((item)=>item._id===_id);
            updateInventory[index].Name=Name;
            updateInventory[index].Type=Type;
            updateInventory[index].Image=Image;
            state.Inventory=updateInventory;
            return;
        },
        AddItemToSection(state,actions){
            const {sectionId,data}=actions.payload;
            const sectionIndex=state.Inventory.findIndex((item)=>item._id===sectionId);
            let updatedInventory=state.Inventory;
            updatedInventory[sectionIndex].Items=[...updatedInventory[sectionIndex].Items,{ProductId:data}];
            state.Inventory=updatedInventory;
            return;
        },
        RemoveItemFromSection(state,actions){
            const {SectionId,_id}=actions.payload;
            console.log(SectionId,_id)
            let updatedInventory=state.Inventory;
            try{
                const sectionIndex=updatedInventory.findIndex((item)=>item._id===SectionId);
                state.Inventory[sectionIndex].Items=updatedInventory[sectionIndex].Items.filter((item)=>item.ProductId._id!==_id);
            }
            catch(err){
                return;
            }
            return;
            
        },
        UpdateItemFromSection(state,actions){
            const {data,SectionId,_id}=actions.payload;
            let updatedInventory=state.Inventory;
            console.log(SectionId);
            const sectionIndex=updatedInventory.findIndex((item)=>item._id===SectionId);
            console.log(sectionIndex);
            const ItemIndex=updatedInventory[sectionIndex].Items.findIndex((item=>item.ProductId._id===_id));
            console.log(ItemIndex);
            updatedInventory[sectionIndex].Items[ItemIndex].ProductId=data;
            state.Inventory=updatedInventory;
            return;
        },
        ForwardMessage(state,actions){
            const userId=localStorage.getItem("userId");
            const {message,data}=actions.payload;
            let updatedState=state.Messages;
            console.log(data.length)
            for(let i=0;i<data.length;i++){
                console.log("This is happening")
                let doesExist=updatedState.findIndex((item)=>item._id===data[0].convoId);
                if(doesExist===-1){
                    let newObject={_id:data[0].convoId,messages:[{from:userId,to:data[0].id,message:message}]};
                    updatedState=[...updatedState,newObject];
                    state.Messages=updatedState;
                }
                if(doesExist!==-1){
                    updatedState[doesExist].messages=[...updatedState[doesExist].messages,{from:userId,to:data[0].id,message:message}];
                    state.Messages=updatedState;
                }
            }
            return;
        },
        setCart(state,actions){
            const data=actions.payload;
            state.cart=data;
            state.TotalAmount=data.reduce((prev,curr)=>{
                console.log(prev,curr)
                return prev+(+curr.ProductId.Price*curr.Quantity);
            },0)
            return;
        },
        clearCart(state,actions){
            state.cart=[];
            return
        }
        ,
        IncreaseProductQty(state,actions){
            console.log("working")
            const {ProductId}=actions.payload;
            const index=state.cart.findIndex((item)=>item.ProductId._id===ProductId);
            state.cart[index].Quantity=state.cart[index].Quantity+1
            state.TotalAmount=state.cart.reduce((prev,curr)=>{
                console.log(prev,curr)
                return prev+(+curr.ProductId.Price*curr.Quantity);
            },0)
            return;
        },
        DecreaseProductQty(state,actions){
            console.log("working")
            const {ProductId}=actions.payload;
            const index=state.cart.findIndex((item)=>item.ProductId._id===ProductId);
            if(state.cart[index].Quantity!==1){
            state.cart[index].Quantity=state.cart[index].Quantity-1;
            }
            if(state.cart[index].Quantity===1){
            state.cart[index].Quantity=1;
            }
            state.TotalAmount=state.cart.reduce((prev,curr)=>{
                console.log(prev,curr)
                return prev+(+curr.ProductId.Price*curr.Quantity);
            },0)
            return;
        },
        RemoveFromCartHandler(state,actions){
            const {ProductId}=actions.payload;
            const obj=state.cart.find((item)=>item._id.toString()===ProductId.toString());
            console.log(obj)
            let realVal=obj.Quantity*(+obj.ProductId.Price);
            console.log(realVal);
            state.TotalAmount=state.TotalAmount-realVal;
            state.cart=state.cart.filter((item)=>item._id.toString()!==ProductId.toString())
            return
        },
        SetSettings(state,actions){
            const data=actions.payload;
            state.Settings=data;
            return
        },
        SetSelectedAddress(state,actions){
            state.Settings.GeneralDetails.SelectedAddress=actions.payload._id;
            return;
        },
        AddAddressHandler(state,actions){
            const data=actions.payload;
            state.Settings.GeneralDetails.Addresses=[...state.Settings.GeneralDetails.Addresses,data];
            return;
        },
        setOrders(state,actions){
            const data=actions.payload;
            state.Orders=data;
            return;
        },
        setSales(state,actions){
            const data=actions.payload;
            state.Sales=data;
            return;
        },
        setUser(state,actions){
            const data=actions.payload;
            state.user=data;
        },
        setImage(state,actions){
            const ImageUrl=actions.payload.url;
            state.user.ProfilePic=ImageUrl;
            return;
        },
        setAnalytics(state,actions){
            const analytics=actions.payload;
            state.Analytics=analytics;
            return
        }
    },
    
});


const store=configureStore({
    reducer:ChatSlice.reducer,
})

export const ChatActions=ChatSlice.actions;
export default store;
// import { createSlice } from "@reduxjs/toolkit";


// export const ReduxSlice=createSlice({
//     name:'slice',
//     initialState:{
//         theme:'light',
//         signing:'signup',
//         user:null,
//         insidesignin:null,
//         totaltables:'',
//         bookedtables:'',
//         bookeduserid:'',
//         unbookedtables:'',
//         usersnumbers:'',
//         suppliersnumber:'',
//         usertablebookingnum:0,
//         orderdetails:'',
//         supierloginname:'',
//         totalprice:[],
        


//     },

//     reducers:{
//         themes:(state,action)=>{
//             state.theme=action.payload
//         },
//         signings:(state,action)=>{
//             state.signing=action.payload
//         },
//         userinfo:(state,action)=>{
//             state.user=action.payload
//         },
//         insidesign:(state,action)=>{
//             state.insidesignin=action.payload
//         },
//         tablenumber:(state,action)=>{
//             state.totaltables=action.payload
//         },
//         bookedtable:(state,action)=>{
//             state.bookedtables=action.payload
//         },
//          unbookedtable:(state,action)=>{
//             state.unbookedtables=action.payload
//         },
//         bookedusersid:(state,action)=>{
//             state.bookeduserid=action.payload
//         },
//         usersnumb:(state,action)=>{
//             state.usersnumbers=action.payload
//         },
//         suplersnumb:(state,action)=>{
//             state.suppliersnumber=action.payload
//         },
//         usernoofbooking:(state,action)=>{
//             state.usertablebookingnum=action.payload
//         },
//         bookingorderdetails:(state,action)=>{
//             state.orderdetails=action.payload

//         },
//         supliername:(state,action)=>{
//             state.supierloginname=action.payload

//         },
//         totalorderprice:(state,action)=>{
//             state.totalprice.push(action.payload)
//         },

//     }
// })


// export const {themes,signings,userinfo,insidesign,tablenumber,
//     unbookedtable,bookedtable,bookedusersid,suplersnumb,usersnumb,
//     usernoofbooking,bookingorderdetails,supliername,totalorderprice}=ReduxSlice.actions;

// export const SelectTheme=(state)=>state.reduxstore.theme
// export const Selectsigning=(state)=>state.reduxstore.signing
// export const SelectUser=(state)=>state.reduxstore.user
// export const SelectInsidesign=(state)=>state.reduxstore.insidesignin
// export const Selecttablenumber=(state)=>state.reduxstore.totaltables
// export const Selectbookedtables=(state)=>state.reduxstore.bookedtables
// export const Selectunbookedtables=(state)=>state.reduxstore.unbookedtables
// export const SelectbookeduserID=(state)=>state.reduxstore.bookeduserid
// export const Selectusersnumb=(state)=>state.reduxstore.usersnumbers
// export const SelectSupliernumb=(state)=>state.reduxstore.suppliersnumber
// export const SelectUserbookingnum=(state)=>state.reduxstore.usertablebookingnum
// export const Selectbookingorderdetails=(state)=>state.reduxstore.orderdetails
// export const Selectloginsuplier=(state)=>state.reduxstore.supierloginname
// export const Selectorderprice=(state)=>state.reduxstore.totalprice



// export default ReduxSlice.reducer




import { createSlice } from "@reduxjs/toolkit";


export const ReduxSlice=createSlice({
    name:'slice',
    initialState:{
      adminSignIn:false,
      userSignInfo:[],
      orderInfo:[]
       
        


    },

    reducers:{
        adminSignInAction:(state,action)=>{
            state.adminSignIn=action.payload
        },
        userSignInAction:(state,action)=>{
            state.userSignInfo=action.payload
        },
        orderBookingInfo:(state,action)=>{
            state.orderInfo=action.payload
        },
      
      
    

    }
})


export const {adminSignInAction,userSignInAction,orderBookingInfo}=ReduxSlice.actions;

export const SelectAdminSignIn=(state)=>state.reduxstore.adminSignIn
export const SelectUserSignIn=(state)=>state.reduxstore.userSignInfo
export const SelectOrderInfo=(state)=>state.reduxstore.orderInfo




export default ReduxSlice.reducer
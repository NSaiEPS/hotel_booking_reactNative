import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconedit from 'react-native-vector-icons/MaterialIcons';

import firestore from '@react-native-firebase/firestore';
import { SelectOrderInfo } from './Redux/Redux_Slice';
import { useSelector } from 'react-redux';



const OrderItems = ({item}) => {
    let selectOrderInfo=useSelector(SelectOrderInfo)

   const [orderInputs, setorderInputs] = useState({
    name:item.data?.name,
    noofitems:item.data?.noofitems,
    edit:false,
    update:false,
    delete:false,
    price:item.data.price
   })


   let handleupdateOrder=()=>{
    setorderInputs({
        ...orderInputs,
        edit:(!orderInputs.edit)
    })
    if(orderInputs.edit){ 
        
    
        firestore().collection('tables').doc((selectOrderInfo?.tableid)).collection('orders').doc((item.id)).update({
            name: orderInputs.name,
            noofitems: orderInputs.noofitems,
            price: orderInputs.price
        }).then(alert("Editted successfully")).catch(e=>alert(e.message))
        
    } 

   }

   let conformOrderCancel=()=>{
    firestore().collection('tables').doc((selectOrderInfo?.tableid)).collection('orders').doc((item.id)).delete().then(alert("Deleted successfully")).catch(e=>alert(e.message))

   }

   let handleDeleteOrder=()=>{
    Alert.alert('Warning','Are you sure to cancel booking!',[

        {text:"Yes",
        onPress:()=>{conformOrderCancel()},
        style:'cancel'
        },
        {text:"No",
        onPress:()=>alert('Ok'),
        style:'default'
        },
        
        
        ],
        {cancelable:true}
            )
   }
  return (

    <View style={styles.orderItems} >
       
       
        <View  style={styles.orderItemsInside}>
   
    <View style={{ width:'50%',padding:2, }} ><Text style={{fontWeight:'700'}}>Name</Text></View>
     <View style={{
        backgroundColor:'white', width:'50%',
        //  paddingLeft:5, padding:2,borderRadius:5,height:30
        }} >
            <TextInput 
            style={styles.orderItemsTextInput}
            value={orderInputs.name}
            onChangeText={(text)=>{
                if(orderInputs.edit){

                setorderInputs({
                    ...orderInputs,
                    name:text
                })}
                else {
                    alert("Click edit btn to edt")
                }

            }}
            />
            {/* <Text>{item.data?.name} </Text> */}
            </View>

    </View>



    <View  style={styles.orderItemsInside}>
   
   <View style={{ width:'50%',padding:2 }} ><Text style={{fontWeight:'700'}}>no.of items</Text></View>
    <View style={{
        backgroundColor:'white', width:'50%', 
        // paddingLeft:5, padding:2,borderRadius:5
        }} >
            <TextInput 
             keyboardType='decimal-pad'

              style={styles.orderItemsTextInput}
               value={orderInputs.noofitems}
               onChangeText={(text)=>{
                if(orderInputs.edit){

                   setorderInputs({
                       ...orderInputs,
                       noofitems:text
                   })}
                    else {
                        alert("Click edit btn to edit")
                    }
   
               }}
            />
       
            
            </View>

   </View>

   <View  style={styles.orderItemsInside}>
   
   <View style={{ width:'50%',padding:2 }} ><Text style={{fontWeight:'700'}}>update</Text></View>
    <View style={{
      
          paddingLeft:5, padding:2,borderRadius:5, marginLeft:'auto'}} >
            
            <Text onPress={ handleupdateOrder}>
                 <Iconedit name={orderInputs.edit ? 'file-upload':'edit' } size={30} color={orderInputs.edit ? 'blue':'green' } />
 
        </Text></View>

   </View>

   <View  style={styles.orderItemsInside}>
   
   <View style={{ width:'50%',padding:2 }} ><Text style={{fontWeight:'700'}}>Delete</Text></View>
    <View style={{
        // backgroundColor:'white',
        //  width:'50%',
          paddingLeft:5, padding:2,borderRadius:5, marginLeft:'auto'
    }} ><Text onPress={handleDeleteOrder} >
         <Icon name={ 'delete' } size={30} color="red" />
         </Text></View>

   </View>

   <View  style={styles.orderItemsInside}>
   
   <View style={{ width:'50%',padding:2 }} ><Text style={{fontWeight:'700'}}>Price</Text></View>
    <View style={{
        backgroundColor:'white', width:'50%',position:'relative'
        //  paddingLeft:5, padding:2,borderRadius:5, height:30
         }} >
           <Text style={{ position:'absolute', left:0, top:5, color:'red',
            elevation:2, zIndex:2, fontSize:20 }} > ₹   </Text>

             <TextInput 
             style={[styles.orderItemsTextInput, 
                {
                paddingLeft:17}]}
             keyboardType='decimal-pad'
               value={orderInputs.price}
               onChangeText={(text)=>{
                // if(true){
                // alert("U can't edit the price, only the supplier can edit the price")}
                // else{
                   setorderInputs({
                       ...orderInputs,
                       price:text
                   })
                // }
   
               }}
            />
            {/* <Text>
                
                 {item.data.price}</Text> */}
            </View>

   </View>




    
 

            
            
            

    </View>    

  )
}

export default OrderItems

const styles = StyleSheet.create({
    orderItems:{
        marginTop:10,
        backgroundColor:'#ffcbcd',

    },
    orderItemsInside:{
        display:'flex',
        flexDirection:'row',
        marginTop:5,
        padding:2
    },

    orderItemsTextInput:{
        height:40,
         backgroundColor:'white',
        //  width:'100%',
        paddingLeft:10,
        fontSize:15
    }
})
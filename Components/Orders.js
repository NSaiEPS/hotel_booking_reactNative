import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SelectOrderInfo } from './Redux/Redux_Slice'
import firestore from '@react-native-firebase/firestore';
import OrderItems from './OrderItems';


const Orders = ({}) => {
    // bookeduserid:bookerid,
    // tableid:id,
    // tablenumb:tablenum,
    // bookername:bookedby
    let selectOrderInfo=useSelector(SelectOrderInfo)
    // console.log(selectOrderInfo)


    let [order, setOrders] = useState([])
  
    // let len = 0;
    // let id="02WuK1lwDZI9JV9GA2QN"
    useEffect(() => {
        firestore().collection('tables').doc((selectOrderInfo?.tableid)).collection('orders').orderBy('noofitems','desc').onSnapshot((snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({
  
          id: doc.id,
          data: doc.data(),
  
        })))
  
       
      });
  

  
    }, [])

    // console.log(orders)

  return (
    <View style={styles.orders }>
      <View style={styles.ordersInside} >
      {/* <FlatList
           data={orders}
           scrollEnabled={true}
           renderItem={({item})=>{
           return(

           <View>
<OrderItems item={item}/>
         
</View>)}}/> */}

<ScrollView>

             {order.map((data,index)=>{
              return(
              <View key={index} >

<OrderItems  item={data}/>

 </View>)


             }) }
             </ScrollView>
      </View>
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({

    orders:{
        backgroundColor:'white',
        width:'95%',
        marginLeft:'auto',
        marginRight:'auto',
        
    },
    ordersInside:{
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
        display:'flex',
       overflow:'scroll',
       height:350
        

    }

})
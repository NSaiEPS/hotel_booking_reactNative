import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Header from '../Components/Header'
import { useSelector } from 'react-redux'
import { SelectOrderInfo, SelectUserSignIn } from '../Components/Redux/Redux_Slice'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orders from '../Components/Orders'
import firestore from '@react-native-firebase/firestore';


const TablesInfoScreen = ({navigation, route}) => {
  let selectOrderInfo=useSelector(SelectOrderInfo)
  const windowWidth = Dimensions.get('window')
// console.log(windowWidth,'order screen')

  useLayoutEffect(()=>{
    navigation.setOptions({headerShown: false})
  },[])
  let selectUserSignIn=useSelector(SelectUserSignIn)

 const [orderForm,setOrderForm]=useState({
  micOpen:false,
  orderName:'',
  orderNumber:"",
  micInput:'',
  language:''

 })


let handleAddOrders=()=>{
  let reqname=(orderForm.orderName || orderForm.micInput)
  firestore().collection('tables').doc((selectOrderInfo?.tableid)).collection('orders').add({
    name: reqname,
        noofitems: orderForm.orderNumber,
        price: ''


  }).then(()=>{
    setOrderForm({
      ...orderForm,
      micOpen:false,
      orderName:'',
      orderNumber:"",
      micInput:'',
      language:''

    })
  }).catch(e=>alert(e))
  


}
 
  return (
    <SafeAreaView  style={styles.tablesInfoScreen}  >
      <View tyle={styles.tablesInfoScreenView} >
        <Header/>

        <ScrollView  style={styles.tablesInfoScreenInside}>
          <View style={styles.tablesInfoScreenInsideTop}>
          <Text
          style={{ color:'#fff',
           fontSize:22,
           fontWeight:'700'
          }}
          >{
            selectOrderInfo.survedby===selectUserSignIn?.email ? 
            `Helo '${selectUserSignIn?.name}' this is your supplying order page ( ${selectOrderInfo.tablenumb})`
            :
          
            
            `Helo '${selectUserSignIn?.name}' this is your order booking page (Table ${selectUserSignIn?.tablebooked})`
            

          }
          </Text>
          <View
            
            style={ styles.tablesInfoScreenInsideTopbackbtn}
             
             >
               
            <Button 
            title='Go back'
            onPress={()=>{
             navigation.goBack()
 
            }}
            />
            </View>

          </View>

          <View style={styles.tablesInfoScreenInsideOrderInput}>
          <View  style={styles.tablesInfoScreenInsideOrderInputInside}>
            <TextInput placeholder='Enter your orders here..' style={styles.tablesInfoScreenInsideOrderInputInsideTaxt} 
             value={orderForm.orderName} onChangeText={(text)=>setOrderForm({
              ...orderForm,
              orderName:text


             })}  />


            <TextInput placeholder='No.of Items' keyboardType='decimal-pad' style={styles.tablesInfoScreenInsideOrderInputInsideTaxt}
             value={orderForm.orderNumber}  onChangeText={(text)=>setOrderForm({
              ...orderForm,
              orderNumber:text


             })}/>
            
            <View style={{position:'relative'}}>
            <TextInput placeholder='Use Mic to enter in telugu' style={styles.tablesInfoScreenInsideOrderInputInsideTaxt} 
             value={orderForm.micInput} onChangeText={(text)=>setOrderForm({
              ...orderForm,
              micInput:text


             })} />
           
           <View style={{position:'absolute', right:5, top:17}} >

           
            <Icon name={ !orderForm.micOpen? 'mic':"mic-off" }
              size={30} color={!orderForm.micOpen? 'green': "red"} />
              </View>
              {/* Link for native cli audio record https://www.npmjs.com/package/react-native-audio-recorder-player */}
           
            </View>
{/* <Picker
        selectedValue={items.category}
        style={{ color:'black',
      
    
      width:'93%',
      backgroundColor:'white',
    
      
      }}
        onValueChange={(itemValue, itemIndex) => setitems({
          ...items,
          category:itemValue
        })}
      >
        {Constants.products.map((item,index)=> (
               <Picker.Item
               key={index}
               
               label={item.name}  value={item.name}  />)


        )}


      </Picker> */}
          
          <TextInput  placeholder='for mic Language  ' style={styles.tablesInfoScreenInsideOrderInputInsideTaxt} />
         {
          (orderForm.orderName || orderForm.micInput) && (orderForm.orderNumber) &&
         
          <Button
              title="Add"
              onPress={handleAddOrders}
          
              loadingProps={{ size: 'small', color: 'white' }}
              buttonStyle={{
                backgroundColor: '#102041',
                borderRadius: 25,
                marginTop:7
              }} />}
          </View>

          
          </View>
          <View  style={{
            
          }}>
          <Orders/>
          {/* <Orders/> */}
        </View>
          
        </ScrollView>

        
      </View>
    </SafeAreaView>
  )
}

export default TablesInfoScreen

const styles = StyleSheet.create({
  tablesInfoScreenView:{

    backgroundColor:'#102041',
    


  },
  tablesInfoScreenInside:{
    // backgroundColor:'#f75282',
    // backgroundColor: '#051b30' ,
    backgroundColor:'#102041',

    // width:'95%',
    //  marginLeft:"auto",
    //  marginRight:'auto'
    // overflow:'s'
    
  },
  tablesInfoScreenInsideTop:{
    // color:'#ffffffff'
      display:'flex',
      // alignContent:'center',
      alignItems:'center',
      position:'relative',
      height:75,
      paddingTop:15,
      
  },
  tablesInfoScreenInsideTopbackbtn:{
    position:'absolute',
    top:45,
    right:10
  },
  tablesInfoScreenInsideOrderInput:{
    backgroundColor:'#f75282',
    marginTop:15,
    width:'95%',
     marginLeft:"auto",
     marginRight:'auto',
     borderRadius:10,
     borderWidth:2,
     borderColor:'white',
     marginBottom:10,
     paddingBottom:10
  },
  tablesInfoScreenInsideOrderInputInside:{
    width:'90%',
    marginLeft:"auto",
    marginRight:'auto'

  },
  tablesInfoScreenInsideOrderInputInsideTaxt:{
    backgroundColor:"white",
    marginTop:7,
    borderRadius:5,
    padding:10
  }




})
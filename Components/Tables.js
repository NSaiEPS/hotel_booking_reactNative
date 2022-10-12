import { Alert, Appearance, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { orderBookingInfo, SelectUserSignIn } from './Redux/Redux_Slice';
import firestore from '@react-native-firebase/firestore';


const Tables = ({name, active, bookedby, survedby, id, index,bookerid, bookeremail,navigation,length}) => {
 
   const [orderMoreOptions, setorderMoreOptions] = useState(false)
   let selectUserSignIn=useSelector(SelectUserSignIn)
  //  console.log(selectUserSignIn)
  let dispatch=useDispatch()

 let handleOrderMoreOptions=()=>{
  setorderMoreOptions(!orderMoreOptions)

 }

 let functiondatecheck=()=>{
  let today = new Date();
  let date = today.getFullYear()+' '+(today.getMonth()+1)+' '+today.getDate();
  let time = today.getHours() + ' ' + today.getMinutes() + ' ' + today.getSeconds();
    let dateTime = date+' '+time;
    // let timechecktimenow=dateTime;
  // let timedis=timechecktimenow.split(' ')

    return dateTime
}

let functiondate=()=>{

  let date=new Date()
  let newdate=`${date}`


  let dateformat=newdate.split(' ')
  let hrestime=dateformat[4].split(':')
 
  
  let reqsendtime;
  if(hrestime[0]>12){
    reqsendtime=(`${hrestime[0]-12}:${hrestime[1]}:${hrestime[2]} pm`)
  }
  else  reqsendtime=(`${hrestime[0]} :${hrestime[1]}:${hrestime[2]} am`)
  
  return `${dateformat[1]} ${dateformat[2]} ${dateformat[3]} ${reqsendtime}`


}


let conformBookingCancel=()=>{
  // alert('called')
  firestore().collection('tables').doc(id).update({
    ['active']: false,
    ['bookedby']:'',
    ['bookeduserid']:'',
    ['survedby']:'',
    ['bookeremail']:''
  })

  firestore().collection('users').doc(bookerid).update({
    ['active']: '',
     ['table']:''
  })




  firestore().collection("tables").doc(id).collection('orders')
.get()
.then(res => {
  res.forEach(element => {
    element.ref.delete();
  });
});
let timestamp=functiondatecheck()
let showtime=functiondate()


firestore().collection('users').doc(bookerid).collection('history').add({
  table:(index+1),
  status:'Cancelled',
  timestamp:timestamp,
  showtime:showtime
})
}



let handleCancelBtn=()=>{
 
  setorderMoreOptions(false)
  Alert.alert('Warning','Are you sure to cancel booking!',[

{text:"Yes",
onPress:()=>{conformBookingCancel()},
style:'cancel'
},
{text:"No",
onPress:()=>setorderMoreOptions(false),
style:'default'
},


],
{cancelable:true}
    )

}



let handleBookbnt=()=>{
  // console.log(selectUserSignIn?.tablebooked)

  if(selectUserSignIn?.tablebooked){
    alert(`U can't book more than 1 table!`)
  }
  else {
  

  

firestore().collection('tables').doc(id).update({
          ['active']: true,
          ['bookedby']:(selectUserSignIn?.name),
          ['bookeduserid']:(selectUserSignIn?.userId),
          ['bookeremail']:(selectUserSignIn?.email),
        })

        firestore().collection('users').doc((selectUserSignIn?.userId)).update({
          ['active']: true,
           ['table']:(index+1),

        })
       
  let timestamp=functiondatecheck()
  let showtime=functiondate()

firestore().collection('users').doc((selectUserSignIn?.userId)).collection('history').add({
  table:(index+1),
  status:'Booked',
  timestamp:timestamp,
  showtime:showtime
})

}

}


let onclickingOrders=()=>{

    navigation.navigate('Tables'
    
    // ,{
    //   bookeduserid:bookerid,
    //   tableid:id,
    //   tablenumb:tablenum,
    //   bookername:bookedby
    // }
    
    )
    setorderMoreOptions(false)
  

 let tablenum=`${name}${index+1}`

 dispatch(
  orderBookingInfo({
     bookeduserid:bookerid,
     tableid:id,
     tablenumb:tablenum,
     bookername:bookedby
   }

   )

 )
// Must delete this 
 // db.collection('users').doc(selectbookeduserid).collection('history').add({
 //   table:(index+1),
 //   status:'Booked'
 // })


}

const colorScheme = Appearance.getColorScheme();


let [phoneDarkModeCheck,setPhoneDarkModeCheck]=useState(false)

let checkdarkMode=()=>{
  // alert('called')

}



useEffect(()=>{
  if (colorScheme === 'dark') {
    setPhoneDarkModeCheck(true)
    
  }

    
    else {
      setPhoneDarkModeCheck(false)
  }

 
},[(Appearance.addChangeListener)])
  return (
    <View
    style={[styles.tables,
      {marginBottom:length===index+1? 225:0,
      
        borderColor: phoneDarkModeCheck ?'red':'white'
      }
    ] }
    >
     <View style={styles.tablesTopPart} >
     

      <Text
      style={{
     color:'#66b2ff',
     alignSelf:'center',
      fontSize:25,
       fontWeight:'700',
       

      }}
      > Table {index+1}</Text>

      {
        bookeremail && selectUserSignIn?.email===bookeremail &&
        
      

      <View
      style={
        styles.tableOrderInfoBtn
      }
      >
      <Icon onPress={handleOrderMoreOptions}
name={ orderMoreOptions? 'dots-two-vertical':"dots-three-vertical" }
size={30} color="white" />

     {/* {orderMoreOptions &&

      <View style={styles.tableOrderMoreInfo}
      >
        <Button 
        title='Orders'
        containerStyle={
          styles.tableOrderMoreInfoBtn
        }
        
        />

        <Button
        title='Cancel Booking'
        type='outline'
        containerStyle={
          styles.tableOrderMoreInfoBtn
        }
        />
      </View>} */}

      </View> }
     </View>

     <View  style={styles.tablesMiddlePart} >

      <Image 
      
      source={{
        uri:"https://img.archiexpo.com/images_ae/photo-m2/11520-13263878.jpg"

      }}
      style={{
        width:320,
         height:320,
         
      }}
      />

      <View
      style={
 
  [
  
    styles.tablesMiddlePartBookbtn,
    {
      backgroundColor: 
      bookeremail && selectUserSignIn?.email===bookeremail ? '#0000ff':
      active?
       '#ed094b': '#07eb75',
       width:bookeremail && selectUserSignIn?.email===bookeremail ? 200:150,
       borderColor: phoneDarkModeCheck ?'red':'white'
    }]
    

  

  

      }
      >
        <Text
        style={{
          color:'white',
          fontWeight:'700',
          fontSize:17
          
        }}
        onPress={handleBookbnt}

        >{
          bookeremail && selectUserSignIn?.email===bookeremail ? "It's your table, enjoy!":
        
          
          
          active? 'Booked':'Book' } </Text>
      </View>
      {orderMoreOptions &&

<View style={styles.tableOrderMoreInfo}>
 
 
  <Button 
  title='Orders'
  containerStyle={
    styles.tableOrderMoreInfoBtn
  }
  type='outline'

  onPress={onclickingOrders}
    
   
  buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
  
  />

  
  
  <Button
  title='Cancel Booking'
  containerStyle={
    styles.tableOrderMoreInfoBtn
  }
  buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}

onPress={handleCancelBtn}

  />

</View>}
     
     </View>

     <View style={styles.tablesBottmPart} >

      {
        bookeremail && selectUserSignIn?.email===bookeremail ? 
        <Text
        style={{
          color:"green",
          fontSize:20,
          fontWeight:'700'
        }}
        >
  You booked this Table {index+1}
        </Text>
      :
    
 active ?
  <Text
      style={{
        color:'white',
         fontSize:17.5
      }}
      >
        
        
         book by <Text
         style={{
          fontWeight:'700'
         }}
         >{bookedby}</Text> 
         </Text>
 : 

      <Text
      style={{
        color:'white',
         fontSize:17.5
      }}
      >
        
        
        ready to book</Text>}
     </View>
    </View>
  )
}

export default Tables

const styles = StyleSheet.create({

  tables:{
    borderColor:'white',
    borderWidth:1,
    width:'90%',
    marginLeft:'auto',
    marginRight:'auto',
    height:470,
    marginTop:10,
    marginBottom:10,
     backgroundColor:"#102041",
      borderRadius:10
  },
  tablesTopPart:{
    height:75,
     backgroundColor:'#2c4678',
     display:'flex',
      // alignContent:'center',
      justifyContent:'center',
       borderRadius:10
  },
  tablesMiddlePart:{
    height :340,
    display:'flex',
     alignItems:'center',
     justifyContent:'center',
      // borderColor:'white',
      //  borderWidth:1
     position:'relative',
     zIndex:0,
     elevation:0

},
tablesBottmPart:{
  height:48,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  // borderColor:'white',
  //      borderWidth:1
  
  
},

tablesMiddlePartBookbtn:{
  position:'absolute',
   top:215,
   zIndex:1,
   elevation:1,
   borderColor:'white',
       borderWidth:2,
        height:40,
         display:'flex',
         alignItems:'center',
         justifyContent:'center'
    
},

tableOrderInfoBtn:{
  position:'absolute',
  right:10,
  zIndex:3,
  elevation:3,
  
},
tableOrderMoreInfo:{
  width:160,
  backgroundColor:'#e8e6f3',
  height:125,
  display:'flex',
  justifyContent:'space-around',
  alignItems:'center',
  
  position:'absolute',
  top:-10,
  right:40
},
tableOrderMoreInfoBtn:{
  width:'85%',
   
},

}

)
import { Appearance, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-elements';
import AdminUserData from './AdminUserData';



const AdminUsers = () => {
  let [users,setUsers]=useState([])
  const colorScheme = Appearance.getColorScheme();
const {width, height} = Dimensions.get('window')
let [phoneDarkModeCheck,setPhoneDarkModeCheck]=useState(false)


  useEffect(()=>{

  firestore().collection('users').onSnapshot((snapshot)=>{
    setUsers(snapshot.docs.map((doc)=>({
        
        id:doc.id,
        data:doc.data(),
      
    })))
  }) ;

  if (colorScheme === 'dark') {
    setPhoneDarkModeCheck(true)
    
  }

    
    else {
      setPhoneDarkModeCheck(false)
  }
},[])


const scrollRef = useRef();
const [scrolToTopCheck, setscrolToTopCheck]=useState(false)
const onPressTouch = () => {
          
 

  if(scrolToTopCheck){
  // alert('top check true')
    

    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });

  }
    else {
  // alert('top check false')

  scrollRef.current?.scrollToEnd({ animated: true });}
}



let handleScroll=(e)=>{

  let scrolYval=(e.nativeEvent.contentOffset.y)
  
  if(scrolYval>1500){
    setscrolToTopCheck(true)
  }
  else {
    setscrolToTopCheck(false)
  }

}

  return (
    <View>
      
      <View style={[styles.ontouchScroll,{
borderColor:phoneDarkModeCheck ?'red':'white' , top:height-200
      }]}   >
        <TouchableOpacity onPress={onPressTouch}>
        <Text style={{alignSelf:'center'}} >
<Icon  name= {scrolToTopCheck ? 'angle-double-up': 'angle-double-down'} color='white'  size={35}/>
        </Text>
        </TouchableOpacity>

      </View>


      <ScrollView ref={scrollRef} onScroll={handleScroll} style={{backgroundColor:'#102041'}} >
        {users.map((data,index)=>{
       
          return(
            // <View key={data.id} style={[styles.adminUsers, {
            //   marginBottom:
            //  index+1===users.length ? 20:0 }]}>
             
            //   <View style={styles.adminUsersInside}>
            //   <View style={styles.adminUsersLeft}>
            //     <Text style={styles.adminUsersLeftText}>Name</Text>
            //   </View>
            //   <View style={styles.adminUsersRight}>
            //   <Text style={styles.adminUsersRightText}>{data.data.name}</Text> 
            //   </View>

            //   </View>


            //   <View style={styles.adminUsersInside}>
            //   <View style={styles.adminUsersLeft}>
            //     <Text style={styles.adminUsersLeftText}>Table booked</Text>
            //   </View>
            //   <View style={styles.adminUsersRight}>
            //   <Text style={styles.adminUsersRightText}>{data.data.table? data.data.table :'not yet'} </Text> 
            //   </View>

            //   </View>

            //   <View style={styles.adminUsersInside}>
            //   <View style={styles.adminUsersLeft}>
            //     <Text style={styles.adminUsersLeftText}>active </Text>
            //   </View>
            //   <View style={styles.adminUsersRight}>
            //   <Text style={styles.adminUsersRightText}>{data.data.active? 
            //   <Button 
            //   title='Yes'
            //   buttonStyle={{
            //     backgroundColor:'green'

            //   }}
            //   />
            //   : '--'
            //   }</Text> 
            //   </View>

            //   </View>



            //   <View style={styles.adminUsersInside}>
            //   <View style={styles.adminUsersLeft}>
            //     <Text style={styles.adminUsersLeftText}>Survedby </Text>
            //   </View>
            //   <View style={styles.adminUsersRight}>
            //   <Text style={styles.adminUsersRightText}>{data.data.survedby? 
            //   data.data.survedby?.split('@')[0]
            //   : '--'
            //   }</Text> 
            //   </View>

            //   </View>


            //   <View style={[styles.adminUsersInside,{borderBottomWidth:0}]}>
            //   <View style={styles.adminUsersLeft}>
            //     <Text style={styles.adminUsersLeftText}>Email </Text>
            //   </View>
            //   <View style={styles.adminUsersRight}>
            //   <Text style={styles.adminUsersRightText}>{data.data.email
            //   }</Text> 
            //   </View>

            //   </View>

              
            // </View>


            <AdminUserData key={data.id} data={data} index={index} length={users.length}/>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default AdminUsers

const styles = StyleSheet.create({
  adminUsers:{
    // backgroundColor:'#102041',
    borderWidth:1,
    borderColor:'red',
    marginTop:7

  },
  ontouchScroll:{
    borderColor:'white',
    borderWidth:3,
    position:'absolute',
    right:10,
    backgroundColor:'#102041',
    elevation:3,
    zIndex:3,
    width:70,
    height:70,
    borderRadius:40,
    display:'flex',
 
    justifyContent:'center',
  

  },
  adminUsersInside:{
    flexDirection:'row',
    borderBottomWidth:2,
    borderColor:'green',
    padding:5

  },
  adminUsersLeft:{
    width:'40%'
  },
  adminUsersLeftText:{
      fontSize:15,
      fontWeight:'900',
       color:'white'
  },  
  adminUsersRightText:{
    color:'white'
  }
  
})
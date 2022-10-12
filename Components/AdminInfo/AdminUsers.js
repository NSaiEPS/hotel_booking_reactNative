import { Appearance, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';



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
          
  scrollRef.current?.scrollTo({
    y: 0,
    animated: true,
  });

  if(scrolToTopCheck){

  }
    else {
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


      <ScrollView>
        {users.map((data,index)=>{
          return(
            <View key={data.id}>
              <View>
              <View>
                <Text>Name</Text>
              </View>
              <View>
               <Text>{data.data.name}</Text> 
              </View>

              </View>

              
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default AdminUsers

const styles = StyleSheet.create({
  ontouchScroll:{
    borderColor:'white',
    borderWidth:3,
    position:'absolute',
    
    // top:widheight,

    right:10,
    backgroundColor:'#102041',
    elevation:3,
    zIndex:3,
    width:70,
    height:70,
    borderRadius:40,
    display:'flex',
    // alignContent:'center',
    justifyContent:'center',
    // alignSelf:'center'

  }
})
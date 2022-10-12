import { Alert, Appearance, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';




const AdminSupliers = () => {
let [suplier,setsuplier]=useState([])
const colorScheme = Appearance.getColorScheme();
const {width, height} = Dimensions.get('window')
let [phoneDarkModeCheck,setPhoneDarkModeCheck]=useState(false)
const [scrolToTopCheck, setscrolToTopCheck]=useState(false)


const scrollRef = useRef();

  useEffect(()=>{
    firestore().collection('suppliers').onSnapshot((snapshot)=>{
      setsuplier(snapshot.docs.map((doc)=>({
          
          id:doc.id,
          data:doc.data(),
        
      })))
    })
    if (colorScheme === 'dark') {
      setPhoneDarkModeCheck(true)
      
    }
  
      
      else {
        setPhoneDarkModeCheck(false)
    }

  },[])


  let addnewsuplier=()=>{

  }
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


  let conformDeleteTable=(id)=>{
    firestore().collection('suppliers').doc(id).delete()
  
  }
  let handleDeleteTable=(id)=>{
    // console.log(id,bookeduserid,survedid)
  

    Alert.alert('Warning','Are you sure to delete this Suplier!',[

      {text:"Yes",
      onPress:()=>{conformDeleteTable(id)},
      style:'cancel'
      },
      {text:"No",
      onPress:()=>alert('Cancelled deleting'),
      style:'default'
      },
      
      
      ],
      {cancelable:true}
          )

  }

  return (
    <View>
      <View style={{marginBottom:10}}>

<Button 
containerStyle={{ width:'50%', marginTop:15,
 marginLeft:'auto', marginRight:'auto',
borderColor:'red', borderWidth:2
}}  
type='outline'
title={`Add new supplier '${suplier.length}'`} onPress={addnewsuplier} />

</View>

<View style={[styles.ontouchScroll,{
borderColor:phoneDarkModeCheck ?'red':'white' , top:height-200
      }]}   >
        <TouchableOpacity onPress={onPressTouch}>
        <Text style={{alignSelf:'center'}} >
<Icon  name= {scrolToTopCheck ? 'angle-double-up': 'angle-double-down'} color='white'  size={35}/>
        </Text>
        </TouchableOpacity>

      </View>



      <ScrollView ref={scrollRef} onScroll={handleScroll} style={{backgroundColor:'#102041'}}>
        {suplier.map((item,index)=>{
          // console.log(item.data)
          return(
            <View key={item.id} style={{marginTop:7, borderWidth:1, borderColor:'red'}}>
              <View style={styles.addsuplierInside}>
                <View style={styles.addsuplierInsideLeft}> 
                  <Text style={styles.addsuplierInsideLeftText} >Name</Text>
                  </View>
                <View> 
                  <Text style={styles.addsuplierInsideRightText}>{item.data.name}</Text>
                </View>
                 </View>

                 <View style={styles.addsuplierInside}>
                 <View style={styles.addsuplierInsideLeft}> 
                  <Text style={styles.addsuplierInsideLeftText} >email</Text>
                  </View>
                <View> 
                  <Text style={styles.addsuplierInsideRightText}>{item.data.email}</Text>
                </View>
                 </View>

                 <View style={styles.addsuplierInside}>
                 <View style={styles.addsuplierInsideLeft}> 
                  <Text style={styles.addsuplierInsideLeftText} >active</Text>
                  </View>
                <View> 
                  <Text>
                     <Button 
                     containerStyle={{
                      height:40
                     }}
                    buttonStyle={{ backgroundColor:item.data.active? 'green': 'red' }}
                     title={item.data.active ?'Active':'Unactive' }   />
                  </Text>
                </View>
                 </View>

                 <View style={styles.addsuplierInside}>
                 <View style={styles.addsuplierInsideLeft}> 
                  <Text style={styles.addsuplierInsideLeftText} >survingTable</Text>
                  </View>
                <View> 
                  <Text style={styles.addsuplierInsideRightText}>{item.data?.survingTable ? item.data?.survingTable :'--' }</Text>
                </View>
                 </View>


                 <Button  title='Delete this Suplier'
   buttonStyle={{ backgroundColor: '#f65353' , width:147, margin:5 }} 
   onPress={()=>handleDeleteTable(item.id)}
   /> 


            </View>
          )
        })}
      </ScrollView>


      
    </View>
  )
}

export default AdminSupliers

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

  },
  addsuplierInside:{
    padding:2,
    // borderWidth:1,
    borderBottomWidth:2,
    borderColor:'green',
    flexDirection:'row'
  },

  addsuplierInsideLeft:{
    width:'40%'
  },
  addsuplierInsideLeftText:{
    fontSize:15,
    fontWeight:'900',
     color:'white',
     padding:5
  },
  addsuplierInsideRightText:{
    color:'white'
  }
})
import { Appearance, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Header from '../Components/Header';
import AdminTables from '../Components/AdminInfo/AdminTables';
import AdminUsers from '../Components/AdminInfo/AdminUsers';
import AdminSupliers from '../Components/AdminInfo/AdminSupliers';
import { Avatar, Button, Image } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AdminTopNavigator from '../Components/AdminInfo/AdminTopNavigator';
import Icon from 'react-native-vector-icons/Ionicons';


const AdminDashBoard = ({navigation}) => {
  const colorScheme = Appearance.getColorScheme();
let [phoneDarkModeCheck,setPhoneDarkModeCheck]=useState(false)

// useLayoutEffect(()=>{
//   // navigation.setOptions({headerShown: false})
// },[])

useLayoutEffect(()=>{
  if (colorScheme === 'dark') {
    setPhoneDarkModeCheck(true)
    
  }

    
    else {
      setPhoneDarkModeCheck(false)
  }
  
},[])



useLayoutEffect(()=>{
  navigation.setOptions({
    title:null,
    headerStyle:{
      backgroundColor:"#fff",
      
    
    },
    headerTitleStyle:{
      color:'black'
    },
    headerTintColor:'black',
    headerLeft:()=>(
    <View
    style={{
      // marginLeft:20,
      flexDirection:'row',
      height:75,
     alignItems:'center'

    }}
    >
      <View>
        <Icon
onPress={()=>navigation.goBack()}
name={"arrow-back-sharp" }
size={30} color="black" />
      </View>
        
        <View  style={{marginLeft:25}}>
        <Image 
        source={{
            uri:"https://img.freepik.com/premium-vector/initial-dr-letter-logo-with-script-typography-vector-template-creative-script-letter-dr-logo-design_616200-715.jpg"

        }}
        style={{
          // width:'100%',
          // height:'100%'
          width:35,
              height:35,
            
            // borderRadius:10
            
            
        }}
        />
        </View>

      

   


    </View>),


    headerRight:()=>(
      <View
      style={{
justifyContent:'center',

  marginRight:20,
  height:75,
    
      }}
      >
<TouchableOpacity
activeOpacity={0.5}>

<Text
            style={{
                fontSize:25,
                fontWeight:'700',
                color:'black'
            }}
            >Devi Residencies</Text>

</TouchableOpacity>


{/* <TouchableOpacity
activeOpacity={0.5}

onPress={()=>{
  navigation.goBack()
}}
>


<Text>Go back</Text>

</TouchableOpacity> */}



      </View>
    )

  })

},[]
)


let [adminSelect, setadminSelect]=useState('tables')


const Tab = createMaterialTopTabNavigator();


  return (

  // <View>
  //   <View
  //   style={{
  //     borderColor: phoneDarkModeCheck ?'red':'white',
  //      borderWidth:1,
  //      zIndex:1
  //   }}
  //   >
  //   <Header dashboard={true} navigation={navigation}/></View>

  //   <View style={{ flexDirection:'row', justifyContent:"space-around",marginTop:10}}>
  
    

  //     <Button containerStyle={{ width:'25%',  }}  
  //     buttonStyle={{ backgroundColor: adminSelect==='tables' ?'rgba(214, 61, 57, 1)' :"#2089DC" }}    onPress={()=>setadminSelect('tables') } title='Tables'/>
  //     <Button containerStyle={{ width:'25%',  }}      
  //          buttonStyle={{ backgroundColor: adminSelect==='users' ? 'rgba(214, 61, 57, 1)': "#2089DC" }}     onPress={()=>setadminSelect('users') }  title='Users'/>
  //     <Button containerStyle={{ width:'25%',  }} 
  //         buttonStyle={{ backgroundColor: adminSelect==='supliers' ? 'rgba(214, 61, 57, 1)': "#2089DC"}}   onPress={()=>setadminSelect('supliers') }  title='Suppliers'/>

  //   </View>

  //    <View>

  //     {adminSelect==='tables' && <AdminTables/>}
  //     {adminSelect==='users' && <AdminUsers/>}
  //     {adminSelect==='supliers' && <AdminSupliers/>}
      
    
  //    </View>
  // </View>

<AdminTopNavigator/>



   
  )
}

export default AdminDashBoard

const styles = StyleSheet.create({})
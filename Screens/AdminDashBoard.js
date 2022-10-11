import { Appearance, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Header from '../Components/Header';
import AdminTables from '../Components/AdminInfo/AdminTables';
import AdminUsers from '../Components/AdminInfo/AdminUsers';
import AdminSupliers from '../Components/AdminInfo/AdminSupliers';
import { Button } from 'react-native-elements';

const AdminDashBoard = ({navigation}) => {
  const colorScheme = Appearance.getColorScheme();
let [phoneDarkModeCheck,setPhoneDarkModeCheck]=useState(false)

useLayoutEffect(()=>{
  navigation.setOptions({headerShown: false})
},[])

useLayoutEffect(()=>{
  if (colorScheme === 'dark') {
    setPhoneDarkModeCheck(true)
    
  }

    
    else {
      setPhoneDarkModeCheck(false)
  }
  
},[])


let [adminSelect, setadminSelect]=useState('tables')


  return (
    <View>
    <View
    style={{
      borderColor: phoneDarkModeCheck ?'red':'white',
       borderWidth:1,
       zIndex:1
    }}
    >
    <Header dashboard={true} navigation={navigation}/></View>
    {/* <ScrollView> */}

    <View style={{ flexDirection:'row', justifyContent:"space-around",marginTop:10}}>
  
    {/* titleStyle={{ color: 'white'}} */}

      <Button containerStyle={{ width:'25%',  }}  
      buttonStyle={{ backgroundColor: adminSelect==='tables' ?'rgba(214, 61, 57, 1)' :"#2089DC" }}    onPress={()=>setadminSelect('tables') } title='Tables'/>
      <Button containerStyle={{ width:'25%',  }}      
           buttonStyle={{ backgroundColor: adminSelect==='users' ? 'rgba(214, 61, 57, 1)': "#2089DC" }}     onPress={()=>setadminSelect('users') }  title='Users'/>
      <Button containerStyle={{ width:'25%',  }} 
          buttonStyle={{ backgroundColor: adminSelect==='supliers' ? 'rgba(214, 61, 57, 1)': "#2089DC"}}   onPress={()=>setadminSelect('supliers') }  title='Suppliers'/>

    </View>

     <View>

      {adminSelect==='tables' && <AdminTables/>}
      {adminSelect==='users' && <AdminUsers/>}
      {adminSelect==='supliers' && <AdminSupliers/>}
      
    
     </View>
     {/* </ScrollView> */}
    </View>
  )
}

export default AdminDashBoard

const styles = StyleSheet.create({})
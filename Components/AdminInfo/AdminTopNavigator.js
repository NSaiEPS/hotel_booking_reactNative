import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AdminTables from './AdminTables';
import AdminUsers from './AdminUsers';
import AdminSupliers from './AdminSupliers';

const AdminTopNavigator = () => {
const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer independent={true}>

    <Tab.Navigator>
      <Tab.Screen name="Tables" component={AdminTables} />
      <Tab.Screen name="Users" component={AdminUsers} />
      <Tab.Screen name="Suppliers" component={AdminSupliers} />
    </Tab.Navigator>


    </NavigationContainer> 
  )
}

export default AdminTopNavigator

const styles = StyleSheet.create({})
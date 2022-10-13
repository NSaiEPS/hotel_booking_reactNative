import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AdminTables from './AdminTables';
import AdminUsers from './AdminUsers';
import AdminSupliers from './AdminSupliers';
import { SceneMap, TabView } from 'react-native-tab-view';
import AdminFeedBacks from './AdminFeedBacks';

const AdminTopNavigator = () => {
const Tab = createMaterialTopTabNavigator();
  const layout = useWindowDimensions();

const renderScene = SceneMap({
  first: AdminTables,
  second: AdminUsers,
  third:AdminSupliers,
  fourth:AdminFeedBacks
});

const [index, setIndex] = useState(0);


const [routes] = useState([
  { key: 'first', title: 'tables' },
  { key: 'second', title: 'users' },
  { key: 'third', title: 'supliers' },
  { key: 'fourth', title: 'feedback' },
]);

  return (
    // <NavigationContainer independent={true}>

    // <Tab.Navigator>
    //   <Tab.Screen name="Tables" component={AdminTables} />
    //   <Tab.Screen name="Users" component={AdminUsers} />
    //   <Tab.Screen name="Suppliers" component={AdminSupliers} />
    // </Tab.Navigator>


    // </NavigationContainer> 
    <TabView
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={{ width: layout.width }}
  />
  )
}

export default AdminTopNavigator


// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });

// export default function TabViewExample() {
//   const layout = useWindowDimensions();

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'first', title: 'First' },
//     { key: 'second', title: 'Second' },
//   ]);

//   return (
//     <TabView
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{ width: layout.width }}
//     />
//   );
// } 
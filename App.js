

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import TablesInfoScreen from './Screens/TablesInfoScreen';
import AdminDashBoard from './Screens/AdminDashBoard';
import { Provider } from 'react-redux';
import { Store } from './Components/Redux/Store';

enableScreens();



const Stack = createNativeStackNavigator();



const globalScreenOptions={
  headerStyle:{
    backgroundColor:"#ffffff",
    
    

  
  },
    headerTitleStyle:{
      color:'white',
      
    },
    headerTintColor:"white",
    headerTitleAlign: 'center',
   

  }




function App() {
  return (
    <Provider  store={Store} >
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Login" screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tables" component={TablesInfoScreen} />
        <Stack.Screen name="Admin" component={AdminDashBoard} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

  export default App;









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
import { Appearance, View } from 'react-native';
// import SplashScreen from "react-native-splash-screen";
import { useEffect, useState } from 'react';
import { Image } from 'react-native-elements';


enableScreens();



const Stack = createNativeStackNavigator();

// const colorScheme = Appearance.getColorScheme();
// if (colorScheme === 'dark') {
//   // Use dark color scheme
//   alert("dark mode on")
// }

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

                   // Requirements

// Have to add splash screen for loadimg
// Have to add loading for firestore
// Have to add the footer
// Have to add audio option in booking


                // Completed     
// Supliers table //  completed
// If the suplier register he should not inclcude in users collection //completed
// Have to add email for feed back form  //completed
// Have to show if user is blocked  //completed
// Password show2 toggle //completed
// Feed backs in admin //completed
// have to add feedback  form //completed







function App() {
  let [splashScreen,SetsplashScreen]=useState(true)

  useEffect(() => {
    // SplashScreen.hide();
    setTimeout(() => {
      SetsplashScreen(false)
      
    },2000 );
  }, []);

  if(splashScreen){
    return(
    <View 
    style={{
      justifyContent:'center',
      flex:1,
      backgroundColor:"green"
    }}
    >
      <View style={{
        display:'flex',
        justifyContent:'center',
        width:'60%',
        height:'50%',
        // backgroundColor:'red',
        alignSelf:'center',
        
      }}>
    <Image 
    source={{
        uri:"https://img.freepik.com/premium-vector/initial-dr-letter-logo-with-script-typography-vector-template-creative-script-letter-dr-logo-design_616200-715.jpg"

    }}
    style={{
      width:'100%',
      height:250,
      // width:'85%',
      //     height:'85%',
        
        borderRadius:150,
        resizeMode: 'contain'
        
        
        
    }}
    />
    </View>
    </View>)
  }
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







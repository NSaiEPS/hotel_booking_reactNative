import { Alert, Appearance, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Fontisto';
import { Button, Input ,Image} from 'react-native-elements'
import { TouchableHighlight } from 'react-native-gesture-handler';
// import { auth } from '../Firebase';
import { SelectAdminSignIn } from './Redux/Redux_Slice';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';


  
const Header = ({navigation,dashboard}) => {
    const [headerMoreInfo, setheaderMoreInfo] = useState(false)
  let selectAdminSignIn=useSelector(SelectAdminSignIn)



  let handleMoreOptions=()=>{
    // alert(headerMoreInfo)
    setheaderMoreInfo(!headerMoreInfo)
  }

  let handleSignOut=()=>{

    Alert.alert('Warning','Are you sure to delete this table!',[

      {text:"Yes",
      onPress:()=>{ auth().signOut().then(()=>{
        navigation.replace("Login")
      })},
      style:'cancel'
      },
      {text:"No",
      // onPress:()=>alert('Cancelled deleting'),
      style:'default'
      },
      
      
      ],
      {cancelable:true}
          )

   
  }
//   const colorScheme = Appearance.getColorScheme();


// let [phoneDarkModeCheck,setPhoneDarkModeCheck]=useState(false)

  return (
    <View
    style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'space-around',
        alignItems:'center',
        // borderColor:'red',
        // borderWidth:1,

        width:'100%',
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:'white',
        height: 75,
        zIndex:1,
        // paddingLeft:25,
        paddingHorizontal:25
        
        // marginBottom: headerMoreInfo ? 25:0
    }}
    
    >
        <View >
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

        <View
        style={{
            justifyContent:'center',
           
        }}
        >
            <Text
            style={{
                fontSize:25,
                fontWeight:'700',
                color:'black'
            }}
            >Devi Residencies</Text>
        </View>

        <View >

<Icon
onPress={handleMoreOptions

}
name={
headerMoreInfo? 'nav-icon-list-a':"nav-icon-a" }
size={30} color="black" />




        </View>
        {
            headerMoreInfo &&
        

        <View
        style={{
            position:'absolute',
            top:50,
            right:35,
            zIndex:2,
            borderColor:'white',
            borderWidth:1,
             backgroundColor:'black',
             width:100,
              borderRadius:5
        }}
        
        
        >
            {/* <Pressable
     style={ ({pressed})=>  [{
        borderColor:'red',
        borderWidth:1,
        backgroundColor:pressed? '#00ffee' :'red',
        height:35,
        marginTop:5,
        
     }]}
     onPress={()=>alert("Just pressed")}
     onLongPress={()=>alert("Long pressed")}
     delayLongPress={2000}
     >

        {({pressed})=>(
        <Text>
            {pressed ? 'pressed':
            'Preeme'}
        </Text>

        )}



     </Pressable> */}

     <Button
     title='Logout'
     onPress={handleSignOut

     }
     
     />
     {selectAdminSignIn &&

     <Button
     title={dashboard?'Back': 'DashBoard'}
     type='outline'
     onPress={()=>{
       
       setheaderMoreInfo(false)
       if(dashboard)
{ navigation.goBack()

}  
 else {
    navigation.navigate("Admin")
 }
}}
     />}


        </View>}
    </View>
)

  
}

export default Header

const styles = StyleSheet.create({})
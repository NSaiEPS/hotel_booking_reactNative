import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Fontisto';
import { Button, Input ,Image} from 'react-native-elements'
import { TouchableHighlight } from 'react-native-gesture-handler';
// import { auth } from '../Firebase';
import { SelectAdminSignIn } from './Redux/Redux_Slice';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';


const Header = ({navigation}) => {
    const [headerMoreInfo, setheaderMoreInfo] = useState(false)
  let selectAdminSignIn=useSelector(SelectAdminSignIn)

    // const []
    // useEffect(()=>{
    //     auth.onAuthStateChanged((authUser)=>{
    //      console.log(authUser.email)
        
    //     })},[])

  let handleMoreOptions=()=>{
    // alert(headerMoreInfo)
    setheaderMoreInfo(!headerMoreInfo)
  }

  let handleSignOut=()=>{
    auth().signOut().then(()=>{
        navigation.replace("Login")
      })
  }
  return (
    <View
    style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'space-around',
        alignItems:'center',

        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
        // backgroundColor:'white',
        height: 75,
        // marginBottom: headerMoreInfo ? 25:0
    }}
    
    >
        <View
      
        >
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
     title='DashBoard'
     type='outline'
     onPress={()=>{
        navigation.navigate("Admin")
       setheaderMoreInfo(false)
    }}
     />}


        </View>}
    </View>
)

  
}

export default Header

const styles = StyleSheet.create({})
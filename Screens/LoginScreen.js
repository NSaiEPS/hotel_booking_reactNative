import {  ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Image, Input } from 'react-native-elements';
// import { auth } from '../Firebase';
import { useDispatch } from 'react-redux';
import { adminSignInAction, userSignInAction } from '../Components/Redux/Redux_Slice';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';



const LoginScreen = ({navigation}) => {
    const theme=useColorScheme()

  let dispatch=useDispatch()

  useLayoutEffect(()=>{
    navigation.setOptions({
        title:null,
        headerLeft:()=>(
            <View
            style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                alignContent:'space-around',
                width:'70%',
                height:60,
                backgroundColor: theme==='dark'?  'white': 'white',
                
            }}
            
            >
                <View
                style={{
               display:'flex',
               justifyContent:'center'
                }}
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
                    //   justifyContent:'center'
                    
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
                    >Login</Text>
                </View>
            </View>
        )
    })

},[])



let [authChabged,setAuthChanged]=useState(false)


    const [input, setInput]=useState({
        email:'',
        password:'',
        passwordToggle:false
    })

    const submitToLogin=(e)=>{
      e.preventDefault();
 
      auth().signInWithEmailAndPassword(input.email,input.password).then (userAuth=>{
        setAuthChanged(true)
        // navigation.replace("Home")
       
      })
 .catch(error=>alert(error))
    }

  
    useEffect(()=>{
 

      const subscriber= auth().onAuthStateChanged((authUser)=>{
        // console.log(authUser?.email, 'loginScreen')
        if(authUser){
           dispatch(
           userSignInAction({
               email:authUser?.email,
               name:authUser?.displayName
   
           })
           )
   
          navigation.replace("Home")
          if(authUser?.email==='deviresidencies@admin.com'){
           dispatch(
               adminSignInAction(true)
           )
          }
   
        }
       })
      
      return subscriber;
       },[])


       useEffect(()=>{
 

        const subscriber= auth().onAuthStateChanged((authUser)=>{
          // console.log(authUser?.email, 'loginScreen')
          if(authUser){
             dispatch(
             userSignInAction({
                 email:authUser?.email,
                 name:authUser?.displayName
     
             })
             )
     
            navigation.replace("Home")
            if(authUser?.email==='deviresidencies@admin.com'){
             dispatch(
                 adminSignInAction(true)
             )
            }
            else {
              dispatch(
                adminSignInAction(false)
            )

            }
     
          }
         })
        
        return subscriber;
         },[authChabged])








       


  return (
    <SafeAreaView style={styles.registerScreen }>
    
    <ImageBackground
    source={{
      uri:'https://img.freepik.com/free-photo/beautiful-abstract-cloud-clear-blue-sky-landscape-nature-white-background-wallpaper-blue-tex_1258-108688.jpg?w=900&t=st=1665206760~exp=1665207360~hmac=303db294f0749747ef8c923572c11a1afa49fbcad315c03397797fc5eef15972'
    }}
    
    
     style={styles.registerScreenView }>
        <View style={styles.welcomeText}>

            <Text h3 
            style={{
                color:'blue',
                fontSize:25,
                marginTop:5,
                fontWeight:'700'
            }}
            >
                Welcome to the Devi 
            </Text>

            <Text h3 
            style={{
                color:'blue',
                fontSize:25,
                fontWeight:'700'

                
            }}
            >
                 Residencies
            </Text>

           <Text
           style={{
            
            fontSize:20,
            marginTop:7,
            color:'green',
            fontWeight:'700'


           }}
           
           >LoginIn to procede futher</Text>

        </View>

        <View style={styles.form}>
         

     
        <Input placeholder='Enter your email  here ..'
         value={input.email}
         onChangeText={(text)=>{
             setInput({
                ...input,
                 email:text
             })
         }}
         style={{
          backgroundColor:"white",
          marginTop:7
         }}

         
        
        
        />
                <View style={{position:'relative'}} >

                <Input placeholder='Enter your Password here ..'
         secureTextEntry={input.passwordToggle ? false: true}
         value={input.password}
         onChangeText={(text)=>{
             setInput({
                ...input,
                 password:text
             })
         }}
         style={{
          backgroundColor:"white"
         }}

         onSubmitEditing={submitToLogin}
         
         />
  <View style={{position:'absolute', right:25, top:13, backgroundColor:'white'}}>
<Icon  
onPress={()=>{
  setInput({
...input,
passwordToggle:!input.passwordToggle
})
}}

name= {input.passwordToggle ? 'eye': 'eye-slash'} color='black'  size={25}/>
</View>



  </View>

 





         

   
            

        </View>
        <View 
        style={styles.buttons}>
            {/* <Button 
            title='Login'
            containerStyle={
                styles.button
            }

            onPress={submitToLogin}
            /> */}

              <Button
              title="Login"
              containerStyle={{
                // height: 60,
                width:150,
                // marginHorizontal: 50,

                marginLeft:'auto',
                marginRight:"auto",
                marginVertical: 10,
                borderColor:'white',
                borderWidth:2
              }}
              buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
              titleStyle={{
                color: 'white',
                // marginHorizontal: 20,
              }}

              onPress={submitToLogin}        
            />

            
             {/* <Button 
             title='Register'
             type='outline'
             onPress={()=>navigation.navigate('Register')}

             containerStyle={
               [
                styles.button, {
                  color:'white'
                }
               ]

                
            }
            
            /> */}

<Button
              title="Register"
              buttonStyle={{ backgroundColor: '#008000' }}
              containerStyle={{
                width:150,
                // marginHorizontal: 50,

                marginLeft:'auto',
                marginRight:"auto",
                marginVertical: 10,
                borderColor:'white',
                borderWidth:2
              }}
              titleStyle={{
                color: 'white',
                // marginHorizontal: 20,
              }}
              onPress={()=>navigation.navigate('Register')}
            />


{/* 
<TouchableOpacity

     
     style={{
        borderColor:'white',
        borderWidth:1,
        backgroundColor:'lightblue',
        marginTop:5,
        height:35,
        
       
        
        
     }}
     activeOpacity={0.5}
     >
       <Text> Login</Text>


     </TouchableOpacity> */}

        </View>
    </ImageBackground>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    registerScreen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#000009'
        


    },

    registerScreenView:{
        // backgroundColor:'white',
        
        width:'100%',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:10

    },
    
    welcomeText:{
      display:'flex',
      alignItems:'center'

    },
    buttons:{
      width:'90%',
      marginLeft:'auto',
      marginRight:'auto'
    },
    button:{
        marginBottom:10,
        

    },

    form:{
        marginTop:10
    }
})
import {  ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Image, Input } from 'react-native-elements';
// import { auth, db } from '../Firebase';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';



const RegisterScreen = ({navigation}) => {

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
                    width:'75%'
                }}
                
                >
                    <View>
                    <Image 
                    source={{
                        uri:"https://img.freepik.com/premium-vector/initial-dr-letter-logo-with-script-typography-vector-template-creative-script-letter-dr-logo-design_616200-715.jpg"

                    }}
                    style={{
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
                        >Register</Text>
                    </View>
                </View>
            )
        })

    },[])


    const [input, setInput]=useState({
        name:'',
        email:'',
        password:'',
        passwordToggle:false,
    })


    let submitToRegister=(e)=>{
        e.preventDefault()
        // console.log(input.name, input.email, input.password)
      
       
        auth().createUserWithEmailAndPassword(input.email,input.password).then((userAuth)=>{
          userAuth.user.updateProfile({
            displayName:input.name,
            
          })
          
          navigation.replace("Home")
        
        
        
        
          let emailcheck=(input?.email).split('@')
          // if(emailcheck[1]!=='deviresidenciessupliers.com')
        //   console.log(emailcheck)
        //   console.log(emailcheck[1])
        
          
          if(input.email==='deviresidencies@admin.com' || emailcheck[1]==='deviresidenciessupliers.com' ){
            if(input.email==='deviresidencies@admin.com'){
              alert('you are the admin')
            }
            else {
              alert('you are thesupplier!')
            }
          }
          
           else {
          
           
            firestore().collection('users').add({
              name:input.name,
              email:input.email,
              table:'',
              active:'',
              survedby:''
              
          
            })
          }
          

        
        }
          )
       .catch(error=>alert(error))
      
   




    
      }
  return (
    <SafeAreaView style={styles.registerScreen }>
    
    <ImageBackground
    source={{
        uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoeOOSOfog9c9gGWoHDDRBactC9HaUco261lMDEDoZlqOWGEgEJ49yD1aHS1SQNUtENfA&usqp=CAU"
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
           
           >Signup to procede futher</Text>

        </View>

        <View style={styles.form}>
         

        <Input placeholder='Enter your name here ..'
        value={input.name}
        onChangeText={(text)=>{
            setInput({
                ...input,
                name:text
            })
        }}
        style={{
            backgroundColor:"white",
          marginTop:7

           }}
        
        
        />
        <Input placeholder='Enter your email  here ..'
         value={input.email}
         onChangeText={(text)=>{
             setInput({
                ...input,
                 email:text
             })
         }}
         style={{
            backgroundColor:"white"
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
           onSubmitEditing={submitToRegister}
         
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
            <Button 
            title='Signup'
            containerStyle={
                styles.button
            }
            onPress={submitToRegister}

            
            />

            
             {/* <Button 
             title='Login'
             type='outline'
             onPress={()=>navigation.goBack()}

             containerStyle={
                styles.button
            }
            /> */}
 <Button 
             title='Login'
             type='outline'

buttonStyle={{
                backgroundColor: 'rgba(199, 43, 98, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
              }}
              containerStyle={{
                // width: 200,
                height: 45,
                // marginHorizontal: 50,
                // marginVertical: 10,
              }}
              titleStyle={{
                color: 'white',
                // marginHorizontal: 20,
              }}
              onPress={()=>navigation.goBack()}
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

export default RegisterScreen

const styles = StyleSheet.create({
    registerScreen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#000009'
        


    },

    registerScreenView:{
        backgroundColor:'white',
        
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
        marginBottom:10

    },

    form:{
        marginTop:10
    }
})
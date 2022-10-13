
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { SelectUserSignIn } from './Redux/Redux_Slice';
import { useSelector } from 'react-redux';
import email from 'react-native-email'


const UserBlockedshow = ({userBlocked}) => {
  let selectUserSignIn=useSelector(SelectUserSignIn)
//   console.log(selectUserSignIn)


    const [input, Setinput] = useState({
        name:selectUserSignIn?.name,
        email:selectUserSignIn?.email,
        feedBack:''
    });
    // const [submitted, SetSubmitted] = useState(false);


let hadleSubmitForm=()=>{
   
        // const to = ['tiaan@email.com', 'foo@bar.com'] // string or array of email addresses
        // email(to, {
        //     // Optional additional arguments
        //     cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
        //     bcc: 'mee@mee.com', // string or array of email addresses
        //     subject: 'Show how to use',
        //     body: 'Some body right here',
        //     checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL

        // }).catch(console.error)

        //  to = ['tiaan@email.com', 'foo@bar.com'] // string or array of email addresses
        email('sainizameps@gmail.com', {
            // Optional additional arguments
           
            subject: `Regarding blocking me '${selectUserSignIn?.email}' in Deviresidencies App`,
            
            body: input.feedBack,
            checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL

        }).catch(console.error)
    


}
// After submitting check the email
    // supliers email must contain "@deviresidenciessupliers.com" for the sake of ease 
    return (
      <View style={styles.body}>
   


        <Modal
          visible={true}
          transparent
        //   
        
          animationType='slide'
        //   animationType='fade'
          hardwareAccelerated
        >
          <View style={styles.centered_view}>
            <View style={styles.warning_modal}>
              <View style={styles.warning_title}>
                <Text style={styles.text}>
Unfortunetly you have been blocked by the Admin of the App, please fill this feedback form if you think you have n't done any wrong.                
                    </Text>
              </View>
              <View style={styles.warning_body}>
               
               <TextInput
               placeholder='Enter the name of the supplier'
            //    onChangeText={(text)=>{
            //     Setinput({
            //         ...input,
            //         name:text
            //     })
            //    }}
               style={styles.supliersinput}
               value={input.name}


               
               />

              <TextInput
               placeholder='Enter the email of the supplier'
            //    onChangeText={(text)=>{
            //     Setinput({
            //         ...input,
            //         email:text
            //     })
            //    }}
               style={styles.supliersinput}

               value={input.email}
               
               />

             <TextInput
               placeholder='Write why you want admin to unblock you'
               onChangeText={(text)=>{
                Setinput({
                    ...input,
                    feedBack:text
                })
               }}
               style={styles.supliersinput}

            //    secureTextEntry
               value={input.feedBack}
            //    onSubmitEditing={hadleSubmitForm}
               />


              </View>
             
             
              <Pressable
                onPress={hadleSubmitForm}
                style={styles.warning_button}
                android_ripple={{color:'#fff'}}
              >
                <Text style={styles.text}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
       
      </View >
    );
  };
  
 
  
  
export default UserBlockedshow


const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent:'center',
      
    },
    text: {
      color: 'white',
      fontSize: 20,
      margin: 10,
      textAlign: 'center',
    },
    input: {
      width: 200,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 5,
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 10,
    },
    button: {
      width: 150,
      height: 50,
      alignItems: 'center',
    },
    centered_view: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000099'
    },
    warning_modal: {
      width:'85%',
      height: 450,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 20,
    },
    warning_title: {
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    //   width:500
    },
    warning_body: {
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
    warning_button:{
      backgroundColor:'green',
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
    },
    supliersinput:{
        borderColor:"lightblue",
        borderWidth:2,
        borderRadius:15,
        width:270,
        paddingLeft:15,
        marginTop:5
    }
  });
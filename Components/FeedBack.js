
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { SelectUserSignIn } from './Redux/Redux_Slice';
import { useSelector } from 'react-redux';
import email from 'react-native-email'
import { serverTimestamp } from 'firebase/firestore';
import { Button } from 'react-native-elements';



const FeedBack = ({modelOpen,setModelOpenState}) => {
  // console.log(serverTimestamp(),'time stamp')
  let selectUserSignIn=useSelector(SelectUserSignIn)
  // console.log(selectUserSignIn)


    const [input, Setinput] = useState({
        name:selectUserSignIn?.name,
        email:selectUserSignIn?.email,
        feedBack:''
    });
    // const [submitted, SetSubmitted] = useState(false);

  
    // console.log(reqDate)

// console.log(time)
let hadleSubmitForm=()=>{
  let time= Date().split(' ')
  let reqDate=`${time[3]} ${time[2]}th ${time[1]} ${time[4]}`
  if(input.feedBack){
  firestore().collection('feedBacks').add({
    username:selectUserSignIn?.name,
    useremail:selectUserSignIn?.email,
    feedBack:input.feedBack,
    time:reqDate
    
  })
   
      

        
        email('sainizameps@gmail.com', {
           
           
            subject: `FeedBack form from '${selectUserSignIn?.email}' in Deviresidencies App`,
            
            body: input.feedBack,
            checkCanOpen: false 

        }).catch(console.error)
    

        setModelOpenState(false)}
        else {
          alert('Write feedBack')
        }


}

    return (
      <View style={styles.body}>
     
   


        <Modal
          visible={modelOpen}
          transparent
   
          animationType='fade'
        
          hardwareAccelerated
        >
          <View style={styles.centered_view}>
            <View style={styles.warning_modal}>
              <View style={styles.warning_title}>
                <Text style={styles.text}>
    Your FeedBack is very valuable for our company, we are always looking forword to improve our standards & to impress our clients.                 
                    </Text>
              </View>
              <View style={styles.warning_body}>
               
               <TextInput
               placeholder='Enter the name of the supplier'
            
               style={styles.supliersinput}
               value={input.name}


               
               />

              <TextInput
               placeholder='Enter the email of the supplier'
          
               style={styles.supliersinput}

               value={input.email}
               
               />

             <TextInput
               placeholder='Write Your feedback here.......'
               onChangeText={(text)=>{
                Setinput({
                    ...input,
                    feedBack:text
                })
               }}
               style={styles.supliersinput}

          
               value={input.feedBack}
          
               />


              </View>
             
             
              <Pressable
                onPress={hadleSubmitForm}
                style={styles.submitBtn}
                android_ripple={{color:'#fff'}}
              >
                <Text style={styles.text}>Submit</Text>
              </Pressable>
            </View>

            <View style={styles.feedbackCancelBtn}>
          <Button 
          title='X'
          buttonStyle={{
            backgroundColor:'red',
            width:50,
            borderRadius:10

          }}
          onPress={()=>{

            setModelOpenState(false)}

        }
          />
        </View>
          </View>
        </Modal>
       
      </View >
    );
  };
  
 
  
  
export default FeedBack


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
      backgroundColor: 'green',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    //   width:500
    },
    warning_body: {
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitBtn:{
      backgroundColor:'blue',
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
    },
    feedbackCancelBtn:{
      position:'absolute',
      top:130,
      right:15
    }
  });
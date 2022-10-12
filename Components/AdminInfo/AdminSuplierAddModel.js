
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const AdminSuplerAddModel = ({setaddModelShow,addModelShow}) => {

    const [input, Setinput] = useState({
        name:'',
        email:'',
        password:''
    });
    const [submitted, SetSubmitted] = useState(false);


let hadleSubmitForm=()=>{
    if(input.name && input.email && input.password){
        if(input.email?.split('@')[1]!=='deviresidenciessupliers.com'){
            alert("supliers email must contain '@deviresidenciessupliers.com' for the sake of ease ")
        }
        else {
            firestore().collection('suppliers').add({
                name:input.name,
                email:input.email,
                password:input.password,
                active:true,
                survingTable:''
                     
             
                
               
                 })
                 Setsuplyform(false)

        }

    }
    else {
        alert("Please enter all the fields")
    }

}
// After submitting check the email
    // supliers email must contain "@deviresidenciessupliers.com" for the sake of ease 
    return (
      <View style={styles.body}>
   


        <Modal
          visible={addModelShow}
          transparent
          onRequestClose={() =>
            setaddModelShow(false)
          }
          animationType='slide'
        //   animationType='fade'
          hardwareAccelerated
        >
          <View style={styles.centered_view}>
            <View style={styles.warning_modal}>
              <View style={styles.warning_title}>
                <Text style={styles.text}>Add Suppliers Info</Text>
              </View>
              <View style={styles.warning_body}>
               
               <TextInput
               placeholder='Enter the name of the supplier'
               onChangeText={(text)=>{
                Setinput({
                    ...input,
                    name:text
                })
               }}
               style={styles.supliersinput}
               value={input.name}


               
               />

              <TextInput
               placeholder='Enter the email of the supplier'
               onChangeText={(text)=>{
                Setinput({
                    ...input,
                    email:text
                })
               }}
               style={styles.supliersinput}

               value={input.email}
               
               />

             <TextInput
               placeholder='Enter the pasword of the supplier'
               onChangeText={(text)=>{
                Setinput({
                    ...input,
                    password:text
                })
               }}
               style={styles.supliersinput}

               secureTextEntry
               value={input.password}
               onSubmitEditing={hadleSubmitForm}
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
  
 
  
  
export default AdminSuplerAddModel


const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent:'center',
    },
    text: {
      color: '#000000',
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
      width: 300,
      height: 300,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 20,
    },
    warning_title: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ff0',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    warning_body: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    warning_button:{
      backgroundColor:'#00ffff',
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
    },
    supliersinput:{
        borderColor:"lightblue",
        borderWidth:2,
        borderRadius:15,
        width:250,
        paddingLeft:15,
        marginTop:5
    }
  });
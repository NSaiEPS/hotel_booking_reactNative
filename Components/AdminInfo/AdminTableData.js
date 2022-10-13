import { Alert, Appearance, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EditIcon from 'react-native-vector-icons/Entypo';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadIcon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';



const AdminTableData = ({item, length, id, index}) => {
    const [supliersEmail, setSupliersEmail] = useState(false)
    const [supliersEmailselect, setSupliersEmailselect] = useState('')



const [users, setUsers] = useState([])
    useEffect(()=>{
        firestore().collection('suppliers').onSnapshot((snapshot)=>{
            setUsers(snapshot.docs.map((doc)=>({
                
                id:doc.id,
                data:doc.data(),
              
            })))
          })

    },[])
// console.log(users)

    let conformDeleteTable=(id,bookeduserid,survedid)=>{
        firestore().collection('tables').doc(id).delete()
         
      
        firestore().collection('users').doc(bookeduserid).update({
          ['survedby']: '',
          ['table']:'',
          ['active']:'',
    
        })
    
        firestore().collection('suppliers').doc(survedid).update({
          ['survingTable']:``,
        })
    
    
    
       
    

      }
      let handleDeleteTable=(id,bookeduserid,survedid)=>{
        // console.log(id,bookeduserid,survedid)
      

        Alert.alert('Warning','Are you sure to delete this table!',[

          {text:"Yes",
          onPress:()=>{conformDeleteTable(id,bookeduserid,survedid)},
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


   

       
      let conformDeletesuplierEmail=(id,bookeduserid,survedid)=>{
        firestore().collection('tables').doc(id).update({
          ['survedby']: '',
          ['survedid']:'',
          
    
        })
        firestore().collection('users').doc(bookeduserid).update({
          ['survedby']: '',
    
        })
    
        firestore().collection('suppliers').doc(survedid).update({
          ['survingTable']:``,
        })
      }


      let handleDeleteSuplier=()=>{
        Alert.alert('Warning','Are you sure to delete this supplier for this table!',[

          {text:"Yes",
          onPress:()=>{conformDeletesuplierEmail(id,bookeduserid,survedid)},
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


      let handleUploadEmail=()=>{
        if(supliersEmailselect){
        let reqData=supliersEmailselect?.split(' ')
        // firestore().collection('tables').doc(id).update({
        //     ['survedby']: reqData[0],
        //     ['survedid']:reqData[1],
            
      
        //   })
        // firestore().collection('users').doc(bookeduserid).update({
        //     ['survedby']: '',
      
        //   })
      
        //   firestore().collection('suppliers').doc(survedid).update({
        //     ['survingTable']:``,
        //   })

console.log(reqData)
    
    
    }
    else {
        alert("Select any supplier")
    }

      }

  return (
    <View key={item.id} style={{ marginTop:5, borderColor:'red', borderWidth:1,marginBottom: index+1===length ?525:0 }}>

    <View  style={styles.adminTablestables} >
        <View style={styles.adminTablestablesLeft} >
         <Text style={styles.adminTablestablesLeftText}>Name</Text>
           </View>
           <View>
         <Text  style={{color:'white'}}>Table {index+1}</Text>
           </View>
           </View>
    
    
           <View style={styles.adminTablestables}>
      <View style={styles.adminTablestablesLeft} >
         <Text style={styles.adminTablestablesLeftText}>Status</Text>
           </View>
           <View>
         <Text  style={{color:'white'}}>{ item.data?.active ? 'Booked' :' Not yet booked'} </Text>
           </View>
           </View>
    
           <View style={styles.adminTablestables}>
      <View style={styles.adminTablestablesLeft} >
         <Text style={styles.adminTablestablesLeftText}>Bookedby</Text>
           </View>
           <View >
         <Text style={{color:'white'}}>{item.data?.bookedby ? item.data?.bookedby :'--' }</Text>
           </View>
           </View>
    
           <View style={styles.adminTablestables}>
      <View style={styles.adminTablestablesLeft} >
         <Text style={styles.adminTablestablesLeftText}>SurvedBy</Text>
           </View>
           <View style={{width:'45%'}} >
            {
              item.data?.active ? 
              item.data?.survedby ? 
              
              <View style={{flexDirection:'row', justifyContent:'space-between'}} >
     <View>


   {   supliersEmail ?
                
                <Picker
                        selectedValue={supliersEmailselect}
                        style={{ color:'black',
                      
                    
                      width:'20%',
                      backgroundColor:'white',
                    
                      
                      }}
                        onValueChange={(itemValue, itemIndex) =>{()=>
                        setSupliersEmailselect(itemValue)}
                    }
                      >
                        {users.map((userData,index)=> (
                               <Picker.Item
                               key={index}
                               
                               label={userData.data.name}  value={userData.id}  />)
                
                
                        )}
                
                
                  </Picker>:

                <Text style={{color:'white', fontWeight:'700'}}>{item.data?.survedby?.split('@')[0]}</Text>}
               </View>
               <View>
                {
                  supliersEmail ?  <UploadIcon 
                  onPress={handleUploadEmail}
                  name='file-upload' color='pink' size={25} />:
                <EditIcon 
                onPress={()=>setSupliersEmail(true)}
                name='edit' color='green' size={25} />}
               </View>
               <View>
                <DeleteIcon 
                onPress={()=>{handleDeleteSuplier((item.id,item.data.bookeduserid, item.data?.survedid))}}
                name='delete' color='red' size={25} />
               </View>
                </View>
              
              :
    
              <View style={{flexDirection:'row'}}>
               <View >
                {supliersEmail ?
                
<Picker
        selectedValue={supliersEmailselect}
        style={{ color:'black',
      
    
      width:'20%',
      backgroundColor:'white',
    
      
      }}
        onValueChange={(itemValue, itemIndex) =>{()=>
        setSupliersEmailselect(itemValue)}
    }
      >
        {users.map((userData,index)=> (
               <Picker.Item
               key={index}
               
               label={userData.data.name}  value={userData.id}  />)


        )}


  </Picker>



                
                
                :

                
                <Text style={{color:'white', fontWeight:'700'}}>
                    click edit button to select the suplier</Text>}
               </View>
               <View>
               {
                  supliersEmail ?  <UploadIcon 
                  onPress={handleUploadEmail}
                  name='file-upload' color='pink' size={25} />:
                <EditIcon 
                onPress={()=>setSupliersEmail(true)}
                name='edit' color='green' size={25} />}
                
               </View>
                </View>
    
              
              :<Text> '--'</Text>
            }
      
           </View>
           </View>
    
    
    
    
    
      
       <Button  title='Delete this Table'
       buttonStyle={{ backgroundColor: '#f65353' , width:150, margin:5 }} 
       onPress={()=>handleDeleteTable(item.id,item.data.bookeduserid, item.data?.survedid)}
       /> 
    
      
      
     
    
    
    
    </View>
  )
}

export default AdminTableData

const styles = StyleSheet.create({
    adminTablestables:{
        flexDirection:'row',
        width:'100%',
        marginLeft:'auto',
        marginRight:'auto',
        borderWidth:1,
        borderBottomWidth:2,
        borderColor:'green',
        padding:5
    },
    adminTablestablesLeft:{
        width:'50%',
       
    },
    adminTablestablesLeftText:{
        fontSize:15,
        fontWeight:'900',
         color:'white'
    },
    ontouchScroll:{
      borderColor:'white',
      borderWidth:3,
      position:'absolute',
      
      // top:widheight,

      right:10,
      backgroundColor:'#102041',
      elevation:3,
      zIndex:3,
      width:70,
      height:70,
      borderRadius:40,
      display:'flex',
      // alignContent:'center',
      justifyContent:'center',
      // alignSelf:'center'
  
    }
})
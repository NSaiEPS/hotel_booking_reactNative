import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import AdminUsersHistoryData from './AdminUsersHistoryData';
import DoneIcon from 'react-native-vector-icons/MaterialIcons';
import BlockIcon from 'react-native-vector-icons/Entypo';
import DownIcon from 'react-native-vector-icons/AntDesign';


const AdminUserData = ({length, data, index}) => {
    const [usersHistory, setusersHistory] = useState([])

    useEffect(()=>{
        firestore().collection('users').doc(data.id).collection('history').onSnapshot((snapshot)=>{
            setusersHistory(snapshot.docs.map((doc)=>({
                
                id:doc.id,
                data:doc.data(),
              
            })))
          })
    },[data.id])

    const [moreInfo, setmoreInfo] = useState(false)

    let handleMoreInfo=()=>{
        setmoreInfo(!moreInfo)
    }


    let handleUnblocktheUser=()=>{
        Alert.alert('Warning','Are you sure to Unblock the user!',[

            {text:"Yes",
            onPress:()=>{conformUnblockUser()},
            style:'cancel'
            },
            {text:"No",
            
            style:'default'
            },
            
            
            ],
            {cancelable:true}
                )

    }
    let conformUnblockUser=()=>{


    }


    let handleblocktheUser=()=>{
        Alert.alert('Warning','Are you sure to Block the user!',[

            {text:"Yes",
            onPress:()=>{conformblockUser()},
            style:'cancel'
            },
            {text:"No",
            
            style:'default'
            },
            
            
            ],
            {cancelable:true}
                )

    }
    let conformblockUser=()=>{


    }

  return (
    <View style={{marginBottom:20}}>
    <View  style={[styles.adminUsers,
    //  {        marginBottom:index+1===length ? 20:0 }
       ]}>
       
        <View style={styles.adminUsersInside}>
        <View style={styles.adminUsersLeft}>
          <Text style={styles.adminUsersLeftText}>Name</Text>
        </View>
        <View style={styles.adminUsersRight}>
        <Text style={styles.adminUsersRightText}>{data.data.name}</Text> 
        </View>

        </View>


        <View style={styles.adminUsersInside}>
        <View style={styles.adminUsersLeft}>
          <Text style={styles.adminUsersLeftText}>Table booked</Text>
        </View>
        <View style={styles.adminUsersRight}>
        <Text style={styles.adminUsersRightText}>{data.data.table? data.data.table :'not yet'} </Text> 
        </View>

        </View>

        <View style={styles.adminUsersInside}>
        <View style={styles.adminUsersLeft}>
          <Text style={styles.adminUsersLeftText}>active </Text>
        </View>
        <View style={styles.adminUsersRight}>
        <Text style={styles.adminUsersRightText}>{data.data.active? 
        <Button 
        title='Yes'
        buttonStyle={{
          backgroundColor:'green'

        }}
        />
        : '--'
        }</Text> 
        </View>

        </View>



        <View style={styles.adminUsersInside}>
        <View style={styles.adminUsersLeft}>
          <Text style={styles.adminUsersLeftText}>Survedby </Text>
        </View>
        <View style={styles.adminUsersRight}>
        <Text style={styles.adminUsersRightText}>{data.data.survedby? 
        data.data.survedby?.split('@')[0]
        : '--'
        }</Text> 
        </View>

        </View>


        <View style={[styles.adminUsersInside,{borderBottomWidth:0}]}>
        <View style={styles.adminUsersLeft}>
          <Text style={styles.adminUsersLeftText}>Email </Text>
        </View>
        <View style={styles.adminUsersRight}>
        <Text style={styles.adminUsersRightText}>{data.data.email
        }</Text> 
        </View>

        </View>



        
      </View>


          {/* Users history data */}
                   
      <View 
      >
        {usersHistory.length>0 ?
            <View >
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}> 
                    <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
                        <View>
                            <Text style={{color:'white'}}>
                           {
                            moreInfo ? 'Less Info':
                            'More info'
                           }  

                            </Text>
                            </View>
                            <View>
                                <Text>
                                <DownIcon
                            onPress={handleMoreInfo}
name={ !moreInfo? 'caretdown': 'caretup'}
size={30} color="green" />
                                </Text>
                                </View>
                        {/* <Text style={{color:'white'}}>
                           {
                            moreInfo ? 'Less Info':
                            'More info'
                           }  
                            
                            <DownIcon
                            onPress={handleMoreInfo}
name={ !moreInfo? 'caretdown': 'caretup'}
size={30} color="green" />
                        </Text> */}

                    </View>
                    <View >
                        {
data.data.block ?
<View style={{flexDirection:'row',alignItems:'center', marginTop:5}}>
<View>
    
    <Text >
<DoneIcon
onPress={handleUnblocktheUser}
name='done'
size={30} color="green" /></Text>
    </View>
    <View>
    <Text style={{color:'white'}}>
 UnBlock the user
 </Text>
    </View>
    </View>

:


<View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
<View>
    
    <Text >
    <BlockIcon
    onPress={handleblocktheUser}
name='block'
size={30} color="red" /></Text>
    </View>
    <View style={{marginLeft:5}}>
    <Text style={{color:'white'}}>

    Block the user
 </Text>
    </View>
    </View>




                        }
                      
                    </View>
                </View>
                
                {moreInfo &&
                <View style={{borderColor:'blue', borderWidth:2, marginTop:5}}>
                {usersHistory.map((userhistdata,index)=>{
                    return(
                        <AdminUsersHistoryData key={userhistdata.id}  data={userhistdata} index={index} length={usersHistory.length}/>

                    )
                })}

                </View>
                
       }
      


            </View>  :

            <View style={{justifyContent:'center',height:50}}>
              {data.data.block ?

<View style={{flexDirection:'row',alignItems:'center'}}>
<View>
    
    <Text >
    <DoneIcon
    onPress={handleUnblocktheUser}
name='done'
size={30} color="green" /></Text>
    </View>
    <View>
    <Text style={{color:'white'}}>

    UnBlock the user
 </Text>
    </View>
    </View>


:


<View style={{flexDirection:'row',alignItems:'center'}}>
<View>
    
    <Text >
   
<BlockIcon
onPress={handleblocktheUser}
name='block'
size={30} color="red" /></Text>
    </View>
    <View style={{marginLeft:5}}>
    <Text style={{color:'white'}}>

    Block the user
 </Text>
    </View>
    </View>


}
                </View>  
    }
      </View>
      </View>
  )
}

export default AdminUserData
const styles = StyleSheet.create({
    adminUsers:{
      // backgroundColor:'#102041',
      borderWidth:1,
      borderColor:'red',
      marginTop:7,
    //   paddingBottom:10
  
    },
    ontouchScroll:{
      borderColor:'white',
      borderWidth:3,
      position:'absolute',
      right:10,
      backgroundColor:'#102041',
      elevation:3,
      zIndex:3,
      width:70,
      height:70,
      borderRadius:40,
      display:'flex',
   
      justifyContent:'center',
    
  
    },
    adminUsersInside:{
      flexDirection:'row',
      borderBottomWidth:2,
      borderColor:'green',
      padding:5
  
    },
    adminUsersLeft:{
      width:'40%'
    },
    adminUsersLeftText:{
        fontSize:15,
        fontWeight:'900',
         color:'white'
    },  
    adminUsersRightText:{
      color:'white'
    }
    
  })
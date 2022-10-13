import { Alert, Appearance, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EditIcon from 'react-native-vector-icons/Entypo';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';



const AdminTables = () => {
    let [tables,settables]=useState([])
let [phoneDarkModeCheck,setPhoneDarkModeCheck]=useState(false)
const colorScheme = Appearance.getColorScheme();
const {width, height} = Dimensions.get('window')
// console.log(height)
// Have to add edit button to select the suplier




    useEffect(()=>{
        firestore().collection('tables').onSnapshot((snapshot)=>{
          settables(snapshot.docs.map((doc)=>({
              
              id:doc.id,
              data:doc.data(),
            
          })))
        }) ;
    
     
        if (colorScheme === 'dark') {
          setPhoneDarkModeCheck(true)
          
        }
      
          
          else {
            setPhoneDarkModeCheck(false)
        }
    
    },[])


    let addnewtable=()=>{
        firestore().collection('tables').add({
          name:'Table',
          active:false,
          bookedby:'',
          survedby:'',
          bookeremail:''
          
      
        })}

  
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




        const scrollRef = useRef();
        const [scrolToTopCheck, setscrolToTopCheck]=useState(false)
        
        
        const onPressTouch = () => {
          
          scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
        
          if(scrolToTopCheck){
        
          }
            else {
          scrollRef.current?.scrollToEnd({ animated: true });}
        }
        
        
        
        let handleScroll=(e)=>{
          let scrolYval=(e.nativeEvent.contentOffset.y)
          
          if(scrolYval>1500){
            setscrolToTopCheck(true)
          }
          else {
            setscrolToTopCheck(false)
          }
        
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
  return (
    <View style={{ position:'relative'}}>
      

        <View style={{marginBottom:10}}>

      <Button 
      containerStyle={{ width:'50%', marginTop:15,
       marginLeft:'auto', marginRight:'auto',
      borderColor:'red', borderWidth:2
      }}  
      type='outline'
      title={`Add new table '${tables.length}'`} onPress={addnewtable} />

      </View>





      <View style={[styles.ontouchScroll,{
borderColor:phoneDarkModeCheck ?'red':'white' , top:height-200
      }]}   >
        <TouchableOpacity onPress={onPressTouch}>
        <Text style={{alignSelf:'center'}} >
<Icon  name= {scrolToTopCheck ? 'angle-double-up': 'angle-double-down'} color='white'  size={35}/>
        </Text>
        </TouchableOpacity>

      </View>



    <ScrollView ref={scrollRef} onScroll={handleScroll} style={{backgroundColor:'#102041'}} >
      {
        tables.map((item,index)=>{
          // console.log(item.data)
          return(
<View key={item.id} style={{ marginTop:5, borderColor:'red', borderWidth:1,marginBottom: index+1===tables.length ?525:0 }}>

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
            <Text style={{color:'white', fontWeight:'700'}}>{item.data?.survedby?.split('@')[0]}</Text>
           </View>
           <View>
            <EditIcon name='edit' color='green' size={25} />
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
            <Text style={{color:'white', fontWeight:'700'}}>click edit button to select the suplier</Text>
           </View>
           <View>
            <EditIcon name='edit' color='green' size={25} />
           </View>
            </View>

          
          :<Text> '--'</Text>
        }
     {/* <Text style={{color:'white'}} >{item.data?.active ? 
     item.data?.survedby? item.data?.survedby?.split('@')[0]:
     
     "click edit button to select the suplier":
      '--'} </Text> */}
       </View>
       </View>





  
   <Button  title='Delete this Table'
   buttonStyle={{ backgroundColor: '#f65353' , width:150, margin:5 }} 
   onPress={()=>handleDeleteTable(item.id,item.data.bookeduserid, item.data?.survedid)}
   /> 

  
  
 



</View>
          )
        })
      }

      
      </ScrollView> 




    </View>
  )
}

export default AdminTables

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

// <Picker
//         selectedValue={items.category}
//         style={{ color:'black',
      
    
//       width:'93%',
//       backgroundColor:'white',
    
      
//       }}
//         onValueChange={(itemValue, itemIndex) => setitems({
//           ...items,
//           category:itemValue
//         })}
//       >
//         {Constants.products.map((item,index)=> (
//                <Picker.Item
//                key={index}
               
//                label={item.name}  value={item.name}  />)


//         )}


//       </Picker>
import { Alert, Appearance, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';



const AdminTables = () => {
    let [tables,settables]=useState([])
let [phoneDarkModeCheck,setPhoneDarkModeCheck]=useState(false)
const colorScheme = Appearance.getColorScheme();
const {width, height} = Dimensions.get('window')
// console.log(height)




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
            onPress:()=>alert('Cancelled deleting'),
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
<View key={index} style={{ marginTop:5, borderColor:'red', borderWidth:1,marginBottom: index+1===tables.length ?525:0 }}>

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
     <Text style={{color:'white'}} >{item.data?.active ? 
     item.data?.survedby? item.data?.survedby?.split('@')[0]:
     
     "click edit button to select the suplier":
      '--'} </Text>
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
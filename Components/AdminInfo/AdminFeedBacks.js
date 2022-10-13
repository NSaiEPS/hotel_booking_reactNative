import { Appearance, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-elements';
import email from 'react-native-email'




const AdminFeedBacks = () => {
    const [feedbacks, setfeedbacks] = useState([])
    let [phoneDarkModeCheck,setPhoneDarkModeCheck]=useState(false)
const colorScheme = Appearance.getColorScheme();
const {width, height} = Dimensions.get('window')

    useEffect(()=>{
        firestore().collection('feedBacks').orderBy('time').onSnapshot((snapshot)=>{
            setfeedbacks(snapshot.docs.map((doc)=>({
                
                id:doc.id,
                data:doc.data(),
              
            })))
          })


        if (colorScheme === 'dark') {
            setPhoneDarkModeCheck(true)
            
          }
        
            
            else {
              setPhoneDarkModeCheck(false)
          }

    },[])

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

    let handleSendEmail=(email)=>{
        email(`${email}`, {
          
           
            subject: `FeedBack from Admin of Devi Residencies`,
            
            body: '',
            checkCanOpen: false 

        }).catch(console.error)
    }

  return (
    <View>
      

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
        {feedbacks.map((data,index)=>{
            return(
                <View key={data.id} style={{marginTop:10, marginBottom:10, borderColor:'red', borderWidth:1}}>
                    
                    <View style={styles.adminFeedBacksInside}>
                        <Text style={styles.adminFeedBacksInsideLeftText}>Name</Text>
                        <Text style={styles.adminFeedBacksInsideRightText}>{data.data.username}</Text>
                        </View>

                        <View style={styles.adminFeedBacksInside}>
                        <Text style={styles.adminFeedBacksInsideLeftText}>Email</Text>
                        <Text style={styles.adminFeedBacksInsideRightText}>{data.data.useremail}</Text>
                        </View>
                        <View style={styles.adminFeedBacksInside}>
                        <Text style={styles.adminFeedBacksInsideLeftText}>Time</Text>
                        <Text style={styles.adminFeedBacksInsideRightText}>{data.data.time}</Text>
                        </View>
                        <View style={[styles.adminFeedBacksInside,{borderBottomWidth:0,}]}>
                        <Text style={styles.adminFeedBacksInsideLeftText}>FeedBack</Text>
                        <Text style={styles.adminFeedBacksInsideRightText}>{data.data.feedBack}</Text>
                        </View>

                        <View>
                            {/* <Text>Send an email to {data.data.username}</Text> */}
                            <Button 
                            title={`Send an Email to ${data.data.username}`}
                            onPress={()=>handleSendEmail(data.data.useremail)}
                            
                            />
                        </View>

                        
                    </View>
            )
        })}
      </ScrollView>
    </View>
  )
}

export default AdminFeedBacks

const styles = StyleSheet.create({
    adminFeedBacksInside:{
flexDirection:'row',
borderBottomColor:'green',
borderBottomWidth:2,
padding:7,
paddingLeft:10
    },
    adminFeedBacksInsideLeftText:{
        width:'30%',
        color:'white'
    },
    adminFeedBacksInsideRightText:{
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
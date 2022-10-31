import { FlatList, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-elements'
import FeedBack from './FeedBack'
import { FooterContstans } from './Constants'
import Icon from 'react-native-vector-icons/FontAwesome';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const Footer = () => {
  const [feedBackModel, setfeedBackModel] = useState(false)
    return (
    <View style={styles.footer}>

<View style={styles.footerp1}>

  <View>
    <Text style={styles.footerp1Text}>{FooterContstans.section1.title}</Text>
   
  </View>

  <View style={styles.footerp1flatList}>
    <FlatList
          //  numColumns={2}

              contentContainerStyle={{
                // alignContent:'space-around'
                // alignSelf:'stretch'
                marginLeft:10,
                marginTop:20

              }}
           data={FooterContstans.section1.icons}
           scrollEnabled={true}
           horizontal={true}
           renderItem={({item})=>{
            // console.log(item)
           return(

           <View style={{marginLeft:25}}>
            {
              item!=='email'?

            
<Icon

onPress={() => Linking.openURL('https://github.com/NSaiEPS/hotel_booking_reactNative')}
name={`${item}`}
size={30} color="black" />:
<EmailIcon
onPress={() => Linking.openURL('https://github.com/NSaiEPS/hotel_booking_reactNative')}

name={`${item}`}
size={30} color="black" />}

         
</View>)}}/>


  </View>

</View>



<View style={styles.footerp2}>

  <View style={styles.footerp2s1}>
  <Text style={styles.footerp1Text}>{FooterContstans.section2.title}</Text>
  {
    FooterContstans.section2.items.map((item,index)=>{
      return(
        <View key={index}>
        <Text style={{color:'white',textAlign:'center',marginTop:5}}>
          {item}

        </Text>
        </View>
      )
    })

  }


  </View>


  <View style={styles.footerp2s1}>
  <Text style={styles.footerp1Text}>{FooterContstans.section3.title}</Text>
  {
    FooterContstans.section3.place.map((item,index)=>{
      return(
        <View key={index}>
        <Text style={{color:'white',textAlign:'center',marginTop:5}}>
          {item}

        </Text>
        </View>
      )
    })

  }


  </View>

  <View>
    <View>
      <Text style={styles.footerp1Text}>
        For any Queries or Feedbacks please fill the FeedBack form
      </Text>
    </View>
    <View>

      <Button 
      title='FeedBack Form'
      onPress={()=>
        setfeedBackModel(true)

      }
      buttonStyle={{
        marginTop:15
      }}
      />

        {feedBackModel &&
        <View style={{position:'absolute'}} >
        <FeedBack  modelOpen={feedBackModel} setModelOpenState={setfeedBackModel}/>
        </View>
        }
    </View>
  </View>

</View>
    </View>
  )
}
{/* <Pressable onPress={() => Linking.openURL('https://github.com/NSaiEPS/hotel_booking_react')}>
{({ pressed }) =>
  <Text style={{
    textDecorationLine: 'underline',
    color: pressed ? 'red' : 'blue'
  }}>I'm a hyperlink!</Text>
}
</Pressable> */}

export default Footer

const styles = StyleSheet.create({
  footer:{
    backgroundColor:'#09354d',
    // color:'white',
    marginTop:15,
    padding:8
   
  },
  footerp1:{
    // flexDirection:'row'
  },
  footerp1flatList:{
    flexDirection:'column'
  },
  footerp2s1:{
    // marginLeft:'auto',
    // width:'50%'
    // marginRight:'auto'

  },
  footerp1Text:{
    color:'white',
    fontWeight:'700',
    textAlign:'center',
    marginTop:15,
    fontSize:20
  }
  })
import { Appearance, Dimensions, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import { Image } from 'react-native-elements'
import FuaturedItems from '../Components/FuaturedItems'
import Tables from '../Components/Tables'
import { db } from '../Firebase'
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button, Input ,Image} from 'react-native-elements'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { SelectAdminSignIn, SelectUserSignIn, userSignInAction } from '../Components/Redux/Redux_Slice'
// import { Firestore } from 'firebase/firestore'
import firestore from '@react-native-firebase/firestore';
import UserBlockedshow from '../Components/UserBlockedshow'
import Footer from '../Components/Footer'



const HomeScreen = ({navigation}) => {
  // const [headerMoreInfo, setheaderMoreInfo] = useState(false)
  let dispatch=useDispatch()
  let selectUserSignIn=useSelector(SelectUserSignIn)
  // console.log(selectUserSignIn, 'HomeScreen')
  const colorScheme = Appearance.getColorScheme();


let [phoneDarkModeCheck,setPhoneDarkModeCheck]=useState(false)
let [userBlocked,setuserBlocked]=useState(false)


  // let selectAdminSignIn=useSelector(SelectAdminSignIn)

  // let handleMoreOptions=()=>{
  //   setheaderMoreInfo(!headerMoreInfo)
  // }


   
//   useLayoutEffect(()=>{

//     navigation.setOptions({
//         title:null,
//     headerTintColor:"black",

//         headerLeft:()=>(
//             <View
//             style={{
//                 display:'flex',
//                 flexDirection:'row',
//                 justifyContent:'space-between',
//                 alignContent:'space-around',
//                 width:'95%'
//             }}
            
//             >
//                 <View
              
//                 >
//                 <Image 
//                 source={{
//                     uri:"https://img.freepik.com/premium-vector/initial-dr-letter-logo-with-script-typography-vector-template-creative-script-letter-dr-logo-design_616200-715.jpg"

//                 }}
//                 style={{
//                   // width:'100%',
//                   // height:'100%'
//                   width:35,
//                       height:35,
                    
//                     // borderRadius:10
                    
                    
//                 }}
//                 />
//                 </View>

//                 <View
//                 style={{
//                     justifyContent:'center',
                   
//                 }}
//                 >
//                     <Text
//                     style={{
//                         fontSize:25,
//                         fontWeight:'700',
//                         color:'black'
//                     }}
//                     >Devi Residencies</Text>
//                 </View>

//                 <View
                
                
                
//                 >
// {/* 
//              {
//               headerMoreInfo ? 
//             <Icon 
         
            
//             name="nav-icon-list-a" size={30} color="black" />

//              :
//               <Icon 
              

              
//               name="nav-icon-a" size={30} color="black" />} */}

//    <Icon
//    onPress={handleMoreOptions

//    }
//    name={
//     headerMoreInfo? 'nav-icon-list-a':"nav-icon-a" }
//     size={30} color="black" />
 

//               {/* </Text> */}

//               {/* <Icon.Button
//               name="facebook"
//               backgroundColor="#3b5998"
//               onPress={() => alert('Login with Facebook')}>
//               Login with Facebook
//             </Icon.Button> */}

// {/* <Icon 

// name='wechat'
// type='antdesign'
// size={24}
// color='black'
// /> */}

//                 </View>
//             </View>
//         )
//     })

// },[])


useLayoutEffect(()=>{
  navigation.setOptions({headerShown: false})
},[])


let [tables,settables]=useState([])
let [user,setUser]=useState([])



useEffect(()=>{
  firestore().collection('tables').onSnapshot((snapshot)=>{
    settables(snapshot.docs.map((doc)=>({
        
        id:doc.id,
        data:doc.data(),
      
    })))
  }) ;

  firestore().collection('users').onSnapshot((snapshot)=>{
    setUser(snapshot.docs.map((doc)=>({
        
        id:doc.id,
        data:doc.data(),
      
    })))
  }) ;

  // const unsubsribe= db.collection('chats').onSnapshot(snap=>{
  //   settables(snap.docs.map(doc=>({
  //     id:doc.id,
  //     data:doc.data()
  //   })))
  // })

  if (colorScheme === 'dark') {
    setPhoneDarkModeCheck(true)
    
  }

    
    else {
      setPhoneDarkModeCheck(false)
  }
 

},[])

// IMp

// import firestore from '@react-native-firebase/firestore';
// const usersCollection = firestore().collection('users');
// let [tables,settables]=useState([])

// // .log(tables.length)
// useEffect(()=>{
//   firestore().collection('tables').onSnapshot((snapshot)=>{
//     settables(snapshot.docs.map((doc)=>({
        
//         id:doc.id,
//         data:doc.data(),
      
//     })))
//   }) ;
// },[])


// console.log(tables?.length)

// console.log(tables)





// console.log(user, 'user info')


    useEffect(()=>{

    
    if(Array.isArray(user)){
    
      user?.map((userinformation)=>{
         if(userinformation?.data?.email===selectUserSignIn?.email)
         {
            dispatch(
                userSignInAction({
                    email:selectUserSignIn?.email,
                    name:selectUserSignIn?.name,
                    userId:userinformation?.id,
                    tablebooked:userinformation?.data?.table,
                    block:selectUserSignIn?.block,
                    active:selectUserSignIn?.active,
                    survedby:userinformation?.data?.survedby
        
                })
                )

                if(userinformation.data?.block){
                  setuserBlocked(true)
                }
         }
  })}

},[user])

// if(userBlocked){


//   return(
//     <div className='Blockuser'>
//       <div className='Blockuser_inside'>
//         <div>We are extreamly sorry to inform that you are blocked by the Admin.</div>
//         <div><div>It's not by your fault! Mail him </div>
//         <div>
//  <form
//   onSubmit={submitFeedbackForm}
//     style={{maxWidth:'500px', marginLeft:'auto',marginRight:'auto', width:'95%'}}
//   >
//   <div className="form-group m-2">
//     <label for="exampleFormControlInput1">Your Name</label>
//     <input type="name" className="form-control col-md-5 col-12" id="exampleFormControlInput1"
//      placeholder="write your name here" required name='user_name' value={userss?.displayName}/>
//   </div>
//   <div className="form-group m-2">
//     <label for="exampleFormControlInput1">Email address</label>
//     <input type="email" className="form-control" id="exampleFormControlInput1" 
//     placeholder="write your email address here" required name='user_email' value={userss?.email}/>
//   </div>


//   <div className="form-group m-2">
//     <label for="exampleFormControlTextarea1">Message</label>
//     <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
//      required name='message'/>
//   </div>
//   <button type='submit' className='btn btn-primary m-2'>Submit</button>
// </form>
//         </div>

//         </div>
//       </div>
//     </div>
//   )
// }



// const windowWidth = Dimensions.get('window')
const {width, height} = Dimensions.get('window')
// console.log(width, height,'Home screen')


// let find_dimesions=(layout)=>{
//   const {x, y, width, height} = layout;
//   console.log(x);
//   console.log(y);
//   console.log(width);
//   console.log(height);
// }

const [tablesInfo,setTablesInfo]=useState({
  total:0,
  booked:0,
  unbooked:0
})
useEffect(()=>{
  let unb=0;
  let boked=0;
  { Array.isArray(tables) && tables?.map((items)=>{
    let ac=items.data.active;
    if(!ac) {
      unb+=1;
      
      
  
    }
    else {
      boked+=1
      
    }
    // console.log(unb)
    // setUnbooked(unb)
    // dispatch(unbookedtable(
    //   unb
    // )
  
    // )
  })}
  setTablesInfo({
    ...tablesInfo,
    total:tables.length,
    unbooked:unb,
    booked:boked,
  })


},[tables])







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


if(userBlocked){
  return(
  <UserBlockedshow userBlocked={userBlocked}/>)
}


// const []


return (
    <SafeAreaView>
         {
            Platform.OS !== "ios" &&
         <StatusBar
        translucent={false}
        backgroundColor='#0e73c4'
        barStyle={"dark-content"}
        // barStyle={statusColor ? "light-content" : "dark-content"}
      />}

      <View
      style={{
        borderColor: phoneDarkModeCheck ?'red':'white',
         borderWidth:1,
         zIndex:1
      }}
      >
      <Header  navigation={navigation}/></View>
     
      <View style={[styles.ontouchScroll,{
borderColor:phoneDarkModeCheck ?'red':'white' 
      }]}   >
        <TouchableOpacity onPress={onPressTouch}>
        <Text style={{alignSelf:'center'}} >
<Icon  name= {scrolToTopCheck ? 'angle-double-up': 'angle-double-down'} color='white'  size={35}/>
        </Text>
        </TouchableOpacity>

      </View>
    <View
    style={styles.homeScreen} 
    // onLayout={(layout)=> find_dimesions(layout)}
    >
      {/* <FuaturedItems/> */}
      {/* <Tables  navigation={navigation} /> */}

      <View style={styles.tablesNumberInformation}>
      <Text style={{color:'white',textAlign:'center',fontWeight:'600'}}>
        We have {tables.length} tables in which {tablesInfo.booked} tables are booked, remaining {tablesInfo.unbooked} tables are available for booking.
      </Text>
    </View>

      <ScrollView   ref={scrollRef} onScroll={handleScroll}>
        
        {
          tables.map((item,index)=>
          {
          return(
            <View
            key={index}
            >

            <Tables name={item.data.name} active={item.data.active} bookedby={item.data.bookedby}
survedby={item.data.survedby} id={item.id} index={index} bookerid={item.data.bookeduserid}
bookeremail={item.data.bookeremail}  navigation={navigation} length={tables.length}/>
            </View>




          )})
        }

{/* <View style={styles.homeScreenFooter}>

      <Footer/>
      </View> */}

      </ScrollView>

      {/* <View style={styles.homeScreenFooter}>

      <Footer/>
      </View> */}

      

      

     
    </View>
    {/* <Footer/> */}
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

  homeScreen:{
    backgroundColor:'#e4f7e9' ,
    // backgroundColor: '#051b30' ,
    backgroundColor: '#102041' ,
    color:'white'
  },

  ontouchScroll:{
    borderColor:'white',
    borderWidth:3,
    position:'absolute',
    
    bottom:125,
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

  },
  homeScreenFooter:{
    backgroundColor:'red',
    color:'white',
   zIndex:4
  },
  tablesNumberInformation:{
    width:'90%',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:5,
    paddingBottom:5,
    borderRadius:10,
    borderBottomColor:'white',
    borderBottomWidth:1
  }
})
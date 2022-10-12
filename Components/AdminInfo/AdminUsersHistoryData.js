import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AdminUsersHistoryData = ({data,length,index}) => {
    // console.log(data.data)
  return (
    <View style={styles.adminUsersHistoryData}>
     <View style={styles.adminUsersHistoryDataInside}>
     <View style={styles.adminUsersHistoryDataInsideLeft}>
            <Text style={styles.adminUsersHistoryDataLeftText}>Table</Text>
        </View>
        
        <View>
            <Text style={{color:'white'}}>
                {data.data.table}
            </Text>
        </View>
     </View>

     <View style={[styles.adminUsersHistoryDataInside,{
        borderBottomWidth: data.data.timestamp?2:0 

     }]}>
     <View style={styles.adminUsersHistoryDataInsideLeft}>
            <Text style={styles.adminUsersHistoryDataLeftText}>booking status</Text>
        </View>
        
        <View>
            <Text style={{color:'white'}}>
                {data.data.status}
            </Text>
        </View>
     </View>

     {
        data.data.timestamp &&     

     <View style={[styles.adminUsersHistoryDataInside,
     {borderBottomWidth:0}]}>
     <View style={styles.adminUsersHistoryDataInsideLeft}>
            <Text style={styles.adminUsersHistoryDataLeftText}>Time</Text>
        </View>
        
        <View>
            <Text style={{color:'white'}}>
                {data.data.timestamp}
            </Text>
        </View>
     </View>}

   
    </View>
  )
}

export default AdminUsersHistoryData

const styles = StyleSheet.create({
    adminUsersHistoryData:{
borderWidth:1,
borderColor:'red',
marginTop:10
    },
    adminUsersHistoryDataInside:{
        flexDirection:'row',
        borderBottomWidth:2,
        borderColor:'green',
        padding:5
    },
    adminUsersHistoryDataInsideLeft:{
        width:'40%'

    },
    adminUsersHistoryDataLeftText:{
        color:'white'
    }
})
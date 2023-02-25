import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { View,Text, StyleSheet } from 'react-native';
import axios from 'axios';


const SettingScreen = (route) =>{
    const {isLoading, data} = useQuery(['userData'], () => {
        return (axios.get('http://192.168.0.166:50011/loadUserData'))
    });
    return(
        <View style={styles.screen}>
            {!isLoading&&<View>
            <Text>Setting Screen</Text>
                <Text>{data.data['name']}</Text>
                <Text>{data.data['height']}</Text>
                <Text>{data.data['kcal']}</Text>
                <Text>{data.data['province']}</Text>
                <Text>{data.data['protein']}</Text>
            </View>}
        </View>
    )
}

export default SettingScreen;

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
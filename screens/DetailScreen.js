import React, { useState } from 'react';
import { View,Text, StyleSheet, Button, ActionSheetIOS, Image } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import axios from 'axios';

const DetailScreen = () =>{
    const [foodImg, setFoodImg] = useState();
    const [foodData, setFoodData] = useState([]);
    const openCamera = async () =>{
        const result = await launchCamera()
        console.log(result)
    }
    const showImagePicker = async () =>{
        const result = await launchImageLibrary()
        if(result.didCancel){
            console.log('취소')
        }else{
            setFoodImg(result.assets[0].uri)
        }
    }
    const sendImg = async () => {
        const fd = new FormData();
        const data = {
            uri: foodImg,
            type: 'image/jpeg',
            name: 'test',
        }
        fd.append('file', data);
        axios.post('http://192.168.0.166:50011/predict', fd, {
            headers: {
              'content-type': 'multipart/form-data',
            }, 
            responseType: 'json'
        })
        .then((res) => {
            setFoodImg(`data:image/jpeg;base64,${res.data[0].image_data}`)
        })
        .catch((err) => {
            Alert.alert('인식하지 못했어요!')
        });
    }
    const actionSheet = () =>{
        ActionSheetIOS.showActionSheetWithOptions(
            {
              options: ["카메라로 촬영하기", "사진 선택하기", "취소"],
              cancelButtonIndex: 2,
            },
            (buttonIndex) => {
              if (buttonIndex === 0) {
                openCamera();
              } else if (buttonIndex === 1) {
                showImagePicker();
              }
            },
        )
    }
    return(
        <View style={styles.screen}>
            <View style={styles.imageBox}>
            {
                foodImg && <Image source={{ uri: foodImg }}
                style={styles.image} /> 
            }    
            </View>
            <Text>Detail Screen</Text>
            <Button title='actionSheet' onPress={actionSheet}></Button>
            <Button title='recog' onPress={sendImg}></Button>
        </View>
    )
}

export default DetailScreen;

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    imageBox:{
        width:'90%',
        height:"50%",
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        resizeMode : 'contain',
        backgroundColor: '#ffffff',
        shadowColor: "#000",
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
    },
    image: {
        width:'100%',
        height:"100%",
        borderRadius:10,
        resizeMode : 'contain',
        backgroundColor: '#ffffff'
    },
})
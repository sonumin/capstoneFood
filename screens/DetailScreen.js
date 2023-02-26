import React, { useState } from 'react';
import { View,Text, StyleSheet, Button, ActionSheetIOS, Image, Pressable } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

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
            <View style={styles.imageContainer}>
                <View style={styles.imageBox}>
                {
                    foodImg && <Image source={{ uri: foodImg }}
                    style={styles.image} /> 
                }    
                </View>
            </View>
            <View style={styles.labelContainer}>

            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={actionSheet}>
                    <Icon name="camera" size={24} color="#ffffff"> or <Icon name="copy" size={24} color="#ffffff" /></Icon>             
                </Pressable>
                <Pressable style={styles.button} onPress={sendImg}>
                    <Icon name="send" size={24} color="#ffffff" />
                </Pressable>
                <Pressable style={styles.button}>
                    <Icon name="save" size={24} color="#ffffff" />
                </Pressable>
            </View>
        </View>
    )
}

export default DetailScreen;

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        height:"50%",
    },
    imageBox:{
        width:'88%',
        height:"88%",
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
    labelContainer: {
        width: '100%',
        height:"35%",
        alignItems:'center',
    },
    buttonContainer: {
        width: '92%',
        height: "15%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 100,
        elevation: 3,
        backgroundColor: 'black',
        bored:'2',
        shadowColor: "#000",
          shadowOffset: {
            width: 5,
            height: 5,
          },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
    image: {
        width:'100%',
        height:"100%",
        borderRadius:10,
        resizeMode : 'contain',
        backgroundColor: '#ffffff'
    },
})
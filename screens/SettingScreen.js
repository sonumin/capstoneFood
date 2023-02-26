import { React, useState, useEffect} from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { View,Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const SettingScreen = (route) =>{
    const imgArray = []
    const userData = useQuery(['userData'], () => {
        return fetch('http://192.168.0.166:50011/loadUserData').then((res)=> res.json())
    });
    const imagesData = useQuery(['imageData'], () => {
        return fetch('http://192.168.0.166:50011/load9Images').then((res)=> res.json())
    });
    const [userProfile, setUserProfile] = useState();
    const [profileImg, setProfileImg] = useState();
    const [nineImages, setNineImages] = useState();
    // useEffect(()=>{
    //     console.log(result)
    // },[result])
    const divideImages = () =>{
        if(imagesData.data !== undefined){
            for(let i = 0; i < 9; i++){
                imgArray[i] = imagesData.data[i]['image_data']
            }
            setNineImages(imgArray)
        }
    }
    useEffect(()=>{
        if(userData){
            setUserProfile(userData.data)
        }
    },[userData])
    useEffect(()=>{
        if((imagesData.data !== undefined)&&!nineImages){
            divideImages()
        }
    },[imagesData])
    const NineImages = () => {
    
        return(
            nineImages&&
            <View style={styles.secondContainer}>
                <View  style={styles.imageRow}>
                    <Image style={styles.imageBox} source={{uri:`data:image/jpeg;base64,${nineImages[0]}`}}></Image> 
                    <Image style={styles.imageBox} source={{uri:`data:image/jpeg;base64,${nineImages[1]}`}}></Image> 
                    <Image style={styles.imageBox} source={{uri:`data:image/jpeg;base64,${nineImages[2]}`}}></Image> 
                </View>
                <View style={styles.imageRow}>
                    <Image style={styles.imageBox} source={{uri:`data:image/jpeg;base64,${nineImages[3]}`}}></Image> 
                    <Image style={styles.imageBox} source={{uri:`data:image/jpeg;base64,${nineImages[4]}`}}></Image> 
                    <Image style={styles.imageBox} source={{uri:`data:image/jpeg;base64,${nineImages[5]}`}}></Image> 
                </View>
                <View style={styles.imageRow}>
                    <Image style={styles.imageBox} source={{uri:`data:image/jpeg;base64,${nineImages[6]}`}}></Image> 
                    <Image style={styles.imageBox} source={{uri:`data:image/jpeg;base64,${nineImages[7]}`}}></Image> 
                    <Image style={styles.imageBox} source={{uri:`data:image/jpeg;base64,${nineImages[8]}`}}></Image> 
                </View>
            </View>
        );
    }

    const openCamera = async () =>{
        const result = await launchCamera()
        console.log(result)
    }
    const showImagePicker = async () =>{
        const result = await launchImageLibrary()
        if(result.didCancel){
            console.log('취소')
        }else{
            setProfileImg(result.assets[0].uri)
        }
    }
    const navigation= useNavigation();
    const toSettingScreen =() => {
        navigation.navigate("Send")
    }
    return(
        nineImages&&userProfile&&
        <View style={styles.screen}>
            <View style={styles.firstContainer}>
                <View style={styles.profileContainer}>
                    <View style={styles.profile}>
                        {/* <Image style={styles.profileImage} source={{uri:`data:image/jpeg;base64,${' '}`}}> */}
                        <Image style={styles.profileImage} source={require('/Users/jongsik2/Desktop/RN/RN_food/egg-bread.png')}>

                        </Image>
                        <View style={styles.profileName}>
                            <TouchableOpacity style={styles.button} onPress={toSettingScreen}>
                                <Icon name="settings-outline" size={24} color="#000000" />
                            </TouchableOpacity>
                            <Text>{userProfile['name']}</Text>
                        </View>
                    </View>
                <View style={styles.goalContainer}>
                    <Text>{userProfile['kcal']}</Text>
                    <Text>{userProfile['carbo']}</Text>
                    <Text>{userProfile['province']}</Text>
                    <Text>{userProfile['protein']}</Text>
                </View>
                </View>
            </View>
            <View style={styles.history}>
                <Text style={{fontSize:22}}>History</Text>
            </View>
            <NineImages/>
        </View>
    )
}

export default SettingScreen;

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'white',
    },
    firstContainer:{
        width: '100%',
        height: '45%',
        alignItems:'center',
        justifyContent:'center',
    },    
    profileContainer:{
        width:'88%',
        height:'85%',
        borderRadius: 16,
        backgroundColor:'#ffffff',
        shadowColor: "#000",
          shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    profile:{
        width:'100%',
        height:'50%',
        flexDirection:'row'
    },
    profileImage:{
        width:'35%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    profileName:{
        width:'65%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    goalContainer:{
        width:'100%',
        height:'50%',
        alignItems:'center',
        justifyContent:'center',
    },
    history:{
        width: '90%',
        height: '5%',
    },
    secondContainer:{
        width: '90%',
        height: '50%',
    },
    imageRow:{
        width: '100%',
        height:'33%',
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row',
    },
    imageBox:{
      width: '30%',
      height:'90%',
      marginRight:'1%',
      marginTop:'1%',
      marginBottom:'1%',
      marginLeft:'1%',
      borderRadius:8
    },
})
import { React, useState, useEffect} from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { View,Text, StyleSheet, Image, TouchableOpacity,ActionSheetIOS} from 'react-native';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const SettingScreen = (route) =>{
    const imgArray = []
    const userData = useQuery(['userData'], () => {
        return fetch('http://123.199.90.18:5001/loadUserData').then((res)=> res.json())
    });
    const imagesData = useQuery(['imageData'], () => {
        return fetch('http://123.199.90.18:5001/load9Images').then((res)=> res.json())
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
                        <TouchableOpacity style={styles.profileImageContainer} onPress={actionSheet}>
                            {profileImg&&<Image style={styles.profileimg}source={{ uri: profileImg }}/>}
                        </TouchableOpacity>
                        {/* <Image style={styles.profileImage} source={require('/Users/haesu/Desktop/RN_Food/RN_food/egg-bread.png')}/> */}
                        <View style={styles.profileName}>
                            <TouchableOpacity style={styles.button} onPress={toSettingScreen}>
                                <Icon name="settings-outline" size={24} color="#000000" />
                            </TouchableOpacity>
                            <Text style={styles.userlable}>안녕하세요 {userProfile['name']}님!</Text>
                        </View>
                    </View>
                <View style={styles.goalContainer}>
                    <Text style={styles.goalText}>키 : {userProfile['height']} 몸무게 : {userProfile['weight']}</Text>
                    <Text style={styles.goalText}>목표 칼로리 : {userProfile['kcal']}</Text>
                    <Text style={styles.goalText}>목표 탄수화물 : {userProfile['carbo']}  목표지방 : {userProfile['province']}</Text>
                    <Text style={styles.goalText}>목표 단백질 : {userProfile['protein']}</Text>
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
        flexDirection:'row',
        justifyContent:'center',
    },
    profileImageContainer:{
        width:'35%',
        height:'90%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        padding:'2%'
    },
    profileimg:{
        marginTop:'15%',
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        borderRadius:70,
    },
    profileName:{
        width:'65%',
        height:'100%',

    },
    goalContainer:{
        width:'100%',
        height:'50%',
        justifyContent:'space-around',
        padding:'5%'
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
    button: {
        marginTop:'5%',
        marginLeft:'80%',
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
      },
      userlable:{
        width:'95%',
        height:'30%',
        marginTop:'5%',
        marginLeft:'5%',    
        fontSize:23,
  
      },
      goalText:{
        fontSize:17
      },
})
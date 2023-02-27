import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
  } from 'react-native';


const LoginScreen = () =>{
    const [id,setId] = useState('');
    const [password,setPassword] = useState('');
    return(
        <View style={styles.screen}>
        {/* <Loader loading={loading} /> */}
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            }}>
            <View>
            <KeyboardAvoidingView enabled>
                <View style={{alignItems: 'center'}}>
                <Image
                    source={require('/Users/haesu/Desktop/RN_Food/RN_food/egg-bread.png')}
                    style={{
                    width: '50%',
                    height: 100,
                    resizeMode: 'contain',
                    margin: 30,
                    }}
                />
                </View>
                <View style={styles.SectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(val) =>
                    // setUserEmail(UserEmail)
                        setId(val)
                    }
                    placeholder="Enter Email" //dummy@abc.com
                    placeholderTextColor="#b4b1ae"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    // onSubmitEditing={() =>
                    // // passwordInputRef.current &&
                    // // passwordInputRef.current.focus()
                    // }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                />
                </View>
                <View style={styles.SectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserPassword) =>
                        setPassword(UserPassword)
                    }
                    placeholder="Enter Password" //12345
                    placeholderTextColor="#b4b1ae"
                    keyboardType="default"
                    // ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                />
                </View>
                {/* {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                    {errortext}
                </Text>
                ) : null} */}
                <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                >
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>
                <Text
                style={styles.registerTextStyle}>
                New Here ? Register
                </Text>
            </KeyboardAvoidingView>
            </View>

            <TouchableOpacity
                style={styles.kakaobutton}
                activeOpacity={0.5}
            >
                <Image source={require('/Users/haesu/Desktop/RN_Food/RN_food/kakao.png')} style={{width:22,height:20,resizemode:'contain',marginRight:20}}/>
                <Text style={styles.kakaoTextStyle}>Login with Kakao</Text>
            </TouchableOpacity>
        </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white'
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#000000',
        borderWidth: 0,
        color: '#000000',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#ffffff',
        paddingVertical: 10,
        fontSize: 16,
    },
    kakaobutton: {
        flexDirection:'row',
        backgroundColor: '#FEE500',
        borderWidth: 0,
        color: '#000000',
        borderColor: '#7DE24E',
        height: 40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    kakaoTextStyle: {
        color: '#000000',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
        width:'88%'
    },
    registerTextStyle: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
})

export default LoginScreen;
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const SendScreen=()=>{
    return(
        <View style={styles.screen}>
            <View style={styles.firstContainer}>
                <View style={styles.textBoxContainer}>
                    <View style={styles.textBoxRow}>
                        <Text style={styles.textCon}>이름 :</Text>
                        <TextInput style={styles.textBox}
                            placeholder='이름을 적으시오'
                            onChangeText={val=>{
                            }}
                        />
                    </View>
                    <View style={styles.textBoxRow}>
                        <Text style={styles.textCon}>키 :</Text>
                        <TextInput style={styles.textBox}
                            placeholder='키를 적으시오'
                            
                            onChangeText={val=>{
                            }}
                        />
                    </View>
                    <View style={styles.textBoxRow}>
                        <Text style={styles.textCon}>몸무게 :</Text>
                        <TextInput style={styles.textBox}
                            placeholder='몸무게를 적으시오'
                            onChangeText={val=>{
                            }}
                        />
                    </View>
                    <View style={styles.textBoxRow}>
                        <Text style={styles.textCon}>칼로리 :</Text>
                        <TextInput style={styles.textBox}
                            placeholder='칼로리를 적으시오'
                            value={Number}
                            onChangeText={val=>{

                            }}
                        />
                    </View>
                    <View style={styles.textBoxRow}>
                        <Text style={styles.textCon}>탄수화물 :</Text>
                        <TextInput style={styles.textBox}
                            placeholder='탄수화물을 적으시오'
                            value={Number}
                            onChangeText={val=>{
                            }}
                        />
                    </View>
                    <View style={styles.textBoxRow}>
                        <Text style={styles.textCon}>단백질 :</Text>
                        <TextInput style={styles.textBox}
                            placeholder='단백질을 적으시오'
                            value={Number}
                            onChangeText={val=>{
                            }}
                        />
                    </View>
                    <View style={styles.textBoxRow}>
                        <Text style={styles.textCon}>지방 :</Text>
                        <TextInput style={styles.textBox}
                            placeholder='지방을 적으시오'
                            onChangeText={val=>{
                            }}
                        />
                    </View>
                </View>
              
            
            </View>
            <View style={styles.secondContainer}>
                <Pressable style={styles.button} >
                    <Icon name="save" size={24} color="#ffffff" />
                </Pressable>
            </View>
        </View>
    )
}
export default SendScreen;

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    firstContainer:{
        width:'100%',
        height:'80%',
        alignItems: 'center',
        justifyContent:'center',
    },
    textBoxContainer:{
        width:'88%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    textBoxRow:{
        flexDirection:'row',
        width:'88%',
        height:'14%',
        alignItems:'center',
    },
    textCon:{
        width:'38%',
        height:'25%',
        textAlign:'center',
        fontSize:18
    },
    textBox:{
        borderWidth:1,
        width:'50%',
        height:'40%',
        borderRadius: 5,
        textAlign:'center'
    },
    secondContainer:{
        width:'100%',
        height:'20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#000',
        bored:'2',
        shadowColor: "#000",
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        width:'24%',
        height:'40%'
    },
})
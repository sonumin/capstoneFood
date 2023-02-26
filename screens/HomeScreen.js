import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View,Text, StyleSheet, Button, Dimensions, ScrollView } from 'react-native';
import {LineChart,ProgressChart} from "react-native-chart-kit";

const { width, height } = Dimensions.get('window');
const viewcolor = '#ffffff'

const HomeScreen = () =>{
    const arr = [[],[],[],[],[]]
    const [weekData, setWeekData] = useState();
    const {isLoading, isSuccess, data} = useQuery(['weekData'],  () => {
        return fetch('http://192.168.0.166:50011/loadWeekData').then((res)=> res.json())
    });
    const convertWeek = () =>{
        if(isSuccess){
            for(let i = 0; i < 7; i++){
                arr[0][i] = data[i]['date'].substring(5,)
                arr[1][i] = data[i]['kacl']
                arr[2][i] = data[i]['carbo']
                arr[3][i] = data[i]['province']
                arr[4][i] = data[i]['protein']
            }
        }
    }
    const convertPersent = () =>{
        if(isSuccess){
            for(let i = 0; i < 7; i++){
                arr[0][i] = data[i]['date'].substring(5,)
                arr[1][i] = data[i]['kacl']
                arr[2][i] = data[i]['carbo']
                arr[3][i] = data[i]['province']
                arr[4][i] = data[i]['protein']
            }
        }
    }
    useEffect(()=>{
        if(data){
            convertWeek();
            setWeekData(arr);
        }
    },[data])
    return(
        <View style={styles.screen}>
            <View style={styles.firstContainer}>
                <View style={styles.totalpersentCon}>
                
                </View>
            </View>
            <View style={styles.secondContainer}>
                <ScrollView
                    horizontal= {true}
                    decelerationRate={0}
                    snapToInterval={width}
                    snapToAlignment={"center"}
                    contentInset={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}>
                    <View style={styles.goalContainer}>

                    </View>
                    <View style={styles.goalContainer}>

                    </View>
                    <View style={styles.goalContainer}>

                    </View>
                </ScrollView>
            </View>
            {weekData&&
            <View style={styles.thirdContainer}>
                <LineChart
                    data={{
                    labels: weekData[0],
                    datasets: [
                        {
                        data: weekData[1]
                        }
                    ],
                    legend:['  kcal']
                    }}
                    width={width*0.88} // from react-native
                    height={height*0.26}
                    withInnerLines={false}
                    chartConfig={{
                    backgroundColor: viewcolor,
                    backgroundGradientFrom: viewcolor,
                    backgroundGradientTo: viewcolor,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 0.2) => `rgba(0, 0, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#d7e5fc"
                    }
                    }}
                    bezier
                    style={{
                        borderRadius: 16,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 5,
                          height: 5,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 10,
                    }}
                />
            </View> }
        </View>
        
    )
}

export default HomeScreen;

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    firstContainer:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:'25%',
        backgroundColor:'#fff',
    },
    totalpersentCon:{
        alignItems:'center',
        justifyContent:'center',
        width:'88%',
        height: '80%',
        backgroundColor:'#fff',
        borderRadius:16,
        shadowColor: "#000",
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    secondContainer: {
        flex:1,
        width:'100%',
        height:'35%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    goalContainer: {
        marginTop: 10,
        backgroundColor: viewcolor,
        width: width*0.88,
        marginLeft:width*0.06,
        marginRight:width*0.06,
        height: height*0.25,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        //paddingHorizontal : 30
      },
      graphview:{
        width:width-20, // from react-native
        height:220,
    },
    thirdContainer:{
        width:'100%',
        height:'40%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
})
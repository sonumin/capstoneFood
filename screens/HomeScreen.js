import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View,Text, StyleSheet, Button, Dimensions, ScrollView } from 'react-native';
import {LineChart,ProgressChart} from "react-native-chart-kit";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get('window');
const viewcolor = '#ffffff'
const ringColor = (opacity = 0.9) => `rgba(0, 0, 255, ${opacity})`
const progressColor = `rgba(0, 0, 255, 0.66)`

const HomeScreen = () =>{
    const weekArray = [[],[],[],[],[]]
    const persentArray = []

    const [weekData, setWeekData] = useState();
    const [persentData, setPersentData] = useState();

    const {isSuccess, data} = useQuery(['weekData'],  () => {
        return fetch('http://123.199.90.18:5001/loadWeekData').then((res)=> res.json())
    });
    const userData = useQuery(['userData'], () => {
        return fetch('http://123.199.90.18:5001/loadUserData').then((res)=> res.json())
    });
    const convertWeek = () =>{
        if(isSuccess){
            for(let i = 0; i < 7; i++){
                weekArray[0][i] = data[i]['date'].substring(5,)
                weekArray[1][i] = data[i]['kacl']
                weekArray[2][i] = data[i]['carbo']
                weekArray[3][i] = data[i]['province']
                weekArray[4][i] = data[i]['protein']
            }
        }
    }
    const convertPersent = () =>{
        if(userData && weekData){
            persentArray[0] = weekData[1][0] / userData.data['kcal']
            persentArray[1] = weekData[2][0] / userData.data['carbo']
            persentArray[2] = weekData[3][0] / userData.data['province']
            persentArray[3] = weekData[4][0] / userData.data['protein']
        }
        setPersentData(persentArray);
    }
    useEffect(()=>{
        if(data){
            convertWeek();
            setWeekData(weekArray);
        }
    },[data])
    useEffect(()=>{
        if(userData && weekData && !persentData){
            convertPersent();
        }
    },[userData])
    // useEffect(()=>{
    //     if(!persentData){
    //     }
    // },[persentArray])

    return(
        <View style={styles.screen}>
            {persentData&&weekData&&
            <View style={styles.firstContainer}>
                <View style={styles.totalPersentContainer}>
                    <View style={styles.totalPersentText1}>
                        <Text style={{fontSize:25}}>오늘의 칼로리</Text>
                    </View>
                    <View style={styles.totalPersentProgress}>
                        <Progress.Bar
                            progress={persentData[0]>0?persentData[0]:0}
                            width={width*0.88*0.75}
                            height={height*0.015}
                            color={progressColor}/>
                        <Text style={{fontSize:15,textAlign:'center',marginLeft:'4%'}}>{persentData[0]>0?(persentData[0]*100).toFixed():0}%</Text>
                    </View>
                    {weekArray&&
                    <View style={styles.totalPersentText2}>
                        <Text style={{fontSize:20}}>{persentData[0]<1?weekData[1][0]+' /kcal':'완료'}</Text>
                    </View> }     
                </View>
            </View>}
            {persentData&&
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
                        <View style={styles.goalTextContainer}>
                            <Text style={{fontSize:25}}>   Today Eat Carbo</Text>  
                        </View>   
                        <View style={styles.goalProgressContainer}>
                            <ProgressChart
                                data={[persentData[1]<1?persentData[1]:1]}
                                width={width*0.6}
                                height={height*0.2}
                                strokeWidth={16}
                                radius={height*0.07}
                                chartConfig={{
                                    backgroundColor: viewcolor,
                                    borderRadius:'20',
                                    backgroundGradientFrom: viewcolor,
                                    backgroundGradientTo: viewcolor,
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: ringColor,
                                    labelColor: ringColor,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                hideLegend={false}
                                style={{borderRadius:16}}
                            />
                            <Text style={{textAlign:'right',marginTop:'38%',fontSize:20}}>{persentData[1]<1?weekData[2][0]+' g':'     완료!'}</Text>
                        </View>                   
                    </View>
                    <View style={styles.goalContainer}>
                        <View style={styles.goalTextContainer}>
                            <Text style={{fontSize:25}}>   Today Eat Province</Text>  
                        </View>   
                        <View style={styles.goalProgressContainer}>
                            <ProgressChart
                                data={[persentData[2]<1?persentData[2]:1]}
                                width={width*0.6}
                                height={height*0.2}
                                strokeWidth={16}
                                radius={height*0.07}
                                chartConfig={{
                                    backgroundColor: viewcolor,
                                    borderRadius:'20',
                                    backgroundGradientFrom: viewcolor,
                                    backgroundGradientTo: viewcolor,
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: ringColor,
                                    labelColor: ringColor,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                hideLegend={false}
                                style={{borderRadius:16}}
                            />
                            <Text style={{textAlign:'right',marginTop:'38%',fontSize:20}}>{persentData[2]<1?weekData[3][0]+' g':'     완료!'}</Text>
                        </View>   
                        </View>
                    <View style={styles.goalContainer}>
                        <View style={styles.goalTextContainer}>
                            <Text style={{fontSize:25}}>   Today Eat Protein</Text>  
                        </View>   
                        <View style={styles.goalProgressContainer}>
                            <ProgressChart
                                data={[persentData[3]<1?persentData[3]:1]}
                                width={width*0.6}
                                height={height*0.2}
                                strokeWidth={16}
                                radius={height*0.07}
                                chartConfig={{
                                    backgroundColor: viewcolor,
                                    borderRadius:'20',
                                    backgroundGradientFrom: viewcolor,
                                    backgroundGradientTo: viewcolor,
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: ringColor,
                                    labelColor: ringColor,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                hideLegend={false}
                                style={{borderRadius:16}}
                            />
                            <Text style={{textAlign:'right',marginTop:'38%',fontSize:20}}>{persentData[3]<1?weekData[4][0]+' g':'     완료!'}</Text>
                        </View>   
                    </View>
                </ScrollView>
            </View>}
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
    totalPersentContainer:{
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
    totalPersentText1:{
        justifyContent:'center',
        width:'88%',
        height: '30%',
    },
    totalPersentText2:{
        justifyContent:'center',
        alignItems:'flex-end',
        width:'88%',
        height: '30%',
    },
    totalPersentProgress:{
        justifyContent:'center',
        alignItems:'center',
        width:'88%',
        height: '40%',
        flexDirection:'row',
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
    goalTextContainer: {
        fontSize:25,
        borderRadius: 16,
        justifyContent:'center',
        width:'100%',
        height:'20%',
    },
    goalProgressContainer: {
        width:'100%',
        height:'80%',
        flexDirection:'row',
    },
    thirdContainer:{
        width:'100%',
        height:'40%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
})
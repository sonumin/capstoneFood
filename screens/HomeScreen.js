import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View,Text, StyleSheet, Button } from 'react-native';
import {LineChart,ProgressChart} from "react-native-chart-kit";


const HomeScreen = () =>{
    useEffect(()=>{
        convert();
    },[isSuccess])
    const [weekData, setWeekData] = useState();
    const arr = [[],[],[],[],[]]
    const {isLoading, isSuccess, data} = useQuery(['weekData'],  () => {
        return  fetch('http://192.168.0.166:50011/loadWeekData').then((res)=> res.json())
        
    });
    const convert = async () =>{
        if(isSuccess){
            for(let i = 0; i < 7; i++){
                arr[0][i] = data[i]['date'].substring(5,)
                arr[1][i] = data[i]['kacl']
                arr[2][i] = data[i]['carbo']
                arr[3][i] = data[i]['province']
                arr[4][i] = data[i]['protein']
            }
            setWeekData(arr)
        }
    }
    return(
        <View style={styles.screen}>
            {isSuccess&&<View>
                <Text>Home Screen</Text>
                <Text>{data[1]['date']}</Text>
                <Text>{data[2]['date']}</Text>
                <Text>{data[3]['date']}</Text>
                <Text>{data[4]['date']}</Text>
                <Text>{data[5]['date']}</Text>
                <Text>{data[6]['date']}</Text>
                <Text>{weekData[0]}</Text>
                <Text>{weekData[1]}</Text>
                {/* <View>
                </View> */}
            </View>}
            {/* <View style={styles.graphContainer}>
                <LineChart
                    data={{
                    labels: weekData[0],
                    datasets: [
                    {
                        data: weekData[1]
                    }
                    ]
                    ,
                    legend:['  kcal'],
                    }}
                    width='50%' // from react-native
                    height='50%'
                    withInnerLines={false}
                    
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    paddingTop:30,    
                    backgroundColor: viewcolor,
                    backgroundGradientFrom: viewcolor,
                    backgroundGradientTo: viewcolor,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 0.2) => `rgba(0, 0, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    // style: {
                    //     borderRadius: 16
                    // },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#d7e5fc"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    marginBottom:12,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 5,
                        height: 5,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    }}
                />
            </View>  */}
        </View>
        
    )
}

export default HomeScreen;

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    graphContainer:{
        width:'100%',
        height:'37%',
        justifyContent:'center',
        alignItems:'center',
    },
})
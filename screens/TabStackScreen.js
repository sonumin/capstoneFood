import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View,Text } from 'react-native';
import DetailScreen from './DetailScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import EditUserScreen from './EditUserScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont()

const TabStack = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const SettingStack = createStackNavigator();
const HomeName="메인화면"
const DetailName="사진"
const SettingName="내정보"


const HomeStackScreen=()=>{
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name='Home' component={HomeScreen} options={{headerShown:true}}/>
        </HomeStack.Navigator>
    )
}

const DetailStackScreen=()=>{
    return(
        <DetailStack.Navigator>
            <DetailStack.Screen name='Detail' component={DetailScreen} options={{headerShown:true}}/>
        </DetailStack.Navigator>
    )
}
const SettingStackScreen=()=>{
    return(
        <SettingStack.Navigator>
            <SettingStack.Screen name='Setting' component={SettingScreen} options={{headerShown:true}}/>
            <SettingStack.Screen name='Send' component={EditUserScreen} options={{headerShown:true}}/>
        </SettingStack.Navigator>
    )
}

const TabStackScreen = () =>{
    return(
        <TabStack.Navigator
            inintailRouteName={HomeName}
            screenOptions={({route})=>({
                tabBarIcon: ({focused,color,size})=>{
                    let iconName;
                    let rn = route.name;

                    if(rn==HomeName){
                        iconName = focused ? 'home' : 'home-outline';
                    }else if(rn ==DetailName){
                        iconName = focused ? 'camera' : 'camera-outline';
                    }else if(rn ==SettingName){
                        iconName = focused ? 'happy' : 'happy-outline';
                    }

        return <Ionicons name ={iconName} size = {size} color= {color}/>
                },
            })}
            tabBarOptions={{
                activeTintColor:'black',
                inactiveTintColor:'grey',
            }}
        >
            <TabStack.Screen name={HomeName} component = {HomeStackScreen} />
            <TabStack.Screen name ={DetailName} component = {DetailStackScreen} />
            <TabStack.Screen name ={SettingName} component = {SettingStackScreen}/> 
        </TabStack.Navigator>
    
    
    
    );
}

export default TabStackScreen;
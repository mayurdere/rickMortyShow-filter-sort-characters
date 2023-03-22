import React,{useRef,useState,useEffect,useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import {navigationRef} from './navigation';
import {Image,Platform,StyleSheet,View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import color from '../assets/color';


const Stack = createStackNavigator();


export default function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            {/*<Stack.Screen name="Notifications" component={NotificationsScreen} />*/}
            <Stack.Screen name="Profile" component={Profile} options={({route}) => ({
                title: route.params.data.name,
                headerStyle: {backgroundColor: color.black,},
                headerTintColor: color.white
            })} />
            {/*<Stack.Screen name="Settings" component={SettingsScreen} />*/}
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#755DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})
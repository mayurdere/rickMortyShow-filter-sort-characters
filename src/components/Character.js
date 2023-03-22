import {Dimensions,Image,StyleSheet,Text,Touchable,TouchableOpacity,View} from 'react-native'
import React from 'react'
import color from '../assets/color'

const Character = ({data,name,image,species,gender,navigation}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.push('Profile',{data})}>
            <View style={styles.list}>
                <Image style={styles.image} source={{uri: image}} resizeMode='contain' />
                <View>
                    <Text style={styles.title}>{`${data?.id}. ${name}`}</Text>
                    <Text style={styles.subtitle}>{species} | {gender}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Character

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.secondary,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 12,
        padding: 20,
        width: Dimensions.get('window').width * 0.9
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: color.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        width: Dimensions.get('window').width * 0.4
    },
    subtitle: {
        color: color.white,
        fontFamily: 'Poppins-Regular',
        fontSize: 14
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 20
    }
})
import {StyleSheet,Text,TouchableOpacity,View} from 'react-native'
import React from 'react'
import color from '../assets/color'
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = ({title,closeTab,filterType}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => closeTab(title)}>
            <Text style={styles.title}>{title}</Text>
            <Icon style={styles.closeIcon} name="close" size={20} color={color.white} />
        </TouchableOpacity>
    )
}

export default Tab

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.secondary,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: color.white,
        marginRight: 10,
        marginBottom: 10
    },
    title: {
        color: color.white,
    },
    closeIcon: {
        marginLeft: 10
    }
})
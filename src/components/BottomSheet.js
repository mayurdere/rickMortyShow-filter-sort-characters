import {Dimensions,StyleSheet,Text,TouchableOpacity,View} from 'react-native'
import React,{useState} from 'react'
import {BottomSheet} from "react-native-btr";
import color from '../assets/color';

const BottomSheetComponent = ({visible,toggle,sortByAsc,genderFilter,speciesFilter}) => {
    const [genderView,setGenderView] = useState(false)
    const [speciesView,setSpeciesView] = useState(false)
    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={toggle}
            onBackdropPress={toggle}
        >
            <View style={styles.card}>
                <TouchableOpacity style={styles.listView} onPress={() => sortByAsc('asc')}>
                    <Text style={styles.title}>Sort by Ascending order </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listView} onPress={() => sortByAsc('des')}>
                    <Text style={styles.title}>Sort by Descending order </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listView} onPress={() => setGenderView(!genderView)}>
                    <Text style={styles.title}>Select Gender</Text>
                    {
                        genderView && (
                            <View style={styles.listRow}>
                                <TouchableOpacity style={styles.chips} onPress={() => {genderFilter('Male'); setGenderView(false)}}><Text style={styles.chipsText}>Male</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.chips} onPress={() => {genderFilter('Female'); setGenderView(false)}}><Text style={styles.chipsText}>Female</Text></TouchableOpacity>
                            </View>
                        )
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.listView} onPress={() => setSpeciesView(!speciesView)}>
                    <Text style={styles.title}>Select Species</Text>
                    {
                        speciesView && (
                            <View style={styles.listRow}>
                                <TouchableOpacity style={styles.chips} onPress={() => {speciesFilter('Human'); setSpeciesView(false)}}><Text style={styles.chipsText}>Human</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.chips} onPress={() => {speciesFilter('Alien'); setSpeciesView(false)}}><Text style={styles.chipsText}>Alien</Text></TouchableOpacity>
                            </View>
                        )
                    }
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
}

export default BottomSheetComponent

const styles = StyleSheet.create({
    card: {
        backgroundColor: color.black,
        paddingHorizontal: 20,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        //justifyContent: "center",
        //alignItems: "center
    },
    listRow: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    listView: {
        //backgroundColor: color.secondary,
        //width: Dimensions.get('window').width,
        paddingVertical: 25,
        //marginVertical: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
    },
    chips: {
        backgroundColor: color.secondary,
        padding: 15,
        marginRight: 10,
        width: Dimensions.get('window').width * 0.3,
        borderWidth: 1,
        borderColor: color.white,
        borderRadius: 12,
        marginTop: 15,
        alignSelf: 'flex-start',
    },
    chipsText: {
        color: color.white,
        textAlign: 'center'
    },
    title: {
        color: color.white,
        //textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16
    }
})
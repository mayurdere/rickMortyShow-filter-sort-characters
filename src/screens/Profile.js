import {Dimensions,Image,StyleSheet,Text,View} from 'react-native'
import React from 'react'
import color from '../assets/color'

const Profile = (props) => {
  const data = props.route.params.data
  let date = props.route.params.data.created.substring(0,10)
  let time = props.route.params.data.created.substring(0,20)
  return (
    <View style={{flex: 1}}>
      {console.log(data)}
      <Image source={{uri: data.image}} style={styles.image} />
      <View style={styles.halfContainer}>
        <View style={styles.row}>
          <Text style={styles.title}>Gender</Text>
          <Text style={styles.subtitle}>{data.gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Species</Text>
          <Text style={styles.subtitle}>{data.species}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Location</Text>
          <Text style={styles.subtitle}>{data.location.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Origin</Text>
          <Text style={styles.subtitle}>{data.origin.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Created At</Text>
          <Text style={styles.subtitle}>{date}</Text>
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  title: {
    color: color.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold'
  },
  subtitle: {
    color: color.white,
    fontSize: 16,
    fontFamily: 'Poppins-Reguar'
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5
  },
  halfContainer: {
    backgroundColor: color.black,
    flex: 1,
    paddingTop: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
})
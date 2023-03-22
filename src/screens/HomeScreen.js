import {Dimensions,FlatList,StyleSheet,Text,TextInput,Touchable,TouchableOpacity,View} from 'react-native'
import React,{useCallback,useEffect,useMemo,useRef,useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {useQuery,gql} from '@apollo/client';
import Character from '../components/Character';
import color from '../assets/color';
import BottomSheetComponent from '../components/BottomSheet';
import Tab from '../components/Tab';


const CHARACTERS_QUERY = gql`
query Query {
    characters(page:1)  {
      info {
        count
      }
      results {
        id
        name
        gender
        species
        image
        created
        origin {
          name
        }
        location {
          name
        }
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }`

const HomeScreen = (props) => {
    const [characterList,setCharacterList] = useState(null)
    const [value,setValue] = useState('')
    const [visible,setVisible] = useState(false);
    const [initalIndex,setInitalIndex] = useState(0)
    const [gender,setGender] = useState(null)
    const [species,setSpecies] = useState(null)
    const [isRefreshing,setIsRefreshing] = useState(false)



    const {loading,error,data} = useQuery(CHARACTERS_QUERY)

    const listRef = useRef()

    const onSearch = (text) => {
        if(text == "") {
            setCharacterList(data?.characters?.results)
        } else {
            let tempList;
            let arrToBeSearched = data?.characters?.results
            if(gender) {
                arrToBeSearched = arrToBeSearched.filter(item => {
                    return item.gender == gender
                })
            } else if(species) {
                arrToBeSearched = arrToBeSearched.filter(item => {
                    return item.species == species
                })
            }
            tempList = arrToBeSearched?.filter(item => {
                const filterData = item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
                if(filterData) {
                    return item
                }
            })
            if(tempList.length > 0) {
                setCharacterList(tempList)
            } else {
                setCharacterList(null)
            }
        }

        //setCharacterList(tempList)
    }

    const sortByAsc = (type) => {
        let sortedData;
        if(type == 'asc') {
            sortedData = data?.characters?.results?.slice().sort((a,b) => a.id - b.id)
        } else if(type == 'des') {
            sortedData = data?.characters?.results?.slice().sort((a,b) => b.id - a.id)
        }
        setSpecies(null)
        setGender(null)
        listRef.current.scrollToIndex({animated: true,index: 0})
        setCharacterList(sortedData)
        toggle()
    }

    const closeTab = (title) => {

        if(gender === title) {
            console.log('closeTab',gender,title);
            setGender(null)
            onSearch('')
        } else if(species === title) {
            console.log('closeTab',species,title);
            setSpecies(null)
            onSearch('')
        }
    }

    useEffect(() => {
        if(gender === null && species === null) {
            onRefresh()
        }
    },[gender,species])

    const genderFilter = (value) => {
        setGender(value)
        setSpecies(null)
        let arr
        if(species) {
            arr = characterList?.filter(item => {
                return item.gender == value
            })
        } else {
            arr = data?.characters?.results?.filter(item => {
                return item.gender == value
            })
        }
        setCharacterList(arr)
        toggle()
    }

    const speciesFilter = (value) => {
        setSpecies(value)
        setGender(null)
        if(gender) {
            arr = characterList?.filter(item => {
                return item.species == value
            })
        } else {
            arr = data?.characters?.results?.filter(item => {
                return item.species == value
            })
        }
        setCharacterList(arr)
        toggle()
    }

    const commonFilter = (value,type) => {
        let arr = data?.characters?.results
        console.log(arr,'arr');
        console.log(type,value,'commonfilter');
        if(arr) {

            if(type == 'gender') {
                console.log('here')
                setGender(value)
                arr = arr.filter(item => {
                    return item.gender == value
                })
            } else if(type === 'species') {
                setSpecies(value)
            }
            setCharacterList(arr)
            toggle()
        }
    }



    const toggle = () => {
        setVisible((visible) => !visible);
    }

    const onRefresh = () => {
        setCharacterList(data?.characters?.results)
        setIsRefreshing(false)
        setSpecies(null)
        setGender(null)
    }

    useEffect(() => {
        if(!loading) {
            setCharacterList(data?.characters?.results)
        }
    },[loading])
    return (
        <View style={styles.container}>
            <View style={styles.searchSection}>
                <Icon style={styles.searchIcon} name="search" size={20} color={color.white} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={value}
                    placeholderTextColor={color.white}
                    onChangeText={(text) => {
                        setValue(text);
                        onSearch(text)
                    }}
                    underlineColorAndroid="transparent"
                />
                {value?.length > 0 &&
                    <Icon style={styles.searchIcon} name="close" size={20} onPress={() => {onSearch(''); setValue('')}} color={color.white} />
                }
                <TouchableOpacity style={styles.filterIcon} onPress={toggle}>
                    <Icon name="filter" size={20} color={color.white} />
                </TouchableOpacity>
                {/*{console.log(characterList)}*/}
            </View>

            <View style={{paddingHorizontal: 20,alignSelf: 'flex-start',flexDirection: 'row'}}>
                {
                    gender && <Tab title={gender} closeTab={closeTab} />
                }
                {
                    species && <Tab title={species} closeTab={closeTab} />
                }
            </View>


            <View>
                <FlatList
                    ref={listRef}
                    data={characterList}
                    renderItem={({item}) => <Character data={item} name={item.name} image={item.image} species={item.species} gender={item.gender} navigation={props.navigation} />}
                    keyExtractor={item => item.id}
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    initialScrollIndex={initalIndex}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                />
            </View>

            <BottomSheetComponent visible={visible} toggle={toggle} sortByAsc={sortByAsc} genderFilter={genderFilter} speciesFilter={speciesFilter} characterList={characterList} />

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.black
    },
    searchSection: {
        flexDirection: 'row',
        backgroundColor: color.primary,
        margin: 20,
        borderRadius: 12,
        borderWidth: 1,
        width: Dimensions.get('window').width * 0.8,
        borderColor: color.white
    },
    searchIcon: {
        padding: 10,
    },
    filterIcon: {
        position: 'absolute',
        right: -30,
        top: 10,
        zIndex: 1000
    },
    input: {
        //paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: Dimensions.get('window').width * 0.6,
        backgroundColor: color.primary,
        color: color.white,
    },
})
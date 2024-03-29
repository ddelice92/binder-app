import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { StyleSheet } from 'react-native'
import { assets, Colors } from '../constants'
import { Image } from 'react-native'
import { auth, db } from '../Firebase/firebase'
import { getDisplayName } from '../utils'

const UserProfileCircle = (props) => {
    const [studyBuddies, setStudyBuddies] = useState([])
    //console.log("USER UID", props.user.uid)



    const showStory = () => {

    }





    const hasStory = () => {
        return false
    }
    return (

        <TouchableWithoutFeedback onPress={() => { auth.currentUser.uid === props.user?.uid ? props.navigation.openDrawer() : props.navigation.navigate('Profile', { user: props.user, class: null }) }}>
            <View style={{ flexDirection: props.flexDirection ? props.flexDirection : 'row', alignItems: 'center', margin: props.margin }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <View style={{
                        position: 'absolute',
                        width: props.size,
                        height: props.size,
                        backgroundColor: 'lightgray',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {props.showActive &&

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#333333',
                                width: 15,
                                height: 15,
                                borderRadius: 100,
                                zIndex: 1,
                                position: 'absolute',
                                left: props.size - (props.size / 3),
                                top: props.size - (props.size / 3)
                            }}
                            >
                                <View style={{ backgroundColor: '#7FF449', width: 10, height: 10, borderRadius: 100, zIndex: 1 }} />

                            </View>
                        }

                    </View>




                    {props.showStoryBoder && hasStory() && <View style={{ width: props.size + 10, height: props.size + 10, borderWidth: 3, borderColor: Colors.light.primary, borderRadius: 50 }} />}



                    <View style={{ borderRadius: 100, alignItems: 'center', overflow: 'hidden', width: props.size, height: props.size, justifyContent: 'center' }}>
                        {props.user?.photoURL ? <Image source={{ uri: props.user.photoURL }} style={[styles.image, { width: props.size, height: props.size, zIndex: 0 }]} />
                            : <Image source={assets.person} style={[styles.defaultImage, { width: props.size - (props.size / 3), height: props.size - (props.size / 3) }]} />}

                    </View>




                    {studyBuddies.includes(props.user) && <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', padding: 4, backgroundColor: '#333', borderRadius: 50, right: -15, top: 20 }}>
                        <Text style={{ fontSize: (props.size / 3) }}>🤓</Text>

                    </View>}

                </View>
                {props.showName && <Text style={{ fontFamily: 'KanitBold', fontSize: 20, color: 'white', marginLeft: 10 }}>{getDisplayName(props.user?.firstName, props.user?.lastName)}</Text>}


            </View>


        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({



    defaultImage: {
        resizeMode: 'cover',
        tintColor: 'gray',
    },

    image: {
        resizeMode: 'cover',
    },



})
export default UserProfileCircle
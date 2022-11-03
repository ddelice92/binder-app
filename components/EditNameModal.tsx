import { View, Text, TextInput, TouchableOpacity, Animated, Modal, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { auth, db, updateName, updateUserProfile } from '../Firebase/firebase';
import { Colors } from '../constants';

const EditNameModal = (props) => {
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const { width, height } = useWindowDimensions()
    const translateValue = useRef(new Animated.Value(0)).current
    function slideIn() {
        Animated.timing(
            translateValue,
            {

                toValue: -700,
                duration: 300,
                useNativeDriver: true,

            }).start();
    }




    function slideOut() {
        Animated.timing(
            translateValue,
            {

                toValue: 900,
                duration: 500,
                useNativeDriver: true,

            }).start();
    }


    return (
        <Modal
            transparent
            visible={props.showModal}
            onShow={slideIn}
            onDismiss={slideOut}
        >

            <View style={{ backgroundColor: '#00000085', flex: 1, alignItems: 'center' }} >


                <Animated.View style={{ alignSelf: 'center', height: 360, backgroundColor: '#333', width: 300, marginTop: height, borderRadius: 25, padding: 20, transform: [{ translateY: translateValue }], }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, flex: 1 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Kanit' }}>Edit Name</Text>
                        <Text style={{ color: 'gray', fontFamily: "Kanit", textAlign: 'center' }}>This is how you appear on Binder, so pick a name your classmates know you by</Text>


                        <View style={{ margin: 20, width: '100%' }}>

                            <TextInput
                                placeholder='First Name'
                                style={{ color: 'white', padding: 15, fontSize: 18, width: '100%', backgroundColor: '#474747', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomColor: '#6F6F6F', borderBottomWidth: 1 }}
                                onChangeText={setFirstName}
                                value={firstName}
                                placeholderTextColor={'#6F6F6F'}

                            />

                            <TextInput
                                placeholder='Last Name'
                                placeholderTextColor={'#6F6F6F'}
                                style={{ color: 'white', padding: 15, fontSize: 18, paddingHorizontal: 10, width: '100%', backgroundColor: '#474747', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                                onChangeText={setLastName}
                                value={lastName}

                            />
                        </View>



                        <TouchableOpacity
                            onPress={() => {
                                updateUserProfile(firstName + " " + lastName, auth.currentUser.photoURL);
                                updateName(firstName, lastName);
                                props.onSavePress()
                            }}
                            style={{ borderRadius: 50, width: '100%', backgroundColor: Colors.light.accent, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontFamily: "Kanit", fontSize: 20 }}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={props.onCancelPress}>
                            <Text style={{ color: 'white', fontFamily: "Kanit", marginTop: 20 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal >

    )
}

export default EditNameModal
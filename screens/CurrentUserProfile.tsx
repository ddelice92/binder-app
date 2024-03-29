import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import { UserProfileCircle } from '../components'
import { SHADOWS } from '../constants/Theme'
import { DrawerActions } from '@react-navigation/native'
import ProfileTag from '../components/ProfileTag'
import ModalComponent from '../components/Modal'
import moment from 'moment'
import { auth, db, updateCollection, updateUserProfile } from '../Firebase/firebase'
import { getDisplayName, getZodiacSign, openMediaLibrary } from '../utils'
import EditNameModal from '../components/EditNameModal'
import OptionsModal from '../components/OptionsModal'
import Header from '../components/Header'


const CurrentUserProfile = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState(null)
    const [showImageOptionsModal, setShowImageOptionsModal] = useState(false)
    const [showEditNameModal, setShowEditNameModal] = useState(false)
    const [userData, setUserData] = useState(null)

    const user = auth.currentUser


    useEffect(() => {
        const subscriber = db.collection('users').doc(auth.currentUser.uid).onSnapshot(doc => {
            setUserData(doc.data())


        })

        return () => subscriber()
    }, [])







    const birthdayModal = () => (
        <View style={{ alignItems: 'center' }}>
            <View style={styles.emojiContainer}>
                <Text style={{ fontSize: 36 }}>🎂</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: '#DEDEDE' }}>Birthday</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: '#999999' }}>{`Your birthday is on ${moment(userData?.birthday?.toDate()).format("MMM DD, YYYY")}!`}</Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false) }}
                style={{ height: 50, backgroundColor: '#2B2B2B', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.light.primary, fontFamily: 'KanitMedium', fontSize: 20 }}>Close</Text>
            </TouchableOpacity>


        </View>
    );



    const zodiacSignModal = () => (

        <View style={{ alignItems: 'center' }}>
            <View style={styles.emojiContainer}>
                <Text style={{ fontSize: 36 }}>{getZodiacSign(userData?.birthday.toDate().getDate(), userData?.birthday.toDate().getMonth(), true)}</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: '#DEDEDE' }}>Astrology</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: '#999999' }}>
                    {`You are a ${getZodiacSign(userData?.birthday.toDate().getDate(), userData?.birthday.toDate().getMonth())}!`}
                </Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false) }}
                style={{ height: 50, backgroundColor: '#2B2B2B', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.light.primary, fontFamily: 'KanitMedium', fontSize: 20 }}>Close</Text>
            </TouchableOpacity>


        </View>


    );


    const classModal = () => (
        <View style={{ alignItems: 'center' }}>
            <View style={styles.emojiContainer}>

                <Text style={{ fontSize: 36 }}>🎓</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: '#DEDEDE' }}>Graduating Class</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: '#999999' }}>You graduate in {userData?.gradYear}</Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false) }}
                style={{ height: 50, backgroundColor: '#2B2B2B', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.light.primary, fontFamily: 'KanitMedium', fontSize: 20 }}>Close</Text>
            </TouchableOpacity>
        </View>



    );

    const headerRight = () => (
        <TouchableWithoutFeedback onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <Image
                source={assets.right_arrow}
                style={{ width: 24, height: 24, tintColor: 'white' }}
            />
        </TouchableWithoutFeedback >


    )

    const headerCenter = () => (
        <TouchableOpacity onPress={() => { navigation.navigate('Achievements') }}>
            <Image source={assets.badge} style={{ width: 25, height: 25, tintColor: Colors.dark.tint }} />

        </TouchableOpacity>
    )

    const headerLeft = () => (
        <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
            <Image source={assets.settings} style={{ width: 25, height: 25, tintColor: Colors.dark.tint }} />
        </TouchableOpacity>
    )

    const getBirthday = () => {
        if (userData?.birthday)
            return moment(userData?.birthday).format("MMM DD, YYYY")
        return null
    }
    const onLibraryPress = async () => {
        setShowImageOptionsModal(false);
        const result = await openMediaLibrary('photo', 1);
        if (result) {
            updateUserProfile(auth.currentUser.displayName, result)
            updateCollection('users', auth.currentUser.uid, { photoURL: result });
        }
    }
    return (

        <View style={{ backgroundColor: '#333333', flex: 1 }}>

            <ModalComponent renderContent={modal} showModal={showModal} toValue={-900} animated height={280} width={250} />

            <EditNameModal
                firstName={userData?.firstName}
                lastName={userData?.lastName}
                onCancelPress={() => {
                    setShowEditNameModal(false)
                }}
                showModal={showEditNameModal}
                onSavePress={() => {
                    setShowEditNameModal(false)

                }}
            />


            <OptionsModal
                options={['Take Picture', 'Choose From Library']}
                onOptionPress={[onLibraryPress, onLibraryPress]}
                showModal={showImageOptionsModal}
                onCancelPress={() => { setShowImageOptionsModal(false) }}
            />

            <Header
                navigation={navigation}
                direction={'horizontal'}
                title={'Settings'}
                headerCenter={headerCenter()}
                shadow
                headerRight={headerRight()}
                headerLeft={headerLeft()}
            />

            <View style={{ paddingHorizontal: 20 }}>

                <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>


                    <View style={{ alignItems: 'center', marginTop: 40 }}>


                        <TouchableWithoutFeedback onPress={() => { setShowImageOptionsModal(true) }}>
                            <View>

                                <View style={{ borderRadius: 100, padding: 8, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: -1, right: -5, zIndex: 1 }}>
                                    <Image source={assets.add_image} style={{ width: 20, height: 20, tintColor: Colors.light.primary }} />

                                </View>

                                <UserProfileCircle user={auth.currentUser} showStudyBuddy={false} showStoryBoder size={120} showName={false} bold showActive={false} />

                            </View>

                        </TouchableWithoutFeedback>

                    </View>




                    <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                        {userData?.firstName || userData?.lastName ? <Text
                            onPress={() => { setShowEditNameModal(true) }}
                            style={{ fontSize: 24, fontFamily: 'KanitBold', color: 'white' }}>{getDisplayName(userData?.firstName, userData?.lastName)}</Text>
                            :
                            <Text
                                onPress={() => { setShowEditNameModal(true) }}
                                style={{ color: 'gray', fontFamily: 'Kanit' }}>Display Name</Text>

                        }
                        <TouchableWithoutFeedback
                            onPress={() => { setShowEditNameModal(true) }} >

                            <Image

                                source={assets.pencil} style={{ width: 15, height: 15, tintColor: '#6F6F6F', marginLeft: 10 }}
                            />
                        </TouchableWithoutFeedback>

                    </View>





                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 20, flexDirection: 'row', marginTop: 20 }}>



                        <View style={{ marginLeft: 10 }}>
                            {userData?.gradYear && <ProfileTag icon={<Text>🎓</Text>} title={userData?.gradYear} onPress={() => { setModal(classModal()); setShowModal(true); }} />}

                        </View>
                        <View style={{ marginLeft: 10 }}>
                            {userData?.birthday && <ProfileTag icon={<Text>🎂</Text>} title={getBirthday()} onPress={() => { setModal(birthdayModal()); setShowModal(true); }} />}

                        </View>

                        <View style={{ marginLeft: 10 }}>
                            {userData?.birthday && <ProfileTag icon={<Text>{getZodiacSign(userData?.birthday.toDate().getDate(), userData?.birthday.toDate().getMonth(), true)}</Text>} title={getZodiacSign(userData?.birthday.toDate().getDate(), userData?.birthday.toDate().getMonth())} onPress={() => { setModal(zodiacSignModal()); setShowModal(true); }} />}

                        </View>



                    </ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={[styles.sectionTitle, { color: '#DEDEDE' }]}>Props</Text>


                    </View>
                    <View style={{ alignItems: "center", flexDirection: 'row', padding: 20, width: '100%', backgroundColor: '#5B5B5B', ...SHADOWS.dark, borderRadius: 15, marginTop: 10, shadowColor: '#272727' }}>

                        <Image source={assets.shines} style={{ width: 28, height: 28, tintColor: 'white' }} />
                        <Text style={{ color: 'white', fontFamily: 'Kanit', marginLeft: 10, fontSize: 16 }}>View Your Props</Text>


                        <Image source={assets.right_arrow} style={{ width: 20, height: 20, tintColor: 'gray', right: 10, position: 'absolute' }} />

                    </View>

                    <Text style={[styles.sectionTitle, { color: '#DEDEDE' }]}>Your Posts</Text>
                    <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', width: '100%', backgroundColor: '#5B5B5B', ...SHADOWS.dark, borderRadius: 15, marginTop: 10, shadowColor: '#272727' }}>
                        <Image source={assets.camera_o} style={{ width: 28, height: 28, tintColor: Colors.light.primary }} />
                        <Text style={{ color: 'white', fontFamily: 'Kanit', marginLeft: 10, fontSize: 16 }}>Add a New Post</Text>
                    </View>
                </ScrollView>

            </View>
        </View >



    )
}


const styles = StyleSheet.create({


    emojiContainer: {
        backgroundColor: '#272727',
        borderRadius: 50,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#464646',
        ...SHADOWS.dark
    },

    classHeader: {
        padding: 30,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    sectionTitle: {
        fontFamily: 'KanitMedium',
        fontSize: 18,
        marginTop: 30

    },

    className: {
        fontSize: 20,
        fontFamily: 'KanitBold'


    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '60%'

    },

    number: {
        fontSize: 11,
        color: 'gray',
        marginLeft: 5
    }
})
export default CurrentUserProfile
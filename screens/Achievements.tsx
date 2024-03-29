import { View, Text, SafeAreaView, FlatList, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import AchievementListItem from '../components/AchievementListItem'
import { assets, Colors } from '../constants'
import { SHADOWS, SIZES } from '../constants/Theme'
import Header from '../components/Header'
import { db } from '../Firebase/firebase'
import Achievements from '../constants/data/Achievements'

const AchievementsScreen = ({ navigation }) => {
    const [achievements, setAchievements] = useState([])
    const [showInfoModal, setShowInfoModal] = useState(false)
    const [loading, setLoading] = useState(true)
    //console.log("START: ", achievements[0].levelGoals[0], "- END")


    //returns the progress of a given achievement object 
    const getProgress = (item) => {

        return item.amountDone / item.levelGoals[item.index]
    }



    const getItemLayout = (data, index) => {
        const productHeight = 80;
        return {
            length: productHeight,
            offset: productHeight * index,
            index,
        };
    };


    //we will use this to determine if at least the first level goal (at index 0) is complete
    const isSomeComplete = (item) => {
        return item.amountDone / item.levelGoals[0] >= 1
    }

    useEffect(() => {

        // Achievements.forEach(element => db.collection('achievements').doc(element.id)(element))
        const subscriber = db.collection('achievements')

            .onSnapshot(querySnapshot => {
                const array = []

                querySnapshot.forEach(documentSnapshot => {

                    array.push(
                        {
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id
                        })//end push

                })//end forEach

                setAchievements(array)
                setLoading(false)
            })

        return () => subscriber()

    }, [])


    const headerCenter = () => (
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Image source={assets.badge} style={{ width: 28, height: 28, tintColor: 'white' }} />
            <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 20, marginLeft: 10 }}>{'Achievements'}</Text>
        </View>

    )

    const headerRight = () => (
        <TouchableWithoutFeedback onPress={() => setShowInfoModal}>
            <Image source={assets.info} style={{ width: 15, height: 15, tintColor: 'white' }} />

        </TouchableWithoutFeedback>

    )

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={assets.loading} style={{ width: 30, height: 30, tintColor: 'gray' }} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                navigation={navigation}
                direction={'vertical'}
                title={'Settings'}
                shadow
                headerCenter={headerCenter()}
                headerRight={headerRight()}

            />


            <ScrollView style={{ padding: 10 }}>
                <Text style={{ fontFamily: 'Kanit', color: 'gray', textAlign: 'center', margin: 10 }}>
                    {'Achievements are a fun way to help you gain mastery in all the features Binder has to offer. They also give you and your other classmates valuable insight on each others academic qualities.'}
                </Text>
                <Text
                    onPress={() => { }}
                    style={{ fontFamily: 'KanitMedium', color: Colors.light.primary, textAlign: 'center' }}>{'Learn More'}</Text>


                {/* Data is sorted by current index(or level number) increasing from top to bottom */}

                {/* Completed */}



                {achievements.filter((item) => isSomeComplete(item)).length > 0 &&
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ alignSelf: 'flex-start', color: 'white', fontFamily: 'Kanit', fontSize: 17 }}>Completed</Text>

                        <FlatList
                            data={achievements.filter((item) => isSomeComplete(item))}
                            scrollEnabled={false}
                            renderItem={({ item }) => <AchievementListItem item={item} />}
                            keyExtractor={(item) => item.key}
                            showsHorizontalScrollIndicator={false}
                            getItemLayout={getItemLayout}
                            numColumns={3}

                        />
                    </View>}

                {/* In Progress */}
                {achievements.filter((item) => getProgress(item) < 1 && getProgress(item) > 0).length > 0 &&

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ alignSelf: 'flex-start', color: 'white', fontFamily: 'Kanit', fontSize: 17 }}>In Progress</Text>

                        <FlatList
                            data={achievements.filter((item) =>
                                getProgress(item) < 1 && getProgress(item) > 0).sort((a, b) => a.index < b.index ? 1 : -1)}
                            scrollEnabled={false}
                            renderItem={({ item }) => <AchievementListItem item={item} circle={false} />}
                            keyExtractor={(item) => item.key}
                            showsHorizontalScrollIndicator={false}

                        />
                    </View>}

                {/* Not Started */}
                {achievements.filter((item) => getProgress(item) == 0).length > 0 &&
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ alignSelf: 'flex-start', color: 'white', fontFamily: 'Kanit', fontSize: 17 }}>Not Started</Text>

                        <FlatList
                            data={achievements.filter((item) =>
                                getProgress(item) == 0).sort((a, b) => a.index < b.index ? 1 : -1)}
                            scrollEnabled={false}
                            renderItem={({ item }) => <AchievementListItem item={item} />}
                            keyExtractor={(item) => item.key}
                            showsHorizontalScrollIndicator={false}

                        />
                    </View>}
            </ScrollView>

        </View >
    )
}

export default AchievementsScreen
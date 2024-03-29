import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { assets } from '../constants/index.ts'
import useColorScheme from '../hooks/useColorScheme'
import { Colors } from '../constants'

const CallButton = () => {
    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#333' }}>
            <TouchableOpacity style={{ backgroundColor: '#272727', width: 40, height: 40, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={assets.phone} style={{ width: 20, height: 20, tintColor: 'white' }} />

            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: '#272727', width: 40, height: 40, borderTopRightRadius: 20, borderBottomRightRadius: 20, marginLeft: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={assets.video_call} style={{ width: 25, height: 25, tintColor: 'white' }} />
            </TouchableOpacity>
        </View>

    )
}

export default CallButton
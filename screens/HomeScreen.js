import React from "react";
import { View, Text, Button } from 'react-native'

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Home</Text>
            <Button title="Add new list" onPress={() => navigation.navigate('NewList')}></Button>
        </View>
    )
}

export default HomeScreen
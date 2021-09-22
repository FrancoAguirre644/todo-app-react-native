import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native'
import { useDispatch } from "react-redux";
import Lists from "../components/Lists";
import CustomButtom from "../components/CustomButtom";
import { Colors } from "../constants";
import { getLists } from "../store/actions/listActions";
import globalStyles from '../styles/global'

const HomeScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLists(() => setLoading(false)))
    }, [dispatch])

    if (loading) {
        return <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} />
    }

    return (
        <View style={styles.container}>
            <Lists navigation={navigation} />
            <CustomButtom text="Add new List" icon="add" iconColor="#fff"
                onPress={() => navigation.navigate('NewList')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default HomeScreen
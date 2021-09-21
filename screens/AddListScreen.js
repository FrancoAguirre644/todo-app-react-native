import React, { useState } from "react";
import { View, Keyboard, StyleSheet, TouchableWithoutFeedback, TextInput, Alert, ToastAndroid } from 'react-native'
import { Colors } from "../constants";
import globalStyles from '../styles/global'
import CustomButtom from '../components/CustomButtom'
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../stores/actions/listActions";

const AddListScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const { lists } = useSelector(state => state.list)

    const submitHandler = () => {
        if (name.trim() === '') return Alert.alert('Validation', 'Name is required.')

        const alreadyExist = lists.find(l => l.name.toLowerCase() === name.trim().toLocaleLowerCase())
        if (alreadyExist) return Alert.alert('Validation', 'List with this name already exist.')

        dispatch(createList(
            name,
            () => {
                ToastAndroid.show(`List ${name} created.`, ToastAndroid.LONG)
                Keyboard.dismiss()
                navigation.navigate('Home')
            },
            () => { ToastAndroid.show(`Something went wrong, please try again.`, ToastAndroid.LONG) }

        ))

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <TextInput style={globalStyles.input} value={name}
                    onChangeText={(val) => setName(val)} placeholder="List name"
                    placeholderTextColor={Colors.tertiary}
                />
                <CustomButtom text="Submit" onPress={submitHandler} round />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        backgroundColor: '#fff',
    }
})

export default AddListScreen
import React, { useState } from "react";
import { View, Keyboard, StyleSheet, TouchableWithoutFeedback, TextInput, Alert, ToastAndroid } from 'react-native'
import { Colors } from "../constants";
import globalStyles from '../styles/global'
import CustomButtom from '../components/CustomButtom'
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../store/actions/taskActions";

const AddTaskScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const { tasks } = useSelector(state => state.task)
    const { activeListId } = useSelector(state => state.list)

    const submitHandler = () => {
        if (name.trim() === '') return Alert.alert('Validation', 'Name is required.')

        const alreadyExist = tasks.find(t => t.name.toLowerCase() === name.trim().toLocaleLowerCase() && t.listId === activeListId)
        if (alreadyExist) return Alert.alert('Validation', 'Task with this name already exist in this list.')
        
        dispatch(createTask(
            name,
            activeListId,
            () => {
                ToastAndroid.show(`Task ${name} created.`, ToastAndroid.LONG)
                Keyboard.dismiss()
                navigation.goBack()
            },
            () => { ToastAndroid.show(`Something went wrong, please try again.`, ToastAndroid.LONG) }

        ))

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <TextInput style={globalStyles.input} value={name}
                    onChangeText={(val) => setName(val)} placeholder="Task name"
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

export default AddTaskScreen
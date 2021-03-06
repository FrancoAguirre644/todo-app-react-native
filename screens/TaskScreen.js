import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View, Switch, TouchableWithoutFeedback, ActivityIndicator, Alert, ToastAndroid } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Colors } from "../constants";
import CustomButtom from "../components/CustomButtom";
import globalStyles from "../styles/global";
import { deleteTask, updateTask } from "../store/actions/taskActions";


const TaskScreen = ({ route, navigation }) => {
    const [name, setName] = useState('')
    const [completed, setCompleted] = useState(false)
    const [task, setTask] = useState({})
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { tasks } = useSelector(state => state.task)

    useEffect(() => {
        const taskFound = tasks.find(t => t.id === route.params.id)
        if (taskFound) {
            setName(taskFound.name)
            setCompleted(taskFound.completed)
            setTask(taskFound)
            setLoading(false)
        }
    }, [tasks, route.params.id])

    const updateTaskHandler = () => {
        if (task.name === name && task.complete === completed) {
            return Alert.alert('Nothing changed', 'Cannot update because nothing was changed.')
        }

        const updatedTask = {
            ...task,
            name,
            completed
        }

        dispatch(updateTask(
            updatedTask,
            () => {
                navigation.goBack()
                ToastAndroid.show('Task updated.', ToastAndroid.LONG)
            },
            () => {
                ToastAndroid.show('Something went wrong. Please try again.', ToastAndroid.LONG)
            }
        ))

    }

    const deleteTaskClickHandler = () => {
        Alert.alert(
            'Delete task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel' },
                { text: 'Delete', onPress: () => deleteTaskHandler() }
            ]
        )
    }

    const deleteTaskHandler = () => {
        dispatch(deleteTask(
            task.id,
            () => {
                navigation.goBack()
                ToastAndroid.show(`Task "${task.name}" updated.`, ToastAndroid.LONG)
            },
            () => {
                ToastAndroid.show('Something went wrong. Please try again.', ToastAndroid.LONG)
            }
        ))
    }

    if (loading) {
        return <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} />
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <TextInput value={name} onChangeText={(val) => setName(val)}
                    placeholder="Task name" placeholderTextColor={Colors.quaternary}
                    style={globalStyles.input}
                />
                <View style={globalStyles.swithContainer}>
                    <Switch
                        value={completed}
                        onValueChange={(val) => setCompleted(val)}
                        thumbColor={completed ? Colors.primary : Colors.secondary}
                        trackColor={{ false: Colors.tertiary, true: Colors.quaternary }}
                    />
                    <Text style={globalStyles.switchText}>Complete task</Text>
                </View>
                <CustomButtom text="Update task" onPress={updateTaskHandler} round style={styles.spaceBottom} />
                <CustomButtom text="Delete task" onPress={() => deleteTaskClickHandler()} round danger />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    spaceBottom: {
        marginBottom: 30
    }
})

export default TaskScreen
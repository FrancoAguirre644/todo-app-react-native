import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../screens/HomeScreen'
import AddTaskScreen from '../screens/AddTaskScreen'
import AddListScreen from '../screens/AddListScreen'
import { Colors } from '../constants'
import ListScreen from '../screens/ListScreen'
import { useDispatch } from 'react-redux'
import { deleteList } from '../store/actions/listActions'
import TaskScreen from '../screens/TaskScreen'

const TasksStackNavigator = createStackNavigator();

const defaultStyles = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColor: '#fff'
}

const styles = StyleSheet.create({
    headerRightSpace: {
        marginRight: 10,
    }
})

const TasksNavigator = () => {

    const dispatch = useDispatch()

    const deleteListClickHandler = (id, navigation) => {
        Alert.alert(
            'Delete list',
            'Are you sure you want delete this list?',
            [
                { text: 'Cancel' },
                { text: 'Delete', onPress: () => deleteListHandler(id, navigation) },
            ]
        )
    }

    const deleteListHandler = (id, navigation) => {
        dispatch(deleteList(id, () => {
            navigation.goBack(),
                ToastAndroid.show('List successfully deleted.', ToastAndroid.LONG)
        }))
    }

    return (
        <TasksStackNavigator.Navigator>
            <TasksStackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    ...defaultStyles,
                    title: 'Your lists',
                    headerTitleAlign: 'center'
                }}
            />
            <TasksStackNavigator.Screen
                name="NewList"
                component={AddListScreen}
                options={{
                    ...defaultStyles,
                    title: 'Add new list'
                }}
            />
            <TasksStackNavigator.Screen
                name="List"
                component={ListScreen}
                options={({ route, navigation }) => ({
                    ...defaultStyles,
                    title: route.params.name,
                    headerRight: () => (
                        <View style={styles.headerRightSpace}>
                            <Icon
                                name="md-trash"
                                color="#fff"
                                size={30}
                                onPress={() => deleteListClickHandler(route.params.id, navigation)}
                            />
                        </View>
                    )
                })}
            />
            <TasksStackNavigator.Screen
                name="NewTask"
                component={AddTaskScreen}
                options={{
                    ...defaultStyles,
                    title: 'Add new task'
                }}
            />
            <TasksStackNavigator.Screen
                name="Task"
                component={TaskScreen}
                options={{
                    ...defaultStyles,
                    title: 'Update task'
                }}
            />
        </TasksStackNavigator.Navigator>
    )
}

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <TasksNavigator />
        </NavigationContainer>
    )
}

export default AppNavigator

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SET_TASKS } from '../types'
import { STORAGE_KEYS } from '../../constants'
import store from '../'

// Get Tasks
export const getTasks = (onSuccess = () => { }, onError = () => { }) => {
    return async dispatch => {
        try {
            const tasksRes = await AsyncStorage.getItem(STORAGE_KEYS.tasks)
            const tasks = tasksRes ? JSON.parse(tasksRes) : []

            dispatch({
                type: SET_TASKS,
                payload: tasks
            })

            onSuccess()
        } catch (err) {
            console.log(err)
            onError()
        }
    }
}

// Create task
export const createTask = (name, onSuccess = () => { }, onError = () => { }) => {
    return async dispatch => {
        try {
            const newTask = {
                name,
                listId,
                id: `task-${new Date().getTime()}`,
                completed: false,
            }

            const { tasks } = store.getState.task

            const tasksCopy = [...tasks]
            tasksCopy.push(newTask)
            await AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasksCopy))

            dispatch({
                type: SET_TASKS,
                payload: tasksCopy
            })

            onSuccess()
        } catch (err) {
            console.log(err)
            onError()
        }
    }
}


import AsyncStorage from "@react-native-async-storage/async-storage";
import { SET_LISTS, SET_ACTIVE_LIST_ID } from '../types'
import { STORAGE_KEYS } from '../../constants/index'
import store from '../';

// Get Lists Action
export const getLists = (onSuccess = () => { }, onError = () => { }) => {
    return async dispatch => {
        try {
            const listsRes = await AsyncStorage.getItem(STORAGE_KEYS.lists)
            const lists = listsRes ? JSON.parse(listsRes) : [{ id: '1', name: 'List 1' }]

            dispatch({
                type: SET_LISTS,
                payload: lists,
            })

            onSuccess()
        } catch (err) {
            console.log(er)
            onError()
        }
    }
}

// Create List Action
export const createList = (name, onSuccess = () => { }, onError = () => { }) => {
    return async dispatch => {
        try {
            const newList = {
                name,
                id: `list-${new Date().getTime()}`,
            }

            const { lists } = store.getState().list

            const listsCopy = [...lists]
            listsCopy.push(newList)
            await AsyncStorage.setItem(STORAGE_KEYS.lists, JSON.stringify(listsCopy))

            dispatch({
                type: SET_LISTS,
                payload: listsCopy,
            })

            onSuccess()
        } catch (err) {
            console.log(err)
            onError()
        }
    }
}

// Delete List
export const deleteList = (id, onSuccess = () => { }, onError = () => { }) => {
    return async dispatch => {
        try {
            const { lists } = store.getState().list

            const listCopy = [...lists]
            const filteredLists = listCopy.filter(l => l.id !== id)
            await AsyncStorage.setItem(STORAGE_KEYS.lists, JSON.stringify(filteredLists))

            dispatch({
                type: SET_LISTS,
                payload: filteredLists,
            })

            onSuccess()
        } catch (err) {
            console.log(err)
            onError()
        }
    }
}

// Set active list id
export const setActiveListId = (id) => {
    return {
        type: SET_ACTIVE_LIST_ID,
        payload: id
    }
}
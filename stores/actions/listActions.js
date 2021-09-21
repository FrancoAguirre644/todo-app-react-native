import AsyncStorage from "@react-native-async-storage/async-storage";
import { SET_LISTS, SET_ACTIVE_LIST_ID } from '../types'
import { STORAGE_KEYS } from '../../constants/index'

// Get Lists Action
export default getLists = (onSuccess = () => { }, onError = () => { }) => {
    return async dispatch => {
        try {
            const listsRes = await AsyncStorage.getItem(STORAGE_KEYS.lists)
            const lists = listsRes ? JSON.parse(listsRes) : []

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
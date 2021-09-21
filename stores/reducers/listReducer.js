import { SET_LISTS, SET_ACTIVE_LIST_ID } from '../types'

const initialState = {
    lists: [],
    activeListId: '',
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state,
                lists: action.payload
            }
            break;
        default:
            break;
    }
}

export default listReducer
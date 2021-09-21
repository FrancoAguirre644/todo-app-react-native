import { SET_TASKS } from '../types'

const initialState = {
    tasks: [],
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
            break;
        default:
            return state
            break;
    }
}

export default taskReducer
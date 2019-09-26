import axios from 'axios'

const initialState = {
    email: null,
    firstName: null,
    lastName: null
}

const REQUEST_USER_DATA = 'REQUEST_USER_DATA'

export const requestUserData = () => {
    let result = axios.get('/auth/user-data').then(res => res.data)
    return {
        type: REQUEST_USER_DATA,
        payload: result
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case REQUEST_USER_DATA + '_FULFILLED':
            return {...state, firstName: action.payload.user.firstName, lastName: action.payload.user.lastName, email: action.payload.user.email}
        default:
            return state
    }
}

export default reducer
import axios from 'axios'

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export const requestBudgetData = () => {
    let result = axios.get('/api/budget-data').then(res => res.data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: result
    }
}

export const addPurchase = (price, description, category) => {
    let result = axios.post('/api/budget-data/purchase', {description: description, price: price, category: category}).then(res => res.data)
    return {
        type: ADD_PURCHASE,
        payload: result
    }
}

export const removePurchase = (id) => {
    let result = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
    return {
        type: REMOVE_PURCHASE,
        payload: result
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case REMOVE_PURCHASE + '_PENDING':
            return {...state, loading: true}
        case REMOVE_PURCHASE + '_FULFILLED':
            return {...state, purchases: action.payload, loading: false}
        case ADD_PURCHASE + '_PENDING':
            return {...state, loading: true}
        case ADD_PURCHASE + '_FULFILLED':
            return {...state, purchases: action.payload, loading: false}
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {...state, loading: true}
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return {...state, ...action.payload, loading: false}
        default:
            return state
    }
}

export default reducer
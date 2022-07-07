import {axiosIntance as axios} from '../../utils/axios';

export const addCollection = (payload) => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_COLLECTIONS_LOADING',
            payload: true
        })

        axios.post('/collection/add', {...payload})
        .then(res => {
            dispatch({
                type: 'SET_COLLECTIONS_DATA',
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            // dispatch({
                // type: 'SET_PRIVACY_VALUE',
                // payload: err.response
            // })
        })
    }
}

export const fetchWalletCollections = (payload) => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_COLLECTIONS_LOADING',
            payload: true
        })
        
        axios.post('/collection/user-collection-list', null,{ params: { id : payload.id }})
        .then(res => {
            dispatch({
                type: 'SET_COLLECTIONS_DATA',
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            // dispatch({
                // type: 'SET_PRIVACY_VALUE',
                // payload: err.response
            // })
        })
    }
}
export const setCollection = (payload) => {
    return async(dispatch) => {
        dispatch({
            type: 'ADD_COLLECTIONS_DATA',
            payload
        })
    }
}

export const getTrendingCollectionList = (payload)=>{
    return async(dispatch) => {
        axios.post('/collection/trending-collections',payload)
        .then(res => {
            dispatch({
                type: 'TRENDING_COLLECTION_LIST',
                payload: res.data?.data?res.data?.data:[]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getCategoriesList = (payload)=>{
    return async(dispatch) => {
        dispatch({
            type: 'SET_COLLECTIONS_LOADING',
            payload: true
        })
        axios.post('/category/active-list',payload)
        .then(res => {
            dispatch({
                type: 'FETCH_CATEGORIES_LIST',
                payload: res.data?.data?res.data?.data:[]
            })
            dispatch({
                type: 'SET_COLLECTIONS_LOADING',
                payload: false
            })
        })
        .catch(err => {
            dispatch({
                type: 'SET_COLLECTIONS_LOADING',
                payload: false
            })
            console.log(err)
        })
    }
}
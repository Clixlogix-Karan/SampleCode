import {axiosIntance as axios} from '../../utils/axios';

export const createNftItem = (payload) => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_NFT_ITEM_LOADING',
            payload: true
        })

        axios.post('/item/add', {...payload})
        .then(res => {
            dispatch({
                type: 'SET_NFT_ITEM',
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const fetchNft = (payload) => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_NFT_ITEM_LOADING',
            payload: true
        })

        axios.post('/item/list', {...payload})
        .then(res => {
            dispatch({
                type: 'SET_NFT_ITEM',
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
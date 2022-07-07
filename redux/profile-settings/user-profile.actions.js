import {axiosIntance as axios} from '../../utils/axios';

export const userSaveData = (payload) => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_ADD_USER_LOADING',
            payload: true
        })

        axios.put('/user/update', {...payload})
        .then(res => {
            dispatch({
                type: 'SET_UPDATE_USER_DETAILS',
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

export const userGetData = (id) => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_ADD_USER_LOADING',
            payload: true,
        })

        axios.get(`/user/detail?id=${id}`)
        .then(res => {
            dispatch({
                type: 'SET_ADD_USER_DETAILS',
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
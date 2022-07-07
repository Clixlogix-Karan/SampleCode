import {axiosIntance as axios} from '../../utils/axios';

export const getFaq = (payload) => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_FAQ_LOADING',
            payload: true
        })

        axios.post('/faq/active-list', {...payload})
        .then(res => {
            dispatch({
                type: 'SET_FAQ_VALUE',
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
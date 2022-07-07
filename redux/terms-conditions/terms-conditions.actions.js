import {axiosIntance as axios} from '../../utils/axios';

export const getTermsCondition = (payload) => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_TERMS_LOADING',
            payload: true
        })

        axios.post('/static-content/detail', {...payload})
        .then(res => {
            dispatch({
                type: 'SET_TERMS_VALUE',
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
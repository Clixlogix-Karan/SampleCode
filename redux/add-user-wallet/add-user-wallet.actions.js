import {axiosIntance as axios} from '../../utils/axios';

export const setUserWalletDetails = (payload) => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_ADD_USER_LOADING',
            payload: true
        })

        axios.post('/user/add', {...payload})
        .then(res => {
            dispatch({
                type: 'SET_ADD_USER_WALLET_DETAILS',
                payload: res.data
            })
            localStorage.setItem('walletUserId', JSON.stringify(res.data.data._id))
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
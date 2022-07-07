import {axiosIntance as axios} from '../../utils/axios';

export const fetchWalletActiveNetworks = () => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_ACTIVE_NETWORKS_LOADING',
            payload: true
        })

        axios.get('/network-master/active-networks')
        .then(res => {
            dispatch({
                type: 'SET_ACTIVE_NETWORKS',
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
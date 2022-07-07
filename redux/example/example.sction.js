import _ from 'lodash';

export const setExampleValue = (payload) => {
    return async(dispatch) => {
        // SUPPORTS API CALLS WE CAN MAKE API CALLS THEN SET VALUE
        dispatch({
            type: 'SET_VALUE',
            payload: payload
        })
    }
}